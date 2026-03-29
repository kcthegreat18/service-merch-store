<script lang="ts">
    import { onMount } from "svelte";
    import { createClient } from "@supabase/supabase-js";
    import Card from "$lib/components/Card/Card.svelte";
    import AdvanceSearch from "$lib/components/AdvanceSearch/advance-search.svelte";

    type Variant = {
        id: number;
        VariantName: string;
        Description: string | null;
        BuyingPrice: number | null;
        SellingPrice: number | null;
        StockAmount: number | null;
        Active: boolean | null;
        ImageLink: string | null;
    };

    type ProductWithVariants = {
        id: number;
        Name: string;
        Category: string | null;
        variants: Variant[];
    };

    type CatalogCard = {
        image: string | null;
        price: number;
        name: string;
    };

    const supabase = createClient(
        String(import.meta.env.VITE_SUPABASE_URL),
        String(import.meta.env.VITE_SUPABASE_ANON_KEY)
    );

    let products: ProductWithVariants[] = [];
    let cardProducts: CatalogCard[] = [];

    onMount(async () => {
        const { data, error } = await supabase
            .from("Products")
            .select(`
                id,
                Name,
                Category:Category!Products_CategoryID_fkey (Category),
                variants:Variant!Variant_ProductID_fkey (
                    id,
                    VariantName,
                    Description,
                    BuyingPrice,
                    SellingPrice,
                    StockAmount,
                    Active,
                    ImageLink
                )
            `)
            .order("id", { ascending: true });

        if (error) {
            console.error("Failed to load catalog products", error);
            return;
        }

        products = (data ?? []).map((product) => ({
            id: product.id,
            Name: product.Name,
            Category: product.Category?.[0]?.Category ?? null,
            variants: product.variants ?? []
        }));

        cardProducts = products
            .filter((product) => product.variants.length > 0)
            .map((product) => {
                const primaryVariant = product.variants[0];

                return {
                    image: primaryVariant.ImageLink,
                    price: primaryVariant.SellingPrice ?? 0,
                    name: product.Name
                };
            });

        // This matches the JSON shape you requested.
        console.log("Catalog products:", products);
    });
</script>

<div class="flex px-5">
    <!-- Sording Sidebar -->
    <div class="w-80 flex-shrink-0">
        <AdvanceSearch />
    </div>

    <!-- Catalog Grid -->
    <div class="grid grid-cols-4 px-5 mx-5">
        {#each cardProducts as product}
            <Card image={product.image} price={product.price} name={product.name} />
        {/each}
    </div>
</div>
