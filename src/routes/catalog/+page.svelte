<script lang="ts">
	import Card from "$lib/components/Card/Card.svelte";
	import AdvanceSearch from "$lib/components/AdvanceSearch/advance-search.svelte";

	let { data } = $props();
	let selectedFilters = $state([])
	let filteredProducts = $derived(
		// Implements via filtering through string, may be an avenue for improvement
		selectedFilters.length === 0 ? data.products: data.products.filter(prod => selectedFilters.includes(prod.category))
	);

	$effect(() => {
		console.log('data.products: ', data.products);
		console.log('data.categories: ', data.categories)
	});
</script>

<div class="flex px-5">
	<div class="w-80 flex-shrink-0" onchange={() => console.log("changed", selectedFilters)}>
		<AdvanceSearch filterType1={data.categories} bind:selectedFilters={selectedFilters}/>
	</div>

	<div class="grid grid-cols-4 px-5 mx-5">
		{#each filteredProducts as product (product.name)}
			<Card image={product.image} price={product.price} name={product.name} />
		{/each}
	</div>
</div>