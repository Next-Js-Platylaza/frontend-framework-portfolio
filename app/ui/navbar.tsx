import { signOut } from "@/auth";
import NavLinks from "@/app/ui/nav-links";

export default function Navbar() {
	return (
		<div className="flex w-full">
			<NavLinks />
		</div>
	);
}
