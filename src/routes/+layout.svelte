<script lang="ts">
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';
	import MagnifyingGlass from '$lib/assets/magnifying_glass.svg'
	import Cart from '$lib/assets/shopping_cart.svg'
	import Profile from '$lib/assets/profile.svg'
	import CSI_Logo from '$lib/assets/csi_logo.png'

	let { children } = $props();
</script>

<svelte:head><link rel="icon" href={favicon} /></svelte:head>

<!-- Specific values may be subject to change-->
<header class="flex items-center px-6 py-4 gap-6 bg-gray-100 shadow-lg/25" >  
	<div class="flex-1">
		<a href='/'>
			<img src={CSI_Logo} alt="CSI Logo" />
		</a>
	</div>

	<div class="flex-4 flex justify-center py-2">
		<div class="flex items-center bg-gray-200 rounded-full px-6 pr-9 py-3 w-full max-w-2x1">
			<input
			type="text"
			placeholder="Search..."
			class = "flex-1 bg-transparent outline-none"
			/>
			<img src={MagnifyingGlass} alt="Search Icon"/>
		</div>
	</div>

	<div class = "flex px-4">
		<div class="flex items-center gap-10">
			<img src={Profile} alt="Account"/>
			<img src={Cart} alt="Cart"/>
		</div>
	</div>
	
</header>

{@render children()}
