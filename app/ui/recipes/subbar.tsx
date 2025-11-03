"use client"
import Link from "next/link";
import SearchBar from "./searchbar";

export default function Subbar() {
	const buttonClass =
		`flex ml-[5px] my-auto h-[40px] w-[110px] grow text-center
		items-center justify-center rounded-md bg-gray-50 p-3 text-sm font-medium
		hover:bg-sky-100 hover:text-blue-600 md:flex-none md:p-2 md:px-3 md:mx-[4px]`;

		//href={`${pathName}?searchbar=`}
	return (
		<div className="flex w-full max-w-[700px] min-w-[10px] bg-gray-400 m-auto px-2 pb-2 pt-1">
			<Link href="account/login" className={`mr-[10px] ${buttonClass}`}>
				<div>Create New</div>
			</Link>
			<SearchBar/>
		</div>
	);
}
