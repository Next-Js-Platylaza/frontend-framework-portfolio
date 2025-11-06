import CreateAccountForm from "@/app/ui/account/create-form";
import { Suspense } from "react";

export default function Page() {
	return (
		<Suspense>
			<CreateAccountForm />
		</Suspense>
	);
}
