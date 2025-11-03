"use client";
import { Recipe } from "@/app/lib/definitions";
import Link from "next/link";

export default function RecipeCard({recipe}:{recipe : Recipe}) {
	return (
        <Link
            href={`/recipes/${recipe.id}/view`}
        >
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
	    </Link>
	);
}
