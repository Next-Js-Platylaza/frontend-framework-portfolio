"use client";
import Link from "next/link";
import { createUser, FormState } from "@/app/lib/actions";
import { useActionState, useState } from "react";
import { useSearchParams } from "next/navigation";

export default function EditAccountForm() {
	const searchParams = useSearchParams();
	const username = searchParams.get("name");
	const email = searchParams.get("email");

	const initialFormData = new FormData();
	initialFormData.set("name", username as string);
	initialFormData.set("email", email as string);
	initialFormData.set("new-password", "");
	initialFormData.set("new-password-confirmation", "");
	initialFormData.set("old-password", "");

	const initialState: FormState = {
		fields: initialFormData,
		message: null,
		errors: {},
	};
	const [state, formAction] = useActionState(createUser, initialState);

	const [passwordIsVisible, setPasswordIsVisible] = useState(false);

	return (
		<form action={formAction}>
			<div className="rounded-md bg-gray-50 p-4 md:p-6">
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
							defaultValue={
								true
									? (initialFormData.get("name") as string)
									: (state.fields.get("name") as string)
							}
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

				{/* User Password */}
				<div className="mb-4">
					<label
						htmlFor="password"
						className="mb-2 block text-sm font-medium"
					>
						Enter password
					</label>
					<div className="flex">
						<input
							id="password"
							name="password"
							type={passwordIsVisible ? "text" : "password"}
							placeholder="Enter password"
							className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
							aria-describedby="password-error"
						/>
						{/* Show/Hide Password Button*/}
						<button
							type="button"
							onClick={() => {
								setPasswordIsVisible((b) => !b);
							}}
							className="flex h-10 ml-5 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
						>
							{passwordIsVisible
								? "Hide Password"
								: "Show Password"}
						</button>
					</div>
					<div
						id="password-error"
						aria-live="polite"
						aria-atomic="true"
					>
						{state.errors?.password &&
							state.errors.password.map((error: string) => (
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
