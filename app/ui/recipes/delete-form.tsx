"use client";
import Link from "next/link";
import { deleteRecipe, RecipeFormState } from "@/app/lib/actions";
import { useActionState, useEffect, useState } from "react";
import { Recipe } from "@/app/lib/definitions";
import { title } from "process";

export default function DeleteRecipeForm({
	recipe,
	cancelFunction,
	deleteFunction,
}: {
	recipe: Recipe;
	cancelFunction: () => void;
	deleteFunction: () => void;
}) {
	const [state, formAction] = useActionState(deleteRecipe, {
		message: "",
		error: "",
	});

	let title: string = "";

	if (recipe.title.includes(" ")) {
		title = recipe.title;
	} else {
		const numberOfCharactersBetweenSpaces: number = 17;
		let prevIndex: number = 0;
		for (let i = 0; i < recipe.title.length; i++) {
			if (
				recipe.title.length > 25 &&
				i > 0 &&
				i >= prevIndex + numberOfCharactersBetweenSpaces
			) {
				const stringToCheck = recipe.title.slice(i - 1, i + 1);
				if (
					!stringToCheck.includes(" ") &&
					!stringToCheck.includes("-")
				)
					title += `-`;
				prevIndex = i;
			}
			title += `${recipe.title[i]}`;
		}
	}

	return (
		<form action={formAction}>
			<div className="rounded-md border-[2px] border-gray-300 min-w-[200px] w-[35%] m-auto bg-gray-100 p-4 md:p-6">
				<input type="hidden" name="id" value={recipe.id} />
				<div className="">
					<h1 className="max-md:text-sm text-center">
						Are you sure you want to delete this recipe?
					</h1>
					<h1 className="line-clamp-5 max-md:text-sm text-center">{`("${title}")`}</h1>
				</div>

				<div className="mt-6 -mb-2 justify-center flex gap-4">
					<button
						type="button"
						onClick={cancelFunction}
						className="flex mt-auto h-10 items-center rounded-lg bg-gray-200 border-gray-400 border-2 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-300"
					>
						Cancel
					</button>
					{state.message ? (
						<Link
							href="/recipes"
							className="flex mt-auto h-10 items-center rounded-lg bg-gray-200 border-gray-400 border-2 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-300"
						>
							View Recipes
						</Link>
					) : (
						<button
							type={state.message ? "button" : "submit"}
							onClick={() => {
								deleteFunction();
							}}
							className="flex mt-auto h-10 items-center rounded-lg bg-gray-200 border-gray-400 border-2 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-300"
						>
							Confirm
						</button>
					)}
				</div>
				<p className="mt-5 text-center text-sm text-red-500">
					{state.error}
				</p>
				<p className="mt-2 text-center text-sm text-gray-900">
					{state.message}
				</p>
			</div>
		</form>
	);
}
