<!--Table Component-->

<script lang="ts" generics="Entity">
	import { createSvelteTable } from '$lib/utils/tanstack/table.utils.svelte';
	import { Textbox, Combobox } from '$lib/components';
	import NoResults from './components/no-results.svelte';
	import SortingOption from './components/sorting-option.svelte';
	import { onMount, type Snippet } from 'svelte';
	import type { SortingOptionConfig } from './table.types';
	import type { Row, TableOptions, Column, Table, SortingState } from '@tanstack/table-core';
	import type { FormEventHandler } from 'svelte/elements';

	interface Props {
		/** Accessible label for the table */
		label: string;
		/** Tanstack Table configuration options */
		options: TableOptions<Entity>;
		/** Snippet for rendering individual table rows */
		tableItem: Snippet<[Row<Entity>]>;
		/** Array of data entities to display */
		data?: Entity[];
		/** Whether data is currently loading */
		loading?: boolean;
		/** Whether an error occurerd while getting data */
		errorThrown?: boolean;
	}

	let {
		options,
		tableItem,
		label,
		loading = false,
		data = undefined,
		errorThrown = false
	}: Props = $props();

	/** Array of columns that support filtering */
	let filterableColums: Column<Entity, unknown>[] = $state([]);
	/** Array of columns that support sorting */
	let sortableColumns: Column<Entity, unknown>[] = $state([]);
	/** Available sorting options generated from sortable columns */
	let sortingOptions: SortingOptionConfig[] = $state([]);
	/** Currently selected sorting configuration */
	let selectedSortingOrder: SortingOptionConfig[] = $state([]);

	/**
	 * Updates the global filter value for the table based on search input.
	 * @param {Event} event - Input event from the search textbox
	 */
	const updateGlobalFilter: FormEventHandler<HTMLInputElement> = (event) => {
		if (event.target && 'value' in event.target) {
			table.setGlobalFilter(event.target?.value);
		}
	};

	/**
	 * Updates the filter value for a specific column.
	 * @param {Column<Entity, unknown>} column - The column to filter
	 * @param {T[]} value - Array of filter values to apply
	 */
	const updateFilter = <T,>(column: Column<Entity, unknown>, value?: T[]) => {
		column.setFilterValue(value);
	};

	/**
	 * Updates the table sorting based on selected sorting option.
	 * @param {SortingOptionConfig[]} value - Selected sorting configuration
	 */
	const updateSorting = (value?: SortingOptionConfig[]) => {
		const sortingOption = value?.[0];
		if (sortingOption) {
			const sortingState: SortingState = [
				{
					id: sortingOption.columnId,
					desc: sortingOption.desc
				}
			];
			table.setSorting(sortingState);
		} else {
			table.resetSorting();
		}
	};

	/**
	 * Generates sorting options from sortable columns.
	 * @param {Column<Entity, unknown>[]} columns - Array of sortable columns
	 */
	const getSortingOptions = (columns: Column<Entity, unknown>[]) => {
		columns.forEach((column) => {
			const id = column.id;
			const header = String(column.columnDef?.header);

			sortingOptions = [
				...sortingOptions,
				{ id: `${id}-asc`, header, desc: false, columnId: id, label: `${header} Ascending` },
				{ id: `${id}-desc`, header, desc: true, columnId: id, label: `${header} Descending` }
			];
		});
	};

	/**
	 * Updates selectedSortingOrder based on current table sorting state.
	 * @param {SortingState} state - Current sorting state from the table
	 */
	const sortingStateToSelectedOption = (state: SortingState) => {
		if (state.length) {
			const sortingOptionId = state[0].id;

			const sortingOrder = sortingOptions.find((option) => {
				return option.columnId === sortingOptionId;
			});

			if (sortingOrder) {
				sortingOrder.desc = state[0].desc;
			}

			selectedSortingOrder = sortingOrder ? [sortingOrder] : [];
		} else {
			selectedSortingOrder = [];
		}
	};

	/**
	 * Parses all table columns to identify filterable and sortable columns.
	 * Populates filterableColums and sortableColumns arrays.
	 * @param {Table<Entity>} table - Tanstack table instance
	 */
	const parseColumns = (table: Table<Entity>) => {
		const columns = table.getAllColumns();
		columns.forEach((column) => {
			if (column.getCanFilter()) {
				filterableColums = [...filterableColums, column];
			}
			if (column.getCanSort()) {
				sortableColumns = [...sortableColumns, column];
			}
		});
	};

	/** Tanstack table instance created from options */
	const table = $derived(createSvelteTable(options));

	/**
	 * Initializes columns, sorting options, and default sorting state on mount.
	 */
	onMount(() => {
		parseColumns(table);
		getSortingOptions(sortableColumns);
		sortingStateToSelectedOption(table.getState().sorting);
	});
</script>

<div class="flex h-full min-h-0 flex-col space-y-4 sm:space-y-8">
	<div class="z-10 flex w-full flex-row flex-wrap items-center gap-4 sm:gap-8 xl:flex-nowrap">
		<Textbox
			name={label}
			type="search"
			class="w-full md:max-w-lg"
			placeholder="Search for tech"
			debounce={500}
			oninput={updateGlobalFilter}></Textbox>
		<div class="flex w-full flex-row flex-wrap gap-4 sm:gap-8 md:flex-nowrap">
			{#each filterableColums as column (column.id)}
				{@const canFilter = column.getCanFilter()}
				{@const filterConfig = column.columnDef.meta?.filterConfig}
				{#if canFilter && filterConfig}
					{@const filterValue = column.getFilterValue()}
					<Combobox
						label={filterConfig.label}
						options={filterConfig.data}
						idKey={filterConfig.idKey}
						nameKey={filterConfig.nameKey}
						value={Array.isArray(filterValue) ? filterValue : undefined}
						class="md:w-xs w-full"
						multiple={filterConfig.multiple}
						enableSearch
						placeholder={filterConfig.placeholder}
						onselect={(value) => {
							updateFilter(column, value);
						}}></Combobox>
				{/if}
			{/each}

			<Combobox
				label="Sort Table"
				options={sortingOptions}
				idKey="id"
				nameKey="header"
				class="md:w-xs w-full"
				placeholder="--Sort table--"
				value={selectedSortingOrder}
				onselect={updateSorting}>
				{#snippet selectedItemComponent(value)}
					<SortingOption option={value[0]}></SortingOption>
				{/snippet}
				{#snippet listItemComponent(option)}
					<SortingOption {option}></SortingOption>
				{/snippet}</Combobox>
		</div>
	</div>

	{#if loading}
		<div class="flex h-full w-full items-center justify-center">
			<span class="loading size-12 sm:size-16 lg:size-32"></span>
		</div>
	{:else if data?.length}
		<!-- svelte-ignore a11y_no_noninteractive_tabindex -->
		<div
			class="flex w-full flex-row flex-wrap items-start justify-center gap-4 overflow-auto border-t pt-4 sm:gap-8 sm:pt-8 xl:justify-start"
			role="list"
			aria-label={label}
			tabindex="0">
			{#each table.getRowModel().rows as row (row.id)}
				<div role="listitem">
					{@render tableItem(row)}
				</div>
			{/each}
		</div>
	{:else}
		<NoResults isError={errorThrown}></NoResults>
	{/if}
</div>
