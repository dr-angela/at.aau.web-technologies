// the model for the product, correponding to the attributes from the JSON file

export class Product {
	id: string;
	title: string;
	description?: string;
	price?: integer = 0;
	likes_count?: integer = 0;
	dislikes_count?: integer = 0;
	tags?: string[];
}
