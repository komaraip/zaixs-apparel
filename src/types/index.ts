export type ActionResult = {
	error: string;
	success?: boolean;
};

export type Tparams = {
	id: string;
};

// Updated to match Next.js 15's expected types
export type PageProps = {
	params?: Promise<Record<string, string | string[]>> | Record<string, string | string[]>;
	searchParams?: Promise<Record<string, string | string[]>> | Record<string, string | string[]>;
};

export type Tedit = {
	params: Tparams;
};

export type TProduct = {
    id: number
    image_url: string
    name: string
    category_name: string
    price: number
}

export type TCart = TProduct & {quantity: number}