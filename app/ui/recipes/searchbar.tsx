"use client";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";
import SearchInput from "../search-input";

export default function SearchBar({ placeholder }: { placeholder: string }) {
	const searchParams = useSearchParams();
	const pathname = usePathname();
	const { replace } = useRouter();

	const setPageAmount = useDebouncedCallback((amount: string) => {
		const params = new URLSearchParams(searchParams);
		params.set("page", searchParams.get("page") ?? "1");
		params.set("items", amount);

		const query = searchParams.get("query");
		if (query) {
			params.set("query", query);
		} else {
			params.delete("query");
		}

		replace(`${pathname}?${params.toString()}`);
	}, 200);

	const buttonClass = `flex ml-[5px] my-auto h-[40px] grow text-center
		items-center justify-center rounded-md p-3 text-sm font-medium
		bg-gray-100 border-gray-300 border-2 hover:bg-gray-200 hover:border-gray-500 md:flex-none md:p-2 md:px-3 md:mx-[4px]`;

	return (
		<div className="flex w-full ml-auto max-md:w-[500px] gap-5">
			<SearchInput placeholder={placeholder} />
			<div className="flex w-full ml-auto max-md:w-[500px] gap-4">
				<label htmlFor="items-per-page">Recipes Per Page: </label>
				<input
					id="items-per-page"
					name="items-per-page"
					type="number"
					defaultValue={3}
					onChange={(val) => {
						console.log(val);
						setPageAmount(val.target.value);
					}}
					className="w-[40px] bg-red-400 rounded-md bg-gray-100 border-gray-300 border-2 hover:bg-gray-200 hover:border-gray-600 text-black py-[9px] text-center text-sm"
					min={1}
					max={50}
				/>
			</div>
		</div>
	);
}
