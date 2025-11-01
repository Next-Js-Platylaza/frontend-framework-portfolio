import { fetchRecipeById } from "@/app/lib/data";
import RecipeCard from "@/app/ui/recipes/recipe-card";
import { getCurrentUserId } from "@/auth";
import { redirect } from "next/navigation";

export default async function Page(props: { params: Promise<{ id: string }> }) {
	const params = await props.params;
	const id = params.id;
	const userId = await getCurrentUserId();
	console.log(userId);

	const recipe = await fetchRecipeById(id);
	if (!recipe || recipe.user_id != userId) redirect(`../${id}`);
	console.log(recipe);

	return (
		<div>	
			<p>View Recipe Page.</p>
			<RecipeCard recipe={recipe}/>
		</div>
	);
}
