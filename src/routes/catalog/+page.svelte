<script lang="ts">
    import Card from "$lib/components/Card/Card.svelte";

    class Product {
        image: string | null;
        price: number;
        name: string;

        constructor(image: string | null, price: number, name: string) {
            this.image = image;
            this.price = price;
            this.name = name;
        }
    }

    // populate products with data from Supabase in the future
    let products = [
        new Product(null, 199.99, "Product 1"),
        new Product(null, 299.99, "Product 2"),
        new Product(null, 399.99, "Product 3"),
        new Product(null, 499.99, "Product 4"),
        new Product("/lorem.ipsum", 1, "Product 5")
    ];
</script>

<h1>This is the Catalog Page</h1>

<!-- Catalog Grid -->
<div class="grid grid-cols-4 px-5 mx-5">
    {#each products as product}
        <Card image={product.image} price={product.price} name={product.name} />
    {/each}
</div>