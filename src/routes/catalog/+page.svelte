<script lang="ts">
	import Card from "$lib/components/Card/Card.svelte";
	import AdvanceSearch from "$lib/components/AdvanceSearch/advance-search.svelte";
	import type { Product } from "$lib/types.js";

	let { data } = $props();
	let selectedFilters = $state < string[] > ([])
	//let selectedSort = $state<string>("");
	let selectedPriceSort = $state<string>("");
	let selectedNameSort = $state<string>("");

	let filteredProducts = $derived < Product[] > (
		// Implements via filtering through string, may be an avenue for improvement
		selectedFilters.length === 0 ? data.products: data.products.filter(prod => selectedFilters.includes(prod.category))
	);

	let sortedProducts = $derived.by < Product[] > (
		() => {
			if (selectedPriceSort === "price-asc") {
				//return [...filteredProducts].sort((a, b) => a.price - b.price);
				if (selectedNameSort === "name-asc") {
					return [...filteredProducts].sort((a, b) => a.price - b.price || a.name.localeCompare(b.name));
				} else if (selectedNameSort === "name-desc") {
					return [...filteredProducts].sort((a, b) => a.price - b.price || b.name.localeCompare(a.name));
				} else {
					return [...filteredProducts].sort((a, b) => a.price - b.price);
				}
			} else if (selectedPriceSort === "price-desc") {
				//return [...filteredProducts].sort((a, b) => b.price - a.price);
				if (selectedNameSort === "name-asc") {
					return [...filteredProducts].sort((a, b) => b.price - a.price || a.name.localeCompare(b.name));
				} else if (selectedNameSort === "name-desc") {
					return [...filteredProducts].sort((a, b) => b.price - a.price || b.name.localeCompare(a.name));
				} else {
					return [...filteredProducts].sort((a, b) => b.price - a.price);
				}
			} else {
				if (selectedNameSort === "name-asc") {
					return [...filteredProducts].sort((a, b) => a.name.localeCompare(b.name));
				} else if (selectedNameSort === "name-desc") {
					return [...filteredProducts].sort((a, b) => b.name.localeCompare(a.name));
				} else {
					return filteredProducts;
				}
			}
		}
	);

	$effect(() => {
		console.log('data.products: ', data.products);
		console.log('data.categories: ', data.categories)
	});
</script>

<div class="flex px-5">
	<div class="w-80 flex-shrink-0" onchange={() => console.log("changed", selectedFilters)}>
		<AdvanceSearch categoryFilter={data.categories} bind:selectedFilters={selectedFilters} bind:selectedNameSort={selectedNameSort} bind:selectedPriceSort={selectedPriceSort} />
	</div>

	<div class="grid grid-cols-4 px-5 mx-5">
		{#each sortedProducts as product (product.name)}
			<Card image={product.image} price={product.price} name={product.name} />
		{/each}
	</div>
</div>