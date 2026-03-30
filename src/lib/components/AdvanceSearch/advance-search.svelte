<script lang="ts">
    import SortIcon from '$lib/assets/sort.svg';
    import FilterIcon from '$lib/assets/filter.svg';
    let filterType1: Record<string, boolean>  = {
        "Keychains": false,
        "Stickers": false,
        "Prints": false,
        "Accessories": false
    };
    let filterType2: Record<string, boolean> = {
        "Filter 1": false,
        "Filter 2": false,
        "Filter 3": false,
        "Filter 4": false
    };
</script>

<div class="fixed mt-10 ml-15">
    <!-- Sort By -->
    <div class="mb-3 flex items-center gap-x-2">
        <img src={SortIcon} class="w-[24px] h-[24px] align-middle" alt="Sort Icon" />
        <h3 style="font-family: 'Inter', sans-serif; font-weight: 400; color: #707070; font-size: 18px;">Sort By</h3>
        <!-- add dropdown code here-->
    </div>
    <hr style="border-top: 1px solid #D9D9D9; width: 220px;" />
    
    <!-- Filter -->
    <div class="mt-3 mb-6 flex items-center gap-x-2">
        <img src={FilterIcon} class="w-[24px] h-[24px] align-middle" alt="Filter Icon" />
        <h3 style="font-family: 'Inter', sans-serif; font-weight: 400; color: #707070; font-size: 18px;">Filter</h3>
    </div>

    <!-- Filter Type 1 -->
    <div class="mb-6">
        <h3 style="font-family: 'Inter', sans-serif; font-weight: 400; color: #707070; font-size: 16px;" class="mb-2">Filter Type 1</h3>
        {#each Object.keys(filterType1) as item}
            <label class="block mb-1" style="font-family: 'Inter', sans-serif; font-weight: 400; color: #707070; font-size: 14px;">
                <input type="checkbox" bind:checked={filterType1[item]} class="ml-5 mr-2" />
                {item}
            </label>
        {/each}
    </div>

    <!-- Filter Type 2 -->
    <div class="mb-6">
        <h3 style="font-family: 'Inter', sans-serif; font-weight: 400; color: #707070; font-size: 16px;" class="mb-2">Filter Type 2</h3>
        {#each Object.keys(filterType2) as item}
            <label class="block mb-1" style="font-family: 'Inter', sans-serif; font-weight: 400; color: #707070; font-size: 14px;">
                <input type="checkbox" bind:checked={filterType2[item]} class="ml-5 mr-2" />
                {item}
            </label>
        {/each}
    </div>
</div>