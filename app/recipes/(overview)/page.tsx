import { fetchRecipesPages } from "@/app/lib/data";
import Pagination from "@/app/ui/recipes/paginiation";

export default async function Page(props: {
	searchParams?: Promise<{
		query?: string;
		page?: string;
	}>;
}) {
	const searchParams = await props.searchParams;
	const query = searchParams?.query || "";
	const currentPage = Number(searchParams?.page) || 1;
	const itemsPerPage = 3;
	const recipes = await fetchRecipesPages(query, itemsPerPage);

	return (
		<div className="bg-gray-200 min-h-[450px] min-w-[475px] w-[80%] border-gray-400 border-6 p-2 my-5 mx-auto">
			<Pagination
				currentPage={currentPage}
				recipesPerPage={itemsPerPage}
				recipes={recipes}
			/>
		</div>
	);
}
