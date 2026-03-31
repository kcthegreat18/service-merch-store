<script lang="ts">
	import Card from "$lib/components/Card/Card.svelte";
	import AdvanceSearch from "$lib/components/AdvanceSearch/advance-search.svelte";

	let { data } = $props();
	$effect(() => {
		console.log('data.products:', data.products);
	});
</script>

<div class="flex px-5">
	<div class="w-80 flex-shrink-0">
		<AdvanceSearch />
	</div>

	<div class="grid grid-cols-4 px-5 mx-5">
		{#each data.products as product (product.name)}
			<Card image={product.image} price={product.price} name={product.name} />
		{/each}
	</div>
</div>