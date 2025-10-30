import postgres from "postgres";
import { User, Recipe } from "./definitions";

const sql = postgres(process.env.POSTGRES_URL!, { ssl: "require" });

export async function fetchUser(
	column: string,
	searchValue: string,
): Promise<User | undefined> {
	try {
		let user;
		switch (column) {
			case "name":
				user = await sql<
					User[]
				>`SELECT * FROM users WHERE name = ${searchValue}`;
				break;
			case "email":
				user = await sql<
					User[]
				>`SELECT * FROM users WHERE email = ${searchValue}`;
				break;
			case "id":
				user = await sql<
					User[]
				>`SELECT * FROM users WHERE id = ${searchValue}`;
				break;
			default:
				throw Error(`Failed to fetch user. Unknown column: ${column}`);
		}

		return user[0];
	} catch (error) {
		console.error("Failed to fetch user:", error);
		throw new Error("Failed to fetch user.");
	}
}

export async function fetchUsers() {
	try {
		const users = await sql<User[]>`
            SELECT
            *
            FROM users
            ORDER BY id ASC
        `;

		return users;
	} catch (err) {
		console.error("Database Error:", err);
		throw new Error("Failed to fetch all users.");
	}
}

export async function fetchRecipesByUser(userId: string) {
	try {
		const recipes = await sql<Recipe[]>`
            SELECT
            id, title, image, ingredients, steps
            FROM recipes
			WHERE user_id = ${userId}
            ORDER BY title ASC
        `;

		return recipes;
	} catch (err) {
		console.error("Database Error:", err);
		throw new Error("Failed to fetch user's recipes.");
	}
}
