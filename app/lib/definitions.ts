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
	user_id: string;
};

export type LinkStructure = {
	name?: string;
	href: string;
};

export type InputAttributes = {
	name: string;
	type: string;
	defaultValue?: string;
	placeholder?: string;
	minLength?: number;
	maxLength?: number;
	required?: boolean;
	styles?: string;
};
