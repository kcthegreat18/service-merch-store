<script lang="ts">
    import placeholder from "./placeholder.svg";
    import { goto } from "$app/navigation";

    let { image, price, name } = $props<{
        image: string | null; // path to image in Supabase
        price: number;
        name: string;
    }>();

    let imageUrl = $derived(image ?? placeholder);
</script>

<div class="m-4 flex flex-col overflow-hidden rounded-lg bg-white pb-4">
    <img 
        src={imageUrl} 
        onerror={() => { imageUrl = placeholder }}
        alt={name} 
        class="w-full aspect-square object-cover shadow-sm"
        loading="lazy"
    />

    <div class="p-4">
        <h3 class="text-md font-medium">{name}</h3>
        <p class="text-sm">₱{price.toFixed(2)}</p>
    </div>

    <button 
        class=" w-2/3 mx-auto mt-auto text-sm px-auto py-1 border border-gray-300 text-gray-700 rounded-full hover:bg-black hover:text-white transition-colors"
        onclick={() => goto('/add-to-cart')} // change accordingly
        >
        Buy
    </button>
</div>