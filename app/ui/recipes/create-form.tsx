"use client";
import Link from "next/link";
import { createUser, AccountFormState } from "@/app/lib/actions";
import { useActionState, useEffect, useState } from "react";
import ArrayInput from "./array-input";
import { v1 as uuidv1 } from "uuid";

export default function CreateRecipeForm() {
	const initialFormData = new FormData();
	initialFormData.set("name", "");
	initialFormData.set("email", "");
	initialFormData.set("password", "");

	const initialState: AccountFormState = {
		fields: initialFormData,
		message: null,
		errors: {},
	};
	const [state, formAction] = useActionState(createUser, initialState);

	//#region - Ingredient Management
	const [ingredients, setIngredients] = useState([NewIngredient("0")]);
	const [ingredientIDs, setIngredientIDs] = useState(["0"]);
	const [ingIDToRemove, setIngIDToRemove] = useState("None");

	useEffect(()=> {
		if (ingIDToRemove != "None") {
			onRemoveIngredient(ingIDToRemove)
		}
	}, [ingIDToRemove]);

	function NewIngredient(id : string)
	{
		return (
			<ArrayInput
				key={id}
				attributes={{
					name: id,
					type: "text",
					placeholder: "Enter ingredient",
				}}
				removeComponent={() => {
					setIngIDToRemove(id);
			}}
			/>
		);
	}

	function onAddIngredient() {
		const uuid = uuidv1();
		setIngredients([
			...ingredients,
			NewIngredient(uuid),
		]);
		setIngredientIDs([...ingredientIDs, uuid]);
	}
	function onRemoveIngredient(uuid: string) {
		const index = ingredientIDs.indexOf(uuid);
		setIngredients((ings) => 
			[...ings.slice(0, index), ...ings.slice(index+1)]
		);
		setIngredientIDs((ingIDs) => 
			[...ingIDs.slice(0, index), ...ingIDs.slice(index+1)]
		);
	}
	//#endregion - Ingredient Management

	//#region - Step Management
	const [steps, setSteps] = useState([NewStep("0")]);
	const [stepIDs, setStepIDs] = useState(["0"]);
	const [stepIDToRemove, setStepIDToRemove] = useState("None");

	useEffect(()=> {
		if (stepIDToRemove != "None") {
			onRemoveStep(stepIDToRemove)
		}
	}, [stepIDToRemove]);

	function NewStep(id : string)
	{
		return (
			<ArrayInput
				key={id}
				attributes={{
					name: id,
					type: "text",
					placeholder: "Enter step",
				}}
				removeComponent={() => {
					setStepIDToRemove(id);
			}}
			/>
		);
	}

	function onAddStep() {
		const uuid = uuidv1();
		setSteps([
			...steps,
			NewStep(uuid),
		]);
		setStepIDs([...stepIDs, uuid]);
	}
	function onRemoveStep(uuid: string) {
		const index = stepIDs.indexOf(uuid);
		setSteps((steps) => 
			[...steps.slice(0, index), ...steps.slice(index+1)]
		);
		setStepIDs((stepIDs) => 
			[...stepIDs.slice(0, index), ...stepIDs.slice(index+1)]
		);
	}
	//#endregion - Step Management

	return (
		<form action={formAction}>
			<div className="rounded-md bg-gray-50 p-4 md:p-6">
				{ingredients.map((component) => (
					<div key={component.props.attributes.name}>{component}</div>
				))}
				<button type="button" onClick={onAddIngredient}>
					Add Ingredient
				</button>
				<hr/>
				{steps.map((component) => (
					<div key={component.props.attributes.name}>{component}</div>
				))}
				<button type="button" onClick={onAddStep}>
					Add Step
				</button>

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
						{state.errors?.name &&
							state.errors.name.map((error: string) => (
								<p
									className="mt-2 text-sm text-red-500"
									key={error}
								>
									{error}
								</p>
							))}
					</div>
				</div>
				{/* User Email */}
				<div className="mb-4">
					<label
						htmlFor="email"
						className="mb-2 block text-sm font-medium"
					>
						Enter email
					</label>
					<input
						id="email"
						name="email"
						type="text"
						placeholder="Enter email"
						defaultValue={state.fields.get("email") as string}
						className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
						aria-describedby="email-error"
					/>
					<div id="email-error" aria-live="polite" aria-atomic="true">
						{state.errors?.email &&
							state.errors.email.map((error: string) => (
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
			</div>

			<div className="mt-6 flex justify-end gap-4">
				<Link
					href="/"
					className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
				>
					Cancel
				</Link>
				<button
					type="submit"
					className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
				>
					Create Account
				</button>
			</div>
		</form>
	);
}
