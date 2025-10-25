"use client";
import Link from "next/link";
import { createUser, State } from "@/app/lib/actions";
import { useActionState } from "react";

export default function Form() {
	const initialState: State = { message: null, errors: {} };
	const [state, formAction] = useActionState(createUser, initialState);

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
					<div
						id="name-error"
						aria-live="polite"
						aria-atomic="true"
					>
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
					<div
						id="email-error"
						aria-live="polite"
						aria-atomic="true"
					>
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
				<button type="submit">Create Account</button>
			</div>
		</form>
	);
}
