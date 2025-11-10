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
		redirectTo(`../${pageId}`)
	}

	const userId = await getCurrentUserId();
	if (recipe.user_id != userId) redirectTo(`../${pageId}`);

	return (
		<div>	
			<p>View Recipe Page.</p>
			<br/>
			<ul className="list-disc">
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
		</div>
	);
}