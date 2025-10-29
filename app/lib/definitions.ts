export type User = {
	id: string;
	name: string;
	email: string;
	password: string;
};
export type Recipe = {
	id: string;
	title: string;
	image: string;
	ingredients: string[];
	steps: string[];
	userId: string;
};

export interface LinkStructure {
	name?: string;
	href: string;
}
