import { getCurrentUserId } from "@/auth";
import { fetchRecipesPages, fetchRecipesByUser } from "@/app/lib/data";
import RecipeCard from "@/app/ui/recipes/recipe-card";
import { Recipe } from "@/app/lib/definitions";

export default async function Page(props: {
	searchParams?: Promise<{
		query?: string;
		page?: string;
	}>;
}) {
	const userId = await getCurrentUserId();

	const searchParams = await props.searchParams;
	const query = searchParams?.query || "";
	const currentPage = Number(searchParams?.page) || 1;
	const totalPages = await fetchRecipesPages(query, userId as string);

	let recipes: Recipe[] | undefined = undefined;
	if (userId) {
		recipes = (await fetchRecipesByUser(userId)) as Recipe[];
		console.log(recipes);
	}

	return (
		<>
			<p>Recipes Page.</p>
			{recipes?.map((recipe) => {
				return (
					<div key={recipe.id}>
						<br />
						<RecipeCard recipe={recipe} />
						<br />
						<hr />
					</div>
				);
			})}
		</>
	);
}
