"use client";
import { RowList } from "postgres";
import { Recipe } from "../../lib/definitions";
import RecipeCard from "./recipe-card";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { JSX } from "react";

export default function Pagination({
	currentPage,
	recipesPerPage,
	recipes,
}: {
	currentPage: number;
	recipesPerPage: number;
	recipes: RowList<Recipe[]>;
}) {
	const params = useSearchParams();

	function pageHref(page: number) {
		return `recipes?page=${page}${
			params.get("query") ? `&query=${params.get("query")}` : ""
		}`;
	}

	function PageNumberButton({ page }: { page: number }) {
		const selectedClass =
			"w-8 h-8 text-lg text-center bg-[#B6BCC5] border-gray-500 border-2";
		const notSelectedClass =
			"w-8 h-8 text-lg text-center bg-gray-300 border-gray-400 border-2 hover:bg-[#B6BCC5] hover:border-gray-500";

		return (
			<Link
				href={pageHref(page)}
				className={
					page == currentPage ? selectedClass : notSelectedClass
				}
			>
				{page}
			</Link>
		) as JSX.Element;
	}

	const amountToSkip = recipesPerPage * (currentPage - 1);
	const pagesCount = Math.ceil(recipes.length / recipesPerPage);

	const recipesToDisplay: Recipe[] =
		currentPage >= 1
			? recipes.slice(
					amountToSkip,
					Math.min(amountToSkip + recipesPerPage, recipes.length),
			  )
			: [];

	let pageButtons: JSX.Element[] = [];
	for (let i = 1; i <= pagesCount; i++) {
		pageButtons.push(<PageNumberButton key={i} page={i} />);
	}

	return (
		<>
			{recipesToDisplay?.map((recipe) => {
				return (
					<div key={recipe.id}>
						<RecipeCard recipe={recipe} />
						{recipe.id != recipesToDisplay.at(-1)?.id && <hr />}
					</div>
				);
			})}
			{recipesToDisplay.length <= 0 || currentPage < 1 ? (
				<>
					{currentPage != 1 ? (
						<>
							<h1>Sorry, no recipes for this page. :/</h1>
							<Link
								href={pageHref(
									currentPage < 1 ? 1 : pagesCount,
								)}
								className="underline text-blue-600 hover:text-blue-800"
							>
								Click here to go to the{" "}
								{currentPage < 1 ? "first" : "last"} page.
							</Link>
						</>
					) : (
						<>
							<h1>
								Sorry, no recipes found with that search. :/
							</h1>
						</>
					)}
				</>
			) : (
				<div className="flex ">
					{currentPage > 1 ? (
						<Link
							href={pageHref(currentPage - 1)}
							className="flex ml-10 mr-auto mt-auto w-38 h-10 text-nowrap items-center border-gray-400 border-3 rounded-lg bg-gray-300 px-4 text-sm font-medium text-gray-700 transition-colors hover:bg-[#B6BCC5] hover:border-gray-500"
						>
							{"<--  "} Previous Page
						</Link>
					) : (
						<div className="flex ml-10 mr-auto mt-auto w-38 h-10"></div>
					)}

					<div className="flex gap-5 mx-auto">
						{pagesCount > 1 && pageButtons}
					</div>

					{currentPage < pagesCount ? (
						<Link
							href={pageHref(currentPage + 1)}
							className="flex mr-10 ml-auto mt-auto w-32 h-10 text-nowrap items-center border-gray-400 border-3 rounded-lg bg-gray-300 px-4 text-sm font-medium text-gray-700 transition-colors hover:bg-[#B6BCC5] hover:border-gray-500"
						>
							Next Page {"-->"}
						</Link>
					) : (
						<div className="flex ml-10 mr-auto mt-auto w-32 h-10"></div>
					)}
				</div>
			)}
		</>
	);
}
