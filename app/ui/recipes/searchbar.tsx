"use client";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";

export default function SearchBar({ placeholder }: { placeholder: string }) {
	const searchParams = useSearchParams();
	const pathname = usePathname();
	const { replace } = useRouter();

	const handleSearch = useDebouncedCallback((term: string) => {
		console.log(`Searching... ${term}`);

		const params = new URLSearchParams(searchParams);
		params.set("page", "1");
		if (term) {
			params.set("query", term);
		} else {
			params.delete("query");
		}
		replace(`${pathname}?${params.toString()}`);
	}, 300);

	const buttonClass = `flex ml-[5px] my-auto h-[40px] grow text-center
		items-center justify-center rounded-md bg-gray-50 p-3 text-sm font-medium
		hover:bg-sky-100 hover:text-blue-600 md:flex-none md:p-2 md:px-3 md:mx-[4px]`;

	return (
		<div className="flex w-[full] mx-auto max-md:w-full">
			<label htmlFor="searchbar" className="sr-only">
				Search
			</label>
			<input
				className={`w-[450px] max-w-full max-md:w-[150px] text-left ${buttonClass}`}
				id="searchbar"
				name="searchbar"
				type="text"
				placeholder={placeholder}
				maxLength={50}
				onChange={(e) => {
					handleSearch(e.target.value);
				}}
				defaultValue={searchParams.get("query")?.toString()}
			/>
			{/*<button
				type="submit"
				className={`w-[65px] sm:w[15px] ${buttonClass}`}
			>
				<div>Search</div>
			</button>*/}
		</div>
	);
}
