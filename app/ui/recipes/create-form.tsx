"use client";
import Link from "next/link";
import { createRecipe, RecipeFormState } from "@/app/lib/actions";
import { useActionState, useEffect, useRef, useState } from "react";
import useArrayInput from "./useArrayInput";

export default function CreateRecipeForm() {
	const initialFormData = new FormData();
	initialFormData.set("name", "");
	initialFormData.set("email", "");
	initialFormData.set("password", "");

	const initialState: RecipeFormState = {
		fields: initialFormData,
		message: null,
		errors: {},
	};
	const [state, formAction] = useActionState(createRecipe, initialState);

	const [ingredientsInput, refillInputsIngredients] = useArrayInput(
		"ingredient",
		"ings-array",
		state.fields.getAll("ingredients") as string[],
		{ input: "w-[325px]" },
		[1, 50],
	);
	const [stepsInput, refillInputsSteps] = useArrayInput(
		"step",
		"steps-array",
		state.fields.getAll("steps") as string[],
		{
			input: "w-[375px] gap-1",
		},
		[1, 100],
	);

	// Refill input after form submission
	useEffect(() => {
		refillInputsIngredients();
		refillInputsSteps();
	}, [state.errors]);

	return (
		<form action={formAction}>
			<div className="rounded-md border-[2px] border-gray-300 w-[65%] m-auto bg-gray-100 p-4 md:p-6">
				{/* Title */}
				<div className="mb-4">
					<label
						htmlFor="title"
						className="mb-2 block text-sm font-medium"
					>
						Enter title
					</label>
					<div className="relative">
						<input
							id="title"
							name="title"
							type="text"
							placeholder="Ex: My Amazing Recipe"
							defaultValue={state.fields.get("title") as string}
							required={true}
							className="w-full rounded-md border border-gray-50 py-2 pl-10 text-sm outline-1 placeholder:text-gray-500 focus:outline-2"
							aria-describedby="title-error"
						/>
					</div>
					<div id="title-error" aria-live="polite" aria-atomic="true">
						{state.errors?.title &&
							state.errors.title.map((error: string) => (
								<p
									className="mt-2 text-sm text-red-500"
									key={error}
								>
									{error}
								</p>
							))}
					</div>
				</div>

				{/* Image */}
				<div className="mb-4">
					<label
						htmlFor="image"
						className="mb-2 block text-sm font-medium"
					>
						Enter image
					</label>
					<div className="relative">
						<input
							id="image"
							name="image"
							type="text"
							placeholder="Ex: https://www.website.com/image.jpg"
							defaultValue={state.fields.get("image") as string}
							required={true}
							className="w-full rounded-md border border-gray-50 py-2 pl-10 text-sm outline-1 placeholder:text-gray-500 focus:outline-2"
							aria-describedby="image-error"
						/>
					</div>
					<div id="image-error" aria-live="polite" aria-atomic="true">
						{state.errors?.image &&
							state.errors.image.map((error: string) => (
								<p
									className="mt-2 text-sm text-red-500"
									key={error}
								>
									{error}
								</p>
							))}
					</div>
				</div>
				<hr />
				{ingredientsInput}
				<hr />
				{stepsInput}

				<p className="mt-2 text-sm text-red-500">{state.message}</p>
				<div className="mt-6 -mb-2 flex justify-end gap-4">
					<Link
						href="/recipes"
						className="flex mt-auto h-10 items-center rounded-lg bg-gray-200 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-300"
					>
						Cancel
					</Link>
					<button
						type="submit"
						className="flex mt-auto h-10 items-center rounded-lg bg-gray-200 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-300"
					>
						Create Recipe
					</button>
				</div>
			</div>
		</form>
	);
}
