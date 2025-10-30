import LoginForm from "@/app/ui/account/login-form";
import { Suspense } from "react";
export default function Page() {
	return (
		<Suspense>
			<LoginForm />
		</Suspense>
	);
}
