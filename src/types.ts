export interface Product {
	id: number;
	name: Record<string, string>;
	category: Record<string, string>;
	price: number;
	image: string;
}

export interface CartItem extends Product {
	quantity: number;
}