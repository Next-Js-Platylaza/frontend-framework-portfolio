import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { authConfig } from "./auth.config";
import { z } from "zod";
import type { User } from "@/app/lib/definitions";
import bcrypt from "bcrypt";
import postgres from "postgres";

const sql = postgres(process.env.POSTGRES_URL!, { ssl: "require" });

async function getUser(emailIsUsername : boolean, email: string): Promise<User | undefined> {
	try {
		let user;
		if (emailIsUsername) {
			user = await sql<
				User[]
			>`SELECT * FROM users WHERE name = ${email}`;
		} else {
			user = await sql<
				User[]
			>`SELECT * FROM users WHERE email = ${email}`;
		}

		return user[0];
	} catch (error) {
		console.error("Failed to fetch user:", error);
		throw new Error("Failed to fetch user.");
	}
}

function parseCredentials(emailIsUsername : boolean, credentials : Partial<Record<string, unknown>>)
	: z.ZodSafeParseResult<{
    email: string,
    password: string,
}> {
	if (emailIsUsername) {
		// Parse credentials for username
		return z.object({
				email: z.string(),
				password: z.string().min(5).max(25),
			}).safeParse(credentials);
	} else {
		// Parse credentials for email instead if it's the used method
		return z.object({
				email: z.email(),
				password: z.string().min(5).max(25),
			}).safeParse(credentials);
	}
}

export const { auth, signIn, signOut } = NextAuth({
	...authConfig,
	providers: [
		Credentials({
			async authorize(credentials) {
				const usedUsernameMethod = !(credentials.email as string).includes("@");
				const parsedCredentials = parseCredentials(usedUsernameMethod, credentials)

				if (parsedCredentials.success) {
					const { email, password } = parsedCredentials.data;
					const user = await getUser(usedUsernameMethod, email);
		
					if (!user) return null;
					const passwordsMatch = await bcrypt.compare(
						password,
						user.password,
					);

					if (passwordsMatch) return user;
				}

				console.log("Invalid credentials");
				return null;
			},
		}),
	],
});
