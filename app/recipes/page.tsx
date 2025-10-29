import { getCurrentUserId } from "@/auth";
import { fetchRecipesByUser } from "../lib/data";

export default async function Page() {
	const userId = await getCurrentUserId();

	let recipes = undefined;
	if (userId) {
		recipes = await fetchRecipesByUser(userId);
		console.log(recipes);
	}

	return (
		<>
			<p>Recipes Page.</p>
			{recipes?.map((recipe) => {
				return (
					<div key={recipe.id}>
						<br />
						<ul className="list-disc">
							<li>ID: {recipe.id}</li>
							<li>Title: {recipe.title}</li>
							<li>Image Path: {recipe.image}</li>
							<li>
								Ingredients:
								<ol className="list-decimal">
									{recipe.ingredients.map((ingredient) => {
										return (
											<li key={ingredient}>
												{ingredient}
											</li>
										);
									})}
								</ol>
							</li>
							<li>
								Steps:
								<ol className="list-decimal">
									{recipe.steps.map((step) => {
										return <li key={step}>{step}</li>;
									})}
								</ol>
							</li>
						</ul>
						<br />
						<hr />
					</div>
				);
			})}
		</>
	);
}
