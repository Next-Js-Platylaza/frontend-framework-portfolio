import { getCurrentUserId } from "@/auth";
import { fetchRecipesByUser } from "../lib/data";
import RecipeCard from "@/app/ui/recipes/recipe-card";
import { Recipe } from "../lib/definitions";

export default async function Page() {
	const userId = await getCurrentUserId();

	let recipes : Recipe[] | undefined = undefined;
	if (userId) {
		recipes = await fetchRecipesByUser(userId) as Recipe[];
		console.log(recipes);
	}

	return (
		<>
			<p>Recipes Page.</p>
			{recipes?.map((recipe) => {
				return <RecipeCard key={recipe.id} recipe={recipe}/>;	
			})}
		</>
	);
}
