import { fetchRecipeById } from "@/app/lib/data";
import RecipeCard from "@/app/ui/recipes/recipe-card";
import { getCurrentUserId } from "@/auth";
import { redirect as redirectTo } from "next/navigation";

let pageId : string;
export default async function Page(props: { params: Promise<{ id: string }> }) {
	const params = await props.params;
	pageId = params.id;

	let recipe = {
		id: "",
		title: "",
		image: "",
		ingredients: [""],
		steps: [""],
		user_id: "",
	}; 
	try {
		recipe = await fetchRecipeById(pageId);
	} catch {
		redirect();
	}

	const userId = await getCurrentUserId();
	if (recipe.user_id != userId) redirect();

	return (
		<div>	
			<p>View Recipe Page.</p>
			<br/>
			<RecipeCard recipe={recipe}/>
		</div>
	);
}

function redirect() {
	redirectTo(`../${pageId}`)
}