import { Metadata } from "next";
import { fetchUsers } from "./lib/data";

export const metadata: Metadata = {
	title: "Home Page",
};

export default async function Home() {
	const users = await fetchUsers();
	const user = users[0];

	return (
		<div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
			<main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
				<h1>Home Page.</h1>
				<ul>
					<li>{user.id}</li>
					<li>{user.name}</li>
					<li>{user.email}</li>
					<li>{user.password}</li>
				</ul>
			</main>
		</div>
	);
}
