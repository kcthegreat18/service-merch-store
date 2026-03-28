<script lang="ts">
    import './advance-search.css';
    import SortIcon from '$lib/assets/sort.svg';
    import FilterIcon from '$lib/assets/filter.svg';
    import Line from '$lib/assets/line.svg';

    let filterType1 = {
        "Keychains": false,
        "Stickers": false,
        "Prints": false,
        "Accessories": false
    };
    let filterType2 = {
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
        <h3 class="sidebar-header sort-by-title">Sort By</h3>
        <!-- add dropdown code here-->
    </div>

    <img src={Line} />

    <!-- Filter -->
    <div class="mt-3 mb-6 flex items-center gap-x-2">
        <img src={FilterIcon} class="w-[24px] h-[24px] align-middle" alt="Filter Icon" />
        <h3 class="sidebar-header filter-title">Filter</h3>
    </div>

    <!-- Filter Type 1 -->
    <div class="mb-6">
    <h3 class="sidebar-header filter-type-title mb-2">Filter Type 1</h3>
    {#each Object.keys(filterType1) as item}
        <label class="block mb-1 sidebar-header filter-item">
            <input type="checkbox" bind:checked={filterType1[item]} class="ml-5 mr-2" />
            {item}
        </label>
    {/each}
    </div>

    <!-- Filter Type 2 -->
    <div class="mb-6">
    <h3 class="sidebar-header filter-type-title mb-2">Filter Type 2</h3>
    {#each Object.keys(filterType2) as item}
        <label class="block mb-1 sidebar-header filter-item">
            <input type="checkbox" bind:checked={filterType2[item]} class="ml-5 mr-2" />
            {item}
        </label>
    {/each}
    </div>

</div>