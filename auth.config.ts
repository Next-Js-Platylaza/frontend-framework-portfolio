import type { NextAuthConfig } from "next-auth";

export const authConfig = {
	pages: {
		signIn: "account/login",
		newUser: "account/create",
	},
	callbacks: {
		authorized({ auth, request: { nextUrl } }) {
			const isLoggedIn = !!auth?.user;
			const loginIsRequired = nextUrl.pathname.startsWith("/recipes");
			if (loginIsRequired) {
				if (isLoggedIn) return true;
				return false; // Redirect unauthenticated users to login page
			} else if (isLoggedIn) {
				return Response.redirect(new URL("/recipes", nextUrl));
			}
			return true;
		},
	},
	providers: [], // Add providers with an empty array for now
} satisfies NextAuthConfig;
