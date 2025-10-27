import { signOut } from "@/auth";

export default function Page() {
	return (
		<div className="flex h-full flex-col px-3 py-4 md:px-2">
			<h1>Home Page.</h1>
			<form
				action={async () => {
					"use server";
					await signOut({ redirectTo: "/" });
				}}
			>
				<button className="flex h-[48px] w-full grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3">
					<div className="hidden md:block">Sign Out</div>
				</button>
			</form>
		</div>
	);
}
