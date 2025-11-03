"use client"
import { searchh } from "@/app/lib/data";
import { useSearchParams } from "next/navigation";
import { useActionState } from "react";

export async function search(text:string) {
    return "";
}

export default function SearchBar() {
        const searchParams = useSearchParams();
        const initialState: string = searchParams.get("searchbar") ?? "/";
        
        const [state, formAction] = useActionState(
            search,
            initialState,
        );
    
	const buttonClass =
		`flex ml-[5px] my-auto h-[40px] w-[110px] grow text-center
		items-center justify-center rounded-md bg-gray-50 p-3 text-sm font-medium
		hover:bg-sky-100 hover:text-blue-600 md:flex-none md:p-2 md:px-3 md:mx-[4px]`;

		//href={`${pathName}?searchbar=`}
	return (
		<form
            className="flex w-[full] mx-auto max-md:w-[500px]"
            action={formAction}
            >
		    <input
				className={`w-full text-left ${buttonClass}`}
				id="searchbar"
				name="searchbar"
				type="text"
				placeholder="Search..."
				maxLength={50}
			/>
			<button type="submit" className={buttonClass}>
				<div>Search</div>
			</button>
		</form>
	);
}
