<script lang="ts">
    import { onMount } from "svelte";
    import Card from "$lib/components/Card/Card.svelte";
    import AdvanceSearch from "$lib/components/AdvanceSearch/advance-search.svelte";
    import { supabase } from "$lib/supabaseClient";

    type CategoryRow = {
        id: number;
        Category: string;
    };

    type ProductRow = {
        id: number;
        CategoryID: number;
        Name: string;
        Description: string | null;
    };

    type VariantRow = {
        id: number;
        ProductID: number;
        VariantName: string;
        Description: string | null;
        SellingPrice: number | null;
        StockAmount: number | null;
        Active: boolean | null;
        ImageLink: string | null;
    };

    type ProductCard = {
        id: number;
        image: string | null;
        price: number;
        name: string;
        category: string;
    };

    let products: ProductCard[] = [];
    let loading = true;
    let errorMessage: string | null = null;

    const DEFAULT_PRICE = 0;
    const UNCATEGORIZED = "Uncategorized";

    const toProductCard = (
        product: ProductRow,
        variants: VariantRow[],
        categoryName: string | undefined
    ): ProductCard => {
        const activeVariants = variants.filter((variant) => variant.Active !== false);

        const cheapestVariant = activeVariants
            .filter((variant) => variant.SellingPrice !== null)
            .sort((a, b) => (a.SellingPrice ?? DEFAULT_PRICE) - (b.SellingPrice ?? DEFAULT_PRICE))[0];

        const imageVariant = activeVariants.find((variant) => variant.ImageLink);

        return {
            id: product.id,
            image: imageVariant?.ImageLink ?? null,
            price: cheapestVariant?.SellingPrice ?? DEFAULT_PRICE,
            name: product.Name,
            category: categoryName ?? UNCATEGORIZED
        };
    };

    onMount(async () => {
        const [productsResult, variantsResult, categoriesResult] = await Promise.all([
            supabase.from("Products").select("id, CategoryID, Name, Description").order("id", { ascending: true }),
            supabase
                .from("Variants")
                .select("id, ProductID, VariantName, Description, SellingPrice, StockAmount, Active, ImageLink")
                .order("id", { ascending: true }),
            supabase.from("Category").select("id, Category")
        ]);

        if (productsResult.error || variantsResult.error || categoriesResult.error) {
            errorMessage =
                productsResult.error?.message ??
                variantsResult.error?.message ??
                categoriesResult.error?.message ??
                "Unable to load catalog products.";
            loading = false;
            return;
        }

        const categoryById = new Map<number, string>(
            (categoriesResult.data as CategoryRow[]).map((category) => [category.id, category.Category])
        );

        const variantsByProductId = new Map<number, VariantRow[]>();

        (variantsResult.data as VariantRow[]).forEach((variant) => {
            const existing = variantsByProductId.get(variant.ProductID) ?? [];
            existing.push(variant);
            variantsByProductId.set(variant.ProductID, existing);
        });

        products = (productsResult.data as ProductRow[]).map((product) =>
            toProductCard(product, variantsByProductId.get(product.id) ?? [], categoryById.get(product.CategoryID))
        );

        loading = false;
    });
</script>

<div class="flex px-5">
    <!-- Sording Sidebar -->
    <div class="w-80 flex-shrink-0">
        <AdvanceSearch />
    </div>

    <!-- Catalog Grid -->
    <div class="mx-5 grid grid-cols-4 px-5">
        {#if loading}
            <p>Loading catalog products...</p>
        {:else if errorMessage}
            <p>{errorMessage}</p>
        {:else}
            {#each products as product}
                <Card image={product.image} price={product.price} name={product.name} />
            {/each}
        {/if}
    </div>
</div>
