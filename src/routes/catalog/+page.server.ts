import { supabase } from '$lib/supabaseClient';

export async function load() {
	
	const [ variantResult, categoryResult ] = await Promise.all([
		supabase
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
		
		,
		
		supabase
		.from('Category')
		.select(`id, Category`)
	])
	
	const { data: variantData, error: variantError } = variantResult
	const { data: categoryData, error: categoryError } = categoryResult


	if (variantError) {
		console.error('Supabase Variant error:', variantError);
		return { products: [], categories: [] };
	}

	if (categoryError) {
		console.error('Supabase Category error:', categoryError);
		return { products: [], categories: [] };
	}

	//console.log('RAW FIRST ROW:', JSON.stringify(data?.[0], null, 2));

	const products = (variantData ?? []).map((variant) => {
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

	const categories = (categoryData ?? []).map((categ) => ({
		id: categ.id,
		category: categ.Category
	}));

	return { products, categories };
}