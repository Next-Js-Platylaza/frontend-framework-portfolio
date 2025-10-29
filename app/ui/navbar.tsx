import { signOut } from "@/auth";
import NavLinks from "@/app/ui/nav-links";

export default function Navbar({ children }: { children: React.ReactNode }) {
	return (
		<div className="flex w-full bg-gray-300 p-2">
			<NavLinks />
			{children}
		</div>
	);
}
