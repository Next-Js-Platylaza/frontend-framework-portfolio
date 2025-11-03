import { Recipe } from "./definitions";
("use server");
import { signIn } from "@/auth";
import { AuthError } from "next-auth";
import { z } from "zod";
import bcrypt from "bcrypt";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import postgres from "postgres";

const sql = postgres(process.env.POSTGRES_URL!, { ssl: "require" });

export async function authenticate(
	prevState: AccountFormState | undefined,
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
						message: "Invalid credentials.",
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

async function generateUuid() {
	try {
		const uuidgenerator = await fetch(
			"https://www.uuidgenerator.net/api/version4",
		);
		return await uuidgenerator.text();
	} catch {
		throw Error("API Error: Failed to generate uuid.");
	}
}

const AccountFormSchema = z.object({
	id: z.string(),
	name: z
		.string({ error: "Please enter a username." })
		.min(3, { error: "Username must contain more than 3 characters" })
		.max(15, { error: "Username must be shorter than 16 characters" }),
	email: z.email({ error: "Please input a valid email address." }),
	password: z
		.string({ error: "Please input a valid password." })
		.min(5, { error: "Password must contain more than 5 characters" })
		.max(25, { error: "Password must be less than 26 characters" }),
});

const CreateUser = AccountFormSchema.omit({ id: true });

export type AccountFormState = {
	fields: FormData;
	errors?: {
		name?: string[];
		email?: string[];
		password?: string[];
	};
	message?: string | null;
};

export async function createUser(
	prevState: AccountFormState | undefined,
	formData: FormData,
) {
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
		uuid = generateUuid().toString();
	} catch (error) {
		return {
			fields: formData,
			message: "API Error: Failed to Create User. | Error: " + error,
		};
	}

	const { name, email, password } = validatedFields.data;
	bcrypt.hash(password, 10, async function (error, hash) {
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
				message:
					"Database Error: Failed to Create User. | Error: " + error,
			};
		}
	});

	// Revalidate the cache for the users page and redirect the user.
	revalidatePath("/");
	redirect("/");
}

const RecipeFormSchema = z.object({
	id: z.string(),
	title: z
		.string({ error: "Please enter a username." })
		.min(3, { error: "Username must contain more than 3 characters" })
		.max(15, { error: "Username must be shorter than 16 characters" }),
	image: z
		.string({ error: "Please input a valid password." })
		.min(5, { error: "Password must contain more than 5 characters" })
		.max(25, { error: "Password must be less than 26 characters" }),
	ingredients: z
		.string({ error: "Please input a valid password." })
		.min(5, { error: "Password must contain more than 5 characters" })
		.max(25, { error: "Password must be less than 26 characters" }),
	steps: z
		.string({ error: "Please input a valid password." })
		.min(5, { error: "Password must contain more than 5 characters" })
		.max(25, { error: "Password must be less than 26 characters" }),
});

const CreateRecipe = RecipeFormSchema.omit({ id: true });

export type RecipeFormState = {
	fields: FormData;
	errors?: {
		title?: string[];
		image?: string[];
		ingredients?: string[];
		steps?: string[];
	};
	message?: string | null;
};

export async function createRecipe(
	prevState: RecipeFormState | undefined,
	formData: FormData,
) {
	// Validate form using Zod
	const validatedFields = CreateRecipe.safeParse({
		title: formData.get("title"),
		image: formData.get("image"),
		ingredients: formData.get("ingredients"),
		steps: formData.get("steps"),
	});

	// If form validation fails, return errors early. Otherwise, continue.
	if (!validatedFields.success) {
		return {
			fields: formData,
			errors: validatedFields.error.flatten().fieldErrors,
			message: "Missing Fields. Failed to Create Recipe.",
		};
	}

	// Prepare data for insertion into the database
	let uuid = "";
	try {
		uuid = generateUuid().toString();
	} catch (error) {
		return {
			fields: formData,
			message: "API Error: Failed to Create Recipe. | Error: " + error,
		};
	}

	const { title, image, ingredients, steps } = validatedFields.data;
	// Insert data into the database
	try {
		await sql`
			INSERT INTO recipes (id, title, image, ingredients, steps)
			VALUES (${uuid}, ${title}, ${image}, ${ingredients}, ${steps})
		  `;
	} catch (error) {
		// If a database error occurs, return a more specific error.
		return {
			fields: formData,
			message:
				"Database Error: Failed to Create Recipe. | Error: " + error,
		};
	}

	// Revalidate the cache for the recipes page and redirect the user.
	revalidatePath(`/recipes/${uuid}/view`);
	redirect(`/recipes/${uuid}/view`);
}
