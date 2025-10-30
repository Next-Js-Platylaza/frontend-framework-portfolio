import type { NextAuthConfig } from "next-auth";

export const authConfig = {
	pages: {
		signIn: "account/login",
		newUser: "account/create",
	},
	callbacks: {
		authorized({ auth, request: { nextUrl } }) {
			const isLoggedIn = !!auth?.user;
			const loginIsRequired =
				nextUrl.pathname.startsWith("/recipes") ||
				nextUrl.pathname.includes("edit");
			if (loginIsRequired) {
				if (isLoggedIn) return true;
				// Redirect unauthenticated users to login page
				return false;
			} else if (isLoggedIn) {
				//return Response.redirect(new URL("/recipes", nextUrl));
			}
			return true;
		},
	},
	providers: [], // Add providers with an empty array for now
} satisfies NextAuthConfig;
