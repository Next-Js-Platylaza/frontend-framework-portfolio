"use client";

import { useActionState, useState } from "react";
import { authenticate, FormState } from "@/app/lib/actions";

export default function LoginForm() {
	const initialFormData = new FormData();
	initialFormData.set("email", "");
	initialFormData.set("password", "");

	const callbackUrl = "/recipes";

	const initialState: FormState = { fields: initialFormData, message: null };
	const [state, formAction, isPending] = useActionState(
		authenticate,
		initialState,
	);

	const [passwordIsVisible, setPasswordIsVisible] = useState(false);
	return (
		<form action={formAction} className="space-y-3">
			<div className="flex-1 rounded-lg bg-gray-50 px-6 pb-4 pt-8">
				<h1 className={"mb-3 text-2xl"}>Please log in to continue.</h1>
				<div className="w-full">
					<div>
						<label
							className="mb-3 mt-5 block text-xs font-medium text-gray-900"
							htmlFor="email"
						>
							Username or Email
						</label>
						<div className="relative">
							<input
								className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
								id="email"
								type="text"
								name="email"
								placeholder="Enter your username or email address"
								defaultValue={
									state?.fields.get("email") as string
								}
								required
							/>
						</div>
					</div>
					<div className="mt-4">
						<label
							className="mb-3 mt-5 block text-xs font-medium text-gray-900"
							htmlFor="password"
						>
							Password
						</label>
						<div className="relative">
							<input
								className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
								id="password"
								type={passwordIsVisible ? "text" : "password"}
								name="password"
								placeholder="Enter password"
								defaultValue={
									state?.fields.get("password") as string
								}
								required
								minLength={4}
								onBlur={() => {
									setPasswordIsVisible(false);
								}}
							/>
						</div>
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
				</div>
				<input type="hidden" name="redirectTo" value={callbackUrl} />
				<button
					className="mt-4 w-full h-10 ml-5 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
					aria-disabled={isPending}
					onClick={() => {
						setPasswordIsVisible(false);
					}}
				>
					Log in{" "}
				</button>
				<div
					className="flex h-8 items-end space-x-1"
					aria-live="polite"
					aria-atomic="true"
				>
					{state?.message && (
						<>
							<p className="text-sm text-red-500">
								{state.message}
							</p>
						</>
					)}
				</div>
			</div>
		</form>
	);
}
