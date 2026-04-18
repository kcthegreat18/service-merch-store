<script lang="ts">
    import SortIcon from '$lib/assets/sort.svg';
    import FilterIcon from '$lib/assets/filter.svg';
    import DownButton from '$lib/assets/down-button.svg';
    import RightButton from '$lib/assets/right-button.svg';
	import type { Category } from '$lib/types';
    
    let { categoryFilter, selectedFilters = $bindable(), selectedPriceSort = $bindable(), selectedNameSort = $bindable() }: { categoryFilter: Category[], selectedFilters: string[], selectedPriceSort: string, selectedNameSort: string } = $props()
    

    let showSortOptions = $state<boolean>(false);
    let showNameOptions = $state<boolean>(false);
    let showPriceOptions = $state<boolean>(false);
    //let selectedSort = $state<string>(""); // for backend

    function handleClickOutside(event: MouseEvent) {
        const sidebar = document.querySelector('.sort-by-container');
        if (sidebar && !sidebar.contains(event.target as Node)) {
            showSortOptions = false;
            showNameOptions = false;
            showPriceOptions = false;
        }
    }

    $effect(() => {
        document.addEventListener('click', handleClickOutside);
        return () => document.removeEventListener('click', handleClickOutside);
    });

</script>

<div class="fixed mt-10 ml-15">
    <!-- Sort By -->
    <div class="mb-3 flex items-center gap-x-2 relative sort-by-container">
        <img src={SortIcon} class="w-[24px] h-[24px] align-middle" alt="Sort Icon" />
        <h3 style="font-family: 'Inter', sans-serif; font-weight: 400; color: #707070; font-size: 18px;">Sort By</h3>

        <div class="relative">
            <button class="" onclick={() =>showSortOptions = !showSortOptions} style="color: #707070;">
                <img src={DownButton} class="w-[24px] h-[36px] align-middle" alt="Button" />
            </button>

            {#if showSortOptions}
                <div class="absolute rounded-md top-[28px] left-[-15px] z-50 bg-white shadow-md p-2 w-[180px] flex items-center flex-col ml-4 mb-2">
                    <div class="flex items-center gap-x-2 relative">
                        
                        <!-- Name -->
                        <div class="hover:bg-[#D9D9D9] flex items-center w-[180px] h-[30px]">
                            <span class="pl-2" style="font-family: 'Inter', sans-serif; font-weight: 400; color: #707070; font-size: 14px;">Name</span>
                            <button class=" ml-auto pr-2" onclick={() => {showNameOptions = !showNameOptions; showPriceOptions = false}} style="color: #707070;">
                                <img src={RightButton} class="w-[12px] h-[24px] align-middle" alt="Button" />
                            </button>
                        </div>
                        
                        <!-- Name Sorting Options -->
                        {#if showNameOptions}
                            <div class="absolute rounded-md top-[5px] left-[98%] z-50 flex flex-col bg-white shadow-md w-[100px] h-[70px] pt-1.5 whitespace-nowrap">
                                <div class="hover:bg-[#D9D9D9] w-full h-[30px] {selectedNameSort === 'name-asc' ? 'bg-[#D9D9D9]' : ''}">
                                    <button class="pl-3 w-full text-left" style="font-family: 'Inter', sans-serif; font-weight: 400; color: #707070; font-size: 14px;"
                                    onclick={() => selectedNameSort = "name-asc"}>
                                        A - Z
                                    </button>
                                </div>
                                <div class="hover:bg-[#D9D9D9] w-full h-[30px] {selectedNameSort === 'name-desc' ? 'bg-[#D9D9D9]' : ''}">
                                    <button class="pl-3 w-full text-left" style="font-family: 'Inter', sans-serif; font-weight: 400; color: #707070; font-size: 14px;"
                                    onclick={() => selectedNameSort = "name-desc"}>
                                        Z - A
                                    </button>
                                </div>
                            </div>
                        {/if}

                    </div>

                    <div class="flex items-center gap-x-2 relative">
                        
                        <!-- Price -->
                        <div class="hover:bg-[#D9D9D9] flex items-center w-[180px] h-[30px]">
                            <span class="pl-2" style="font-family: 'Inter', sans-serif; font-weight: 400; color: #707070; font-size: 14px;">Price</span>
                            <button class=" ml-auto pr-2" onclick={() => {showPriceOptions = !showPriceOptions; showNameOptions = false}} style="color: #707070;">
                                <img src={RightButton} class="w-[12px] h-[24px] align-middle" alt="Button" />
                            </button>
                        </div>
                        
                        <!-- Price Sorting Options -->
                        {#if showPriceOptions}
                            <div class="absolute rounded-md top-[5px] left-[98%] z-50 flex flex-col bg-white shadow-md w-[100px] h-[70px] pt-1.5 whitespace-nowrap">
                                <div class="hover:bg-[#D9D9D9] w-full h-[30px] {selectedPriceSort === 'price-asc' ? 'bg-[#D9D9D9]' : ''}">
                                    <button class="w-full text-left pl-3" style="font-family: 'Inter', sans-serif; font-weight: 400; color: #707070; font-size: 14px;"
                                    onclick={() => selectedPriceSort = "price-asc"}>
                                        Low - High
                                    </button>
                                </div>
                                <div class="hover:bg-[#D9D9D9] w-full h-[30px] {selectedPriceSort === 'price-desc' ? 'bg-[#D9D9D9]' : ''}">
                                    <button class="w-full text-left pl-3" style="font-family: 'Inter', sans-serif; font-weight: 400; color: #707070; font-size: 14px;"
                                    onclick={() => selectedPriceSort = "price-desc"}>
                                        High - Low
                                    </button>
                                </div>
                            </div>
                        {/if}

                    </div>
                </div>
            {/if}
        </div>
    </div>

    <hr style="border-top: 1px solid #D9D9D9; width: 220px;" />
    
    <!-- Filter -->
    <div class="mt-3 mb-6 flex items-center gap-x-2">
        <img src={FilterIcon} class="w-[24px] h-[24px] align-middle" alt="Filter Icon" />
        <h3 style="font-family: 'Inter', sans-serif; font-weight: 400; color: #707070; font-size: 18px;">Filter</h3>
    </div>

    <!-- Filter Type 1 -->
    <div class="mb-6">
        <h3 style="font-family: 'Inter', sans-serif; font-weight: 400; color: #707070; font-size: 16px;" class="mb-2">Categories</h3>
        {#each categoryFilter as item (item.id)}
            <label class="block mb-1" style="font-family: 'Inter', sans-serif; font-weight: 400; color: #707070; font-size: 14px;">
                <input type="checkbox" bind:group={selectedFilters} value={item.category} class="ml-5 mr-2" />
                {item.category}
            </label>
        {/each}
    </div>
</div>