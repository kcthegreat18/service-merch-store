<script lang="ts">
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';

	let { children } = $props();
</script>

<svelte:head><link rel="icon" href={favicon} /></svelte:head>

<!-- Specific values may be subject to change-->
<header class="flex items-center px-6 py-4 gap-6 bg-gray-100 shadow-md" >  
	<div>
		<img src="" alt="One Must Imagine A Logo Here" />
	</div>

	<div class="flex-1 flex justify-center">
		<div class="flex items-center bg-gray-200 rounded-full px-4 py-3 w-full max-w-2x1">
			<input
			type="text"
			placeholder="Search..."
			class = "flex-1 bg-transparent outline-none"
			/>
			<img src="" alt="Search Icon"/>
		</div>
	</div>

	<div class = "flex gap-6 px-3">
		<img src="" alt="Account"/>
		<img src="" alt="Cart"/>
	</div>
	
</header>

{@render children()}
