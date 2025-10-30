import { signOut, getCurrentUserId } from "@/auth";
import NavLinks from "@/app/ui/nav-links";
import Link from "next/link";

export default async function Navbar({
	children,
}: {
	children: React.ReactNode;
}) {
	const isSignedIn = (await getCurrentUserId()) != null;
	const signInSignOutClass =
		"flex ml-[5px] my-auto h-[60px] w-[100px] grow items-center justify-center rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:p-2 md:px-3 md:ml-auto";

	return (
		<div className="flex w-full bg-gray-300 p-2">
			<NavLinks />
			{children}
			{isSignedIn ? (
				<button
					className={signInSignOutClass}
					onClick={async () => {
						"use server";
						await signOut({ redirectTo: "/" });
					}}
				>
					<div>Sign Out</div>
				</button>
			) : (
				<Link href="account/login" className={signInSignOutClass}>
					<div>Sign In</div>
				</Link>
			)}
		</div>
	);
}
