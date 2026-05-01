# service-merch-store

## API to Svelte Frontend Integration (Step-by-Step)

This project uses **SvelteKit + Supabase**. The catalog page retrieves data from Supabase in a server `load` function, then passes it to Svelte components for filtering, sorting, and rendering.

---

### 1) Configure API access through environment variables

Supabase credentials are read from public environment variables:

- `PUBLIC_SUPABASE_URL`
- `PUBLIC_SUPABASE_ANON_KEY`

These are consumed in `src/lib/supabaseClient.js`, where a Supabase client is initialized with `createClient(...)`.

```js
import { createClient } from '@supabase/supabase-js';
import { PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY } from '$env/static/public';

export const supabase = createClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY);
```

Why this matters in interviews:
- You can explain that you centralized API client creation in one module.
- Any route that needs database/API access imports the same client.

---

### 2) Fetch data in SvelteKit server load

The data flow starts in `src/routes/catalog/+page.server.ts`.

- The `load()` function runs on the server when `/catalog` is requested.
- It executes two API queries in parallel using `Promise.all(...)`:
  1. `Variant` table query (with related `Products` and nested `Category`).
  2. `Category` table query.

This is efficient because both requests are sent at the same time rather than sequentially.

Key points from the implementation:
- `supabase.from('Variant').select(...).eq('Active', true)` fetches active variants only.
- It uses Supabase relational selection (`Products!inner(...)` and `Category!inner(...)`) to pull joined data in one call.
- `supabase.from('Category').select('id, Category')` fetches filter options for the UI.

---

### 3) Normalize API response into frontend-safe types

Raw API results are transformed into app-specific types in `+page.server.ts`.

Types live in `src/lib/types.ts`:
- `Product` shape: `{ image, price, name, category }`
- `Category` shape: `{ id, category }`

Transformation details:
- Handles possible array/object forms of nested relations.
- Converts numeric values safely (`Number(variant.SellingPrice) || 0`).
- Adds fallbacks (`'Unnamed Variant'`, `'No Category'`, `null` image).

Why this matters:
- The Svelte page receives a clean, predictable data contract.
- UI code stays simple and does not need to understand database-specific structure.

---

### 4) Return server data to the page

`load()` returns:

- `products: Product[]`
- `categories: Category[]`

In SvelteKit, this returned object is automatically exposed as `data` in `src/routes/catalog/+page.svelte`.

---

### 5) Consume `data` in the Svelte page

In `+page.svelte`:

- `let { data } = $props();` receives the server payload.
- Reactive state is used for:
  - `selectedFilters`
  - `selectedPriceSort`
  - `selectedNameSort`
- Derived values calculate:
  - `filteredProducts` (category filtering)
  - `sortedProducts` (price/name sorting combinations)

This means API data is fetched once, then all interaction (filter/sort) is done client-side for fast UX.

---

### 6) Render components with transformed API data

Still in `+page.svelte`:

- `<AdvanceSearch ... />` receives `data.categories` and updates selected filters/sorts.
- `<Card ... />` components render from `sortedProducts`.

Mapping:
- API `products` -> `Card` props (`image`, `price`, `name`)
- API `categories` -> search/filter UI options

---

### 7) Error handling strategy

In `+page.server.ts`:

- If either Supabase query fails, the code logs the error and returns empty arrays.
- This prevents the frontend from crashing and keeps component contracts stable.

Interview talking point:
- "I return resilient defaults (`[]`) so the page can still render gracefully even if backend data fails."

---

## End-to-end flow summary

1. User opens `/catalog`.
2. SvelteKit runs `+page.server.ts` `load()` on the server.
3. Server queries Supabase (variants + categories).
4. Server transforms raw rows into typed `Product[]` and `Category[]`.
5. Server returns `{ products, categories }`.
6. Svelte page receives `data` via props.
7. Client-side reactivity handles filtering/sorting.
8. UI renders cards and filter controls.

---

## Interview-ready explanation (short version)

> "I used SvelteKit server load functions to fetch data from Supabase before rendering the page. I run queries in parallel with Promise.all, normalize the response into typed frontend models, and return safe defaults on errors. The Svelte page consumes that data through `data` props, then applies client-side filtering and sorting reactively for fast interaction."

---

## Current scope note

- The `/catalog` route is connected to Supabase.
- The `/product/[slug]` route currently uses placeholder content and slug-derived display name, and is not yet wired to live API data.
