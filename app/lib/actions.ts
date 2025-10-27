"use server"
import { signIn } from "@/auth";
import { AuthError } from "next-auth";
import { z } from "zod";
import bcrypt from "bcrypt";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import postgres from "postgres";

const sql = postgres(process.env.POSTGRES_URL!, { ssl: "require" });

export async function authenticate(
	prevState: FormState | undefined,
	formData: FormData,
) {
	try {
		await signIn("credentials", formData);
	} catch (error) {
		if (error instanceof AuthError) {
			switch (error.type) {
				case "CredentialsSignin":
					return {
						fields: formData,
						errors: undefined,
						message: `Invalid credentials. ${formData.get("email")}, ${formData.get("password")}`,
					};
				default:
					return {
						fields: formData,
						errors: undefined,
						message: "Something went wrong.",
					};
			}
		}
		throw error;
	}
}

const FormSchema = z.object({
	id: z.string(),
	name: z
		.string({ error: "Please enter a username.", })
		.min(3, { error: "Username must contain more than 3 characters",})
		.max(15, { error: "Username must be shorter than 16 characters",
	}),
	email: z
		.email({ error: "Please input a valid email address.",
	}),
	password: z
		.string({ error: "Please input a valid password.",})
		.min(5, { error: "Password must contain more than 5 characters",})
		.max(25, { error: "Password must be less than 26 characters",
	}),
});

const CreateUser = FormSchema.omit({ id: true });

export type FormState = {
	fields: FormData,
	errors?: {
		name?: string[];
		email?: string[];
		password?: string[];
	};
	message?: string | null;
};

export async function createUser(prevState: FormState | undefined, formData: FormData) {
	// Validate form using Zod
	const validatedFields = CreateUser.safeParse({
		name: formData.get("name"),
		email: formData.get("email"),
		password: formData.get("password"),
	});

	// If form validation fails, return errors early. Otherwise, continue.
	if (!validatedFields.success) {
		return {
			fields: formData,
			errors: validatedFields.error.flatten().fieldErrors,
			message: "Missing Fields. Failed to Create User.",
		};
	}

	// Prepare data for insertion into the database
	let uuid = "";
	try {
		const uuidgenerator = await fetch("https://www.uuidgenerator.net/api/version4");
		uuid = (await uuidgenerator.text()).toString();
	} catch (error) {
		return {
			fields: formData,
			message: "API Error: Failed to Create User. | Error: " + error,
		};
	}

	const { name, email, password } = validatedFields.data;
	bcrypt.hash(password, 10, async function(error, hash) {
		// Insert data into the database
		try {
			await sql`
			INSERT INTO users (id, name, email, password)
			VALUES (${uuid}, ${name}, ${email}, ${hash})
		  `;
		} catch (error) {
			// If a database error occurs, return a more specific error.
			return {
				fields: formData,
				message: "Database Error: Failed to Create User. | Error: " + error,
			};
		}
	});

	// Revalidate the cache for the users page and redirect the user.
	revalidatePath("/");
	redirect("/");
}