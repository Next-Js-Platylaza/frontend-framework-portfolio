import postgres from "postgres";
import {
	User
} from "./definitions";

const sql = postgres(process.env.POSTGRES_URL!, { ssl: "require" });

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