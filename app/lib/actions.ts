"use server"
import { signIn } from "@/auth";
import { AuthError } from "next-auth";
import { z } from "zod";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import postgres from "postgres";

const sql = postgres(process.env.POSTGRES_URL!, { ssl: "require" });

export async function authenticate(
	prevState: string | undefined,
	formData: FormData,
) {
	try {
		await signIn("credentials", formData);
	} catch (error) {
		if (error instanceof AuthError) {
			switch (error.type) {
				case "CredentialsSignin":
					return "Invalid credentials.";
				default:
					return "Something went wrong.";
			}
		}
		throw error;
	}
}

const FormSchema = z.object({
	name: z.string(),
	email: z.string(),
	password: z.string(),
});

const CreateUser = FormSchema.omit({ name: true, email: true, password: true });

export type State = {
	errors?: {
		name?: string[];
		email?: string[];
		password?: string[];
	};
	message?: string | null;
};

export async function createUser(prevState: State | undefined, formData: FormData) {
	// Validate form using Zod
	const validatedFields = CreateUser.safeParse({
		name: formData.get("name"),
		email: formData.get("email"),
		password: formData.get("password"),
	});

	// If form validation fails, return errors early. Otherwise, continue.
	if (!validatedFields.success) {
		return {
			errors: validatedFields.error.flatten().fieldErrors,
			message: "Missing Fields. Failed to Create User.",
		};
	}

	// Prepare data for insertion into the database
	const uuidgenerator = await fetch("https://www.uuidgenerator.net/api/version4");
	const id = uuidgenerator.text();
	const { name, email, password } = validatedFields.data;

	// Insert data into the database
	try {
		await sql`
		INSERT INTO users (name, email, password)
		VALUES (${name}, ${email}, ${password})
	  `;
	} catch (error) {
		// If a database error occurs, return a more specific error.
		return {
			message: "Database Error: Failed to Create User.",
		};
	}

	// Revalidate the cache for the users page and redirect the user.
	revalidatePath("/");
	redirect("/");
}
