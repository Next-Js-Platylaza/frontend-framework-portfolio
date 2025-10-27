import { signOut } from "@/auth";
import NavLinks from "@/app/ui/nav-links";

export default function Navbar() {
	return (
		<Navbar>
			<form
				className="ml-auto"
				action={async () => {
					"use server";
					await signOut({ redirectTo: "/" });
				}}
			>
				<button className="flex m-auto h-[48px] grow items-center  gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3">
					<div>Sign Out</div>
				</button>
			</form>
		</Navbar>
	);
}
