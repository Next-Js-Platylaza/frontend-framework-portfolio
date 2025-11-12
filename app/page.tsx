import { Metadata } from "next";
import Navbar from "@/app/ui/navbar";
import { getCurrentUserId } from "@/auth";

export const metadata: Metadata = {
	title: "Home Page",
};

export default async function Home() {
	const userId = await getCurrentUserId();
	return (
		<>
			<Navbar>{<></>}</Navbar>
			<div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen gap-16">
				<main className="flex flex-col gap-[32px] row-start-2 items-center">
					<h1>Home Page.</h1>
					{!userId && <p>Sign in to get started.</p>}
				</main>
			</div>
		</>
	);
}
