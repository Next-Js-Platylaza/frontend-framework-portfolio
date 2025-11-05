"use client";
import Link from "next/link";
import { createRecipe, RecipeFormState } from "@/app/lib/actions";
import { useActionState, useEffect, useState } from "react";
import { v1 as uuidv1 } from "uuid";
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

	const [ingredientsInput, ingredientValues] = useArrayInput("ingredient");
	const [stepsInput, stepValues] = useArrayInput("step");

	return (
		<form action={formAction}>
			<div className="rounded-md border-[2px] border-gray-300 w-[65%] m-auto bg-gray-100 p-4 md:p-6">
				{ingredientsInput}
				<hr/>
				{stepsInput}

				{/* User Name */}
				<div className="mb-4">
					<label
						htmlFor="name"
						className="mb-2 block text-sm font-medium"
					>
						Enter username
					</label>
					<div className="relative">
						<input
							id="name"
							name="name"
							type="text"
							placeholder="Enter username"
							defaultValue={state.fields.get("name") as string}
							className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
							aria-describedby="name-error"
						/>
					</div>
					<div id="name-error" aria-live="polite" aria-atomic="true">
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
