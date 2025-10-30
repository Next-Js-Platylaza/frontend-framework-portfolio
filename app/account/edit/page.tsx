import EditAccountForm from "@/app/ui/account/edit-form";
import { fetchUser } from "@/app/lib/data";
import { getCurrentUserId } from "@/auth";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { Suspense } from "react";

export default async function Page() {
	const userId = (await getCurrentUserId()) as string;
	const user = await fetchUser("id", userId);

	/*
	const searchParams = useSearchParams();
	const username = searchParams.get("name");
	const email = searchParams.get("email");

	if (!username || !email) {
		revalidatePath(
			`/account/edit?name=${user?.name as string}&email=${
				user?.email as string
			}`,
		);
		redirect(
			`/account/edit?name=${user?.name as string}&email=${
				user?.email as string
			}`,
		);
	}*/
	return (
		<Suspense>
			<EditAccountForm />
		</Suspense>
	);
}
