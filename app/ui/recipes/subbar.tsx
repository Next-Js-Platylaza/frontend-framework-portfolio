"use client";
import Link from "next/link";
import SearchBar from "./searchbar";
import { Suspense } from "react";

export default function Subbar() {
	//href={`${pathName}?searchbar=`}
	return (
		<div className="flex w-full max-w-[700px] min-w-[10px] bg-gray-400 m-auto px-2 pb-2 pt-1">
			<div className="mr-auto">
				<Link
					href="/recipes/create"
					className={`flex m-auto h-[40px] w-[110px] grow text-center
					items-center justify-center rounded-md bg-gray-50 p-3 text-sm font-medium
					hover:bg-sky-100 hover:text-blue-600 md:flex-none md:p-2 md:px-3 md:mx-[4px]`}
				>
					<div>Create New</div>
				</Link>
			</div>

			<div className="w-full max-md:w-[8px] m-auto px-2">
				<div className="h-[40px] w-[2px] mx-auto bg-gray-500" />
			</div>
			<div className="flex w-full ml-auto max-md:w-[500px]">
				<Suspense>
					<SearchBar placeholder={""} />
				</Suspense>
			</div>
		</div>
	);
}
