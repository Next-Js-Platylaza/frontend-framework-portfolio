import { signOut } from "@/auth";
import BaseNavbar from "../navbar";

export default function Navbar() {
	return (
		<BaseNavbar>
			{
				<button
					className="flex ml-[5px] my-auto h-[60px] w-[100px] grow items-center justify-center rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:p-2 md:px-3 md:ml-auto"
					onClick={async () => {
						"use server";
						await signOut({ redirectTo: "/" });
					}}
				>
					<div>Sign Out</div>
				</button>
			}
		</BaseNavbar>
	);
}
