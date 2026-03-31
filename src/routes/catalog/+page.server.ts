import { supabase } from '$lib/supabaseClient';

export async function load() {
	const { data, error } = await supabase
		.from('Variant')
		.select(`
			ImageLink,
			SellingPrice,
			VariantName,
			Products!inner(
				id,
				Category!inner(
					id,
					Category
				)
			)
		`)
		.eq('Active', true)


	if (error) {
		console.error('Supabase error:', error);
		return { products: [] };
	}

	//console.log('RAW FIRST ROW:', JSON.stringify(data?.[0], null, 2));

	const products = (data ?? []).map((variant) => {
		const product = Array.isArray(variant.Products)
			? variant.Products[0]
			: variant.Products;

		const category = Array.isArray(product?.Category)
			? product.Category[0]
			: product?.Category;

		return {
			image: variant.ImageLink ?? null,
			price: Number(variant.SellingPrice) || 0,
			name: variant.VariantName ?? 'Unnamed Variant',
			category: category?.Category ?? 'No Category'
		};
	});

	return { products };
}