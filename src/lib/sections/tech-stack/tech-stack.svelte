<!--Section to show tech experience  -->
<script lang="ts">
	import { Table } from '$lib/components';
	import { useQueryClient } from '@tanstack/svelte-query';
	import { queryTechData } from '$lib/utils/tech';
	import TechCard from './components/tech-card.svelte';
	import { Section } from '../section-wrapper';
	import { addErrorToStore } from '$lib/stores/alert';
	import {
		getCoreRowModel,
		type ColumnDef,
		type FilterConfig,
		type OnChangeFn,
		type TableOptions,
		type ColumnFiltersState,
		type SortingState
	} from '@tanstack/table-core';

	import type { SortConfig, Tech } from '$lib/types/tech.types';
	import type { TechCategoryName, TechCategory } from '$lib/types/techCategory.types';

	interface Props {
		/** Tech type options for filtering */
		techTypeOptions: TechCategory[];
	}

	let { techTypeOptions }: Props = $props();

	/** Array of tech data fetched from the API */
	let data: Tech[] = $state([]);
	/** Current global filter/search value */
	let globalFilterValue: string = $state('');
	/** Current column filter state  */
	let columnFilterState: ColumnFiltersState = $state([]);
	/** Current sorting state */
	let sortingState: SortingState = $state([
		{
			id: 'proficiency',
			desc: true
		}
	]);
	/** Loading state indicator for data fetching */
	let loading: boolean = $state(true);

	/** Tanstack Query client instance for data fetching and caching */
	const queryClient = useQueryClient();

	/**
	 * Gets tech data from the API based on current filters and sorting.
	 * @param searchValue - Global search/filter string
	 * @param columnFilters - Column filters
	 * @param sorting - Current sorting order
	 */
	const setTableData = async (
		searchValue?: string,
		columnFilters?: ColumnFiltersState,
		sorting?: SortingState
	) => {
		loading = true;
		try {
			const techTypeFilterState = columnFilters?.find((f) => f.id === 'type');
			const filterValue = techTypeFilterState?.value;

			let selectedTechTypes: TechCategoryName[] = [];
			if (Array.isArray(filterValue)) {
				selectedTechTypes = filterValue?.map((option: TechCategory) => {
					return option.name;
				});
			}

			let sortConfig: SortConfig | undefined = undefined;
			if (sorting?.length) {
				const sortingOption = sorting[0];
				sortConfig = {
					column: sortingOption.id,
					ascending: !sortingOption.desc
				};
			}

			const response = await queryTechData(queryClient, searchValue, selectedTechTypes, sortConfig);
			data = response;
		} catch (error) {
			addErrorToStore('Failed to Query Tech Data', error);
		} finally {
			loading = false;
		}
	};

	/**
	 * Handler for table state changes.
	 * @param updater - Either a new state value or function that transforms old state
	 * @param state - Current state value
	 * @returns Updated state value
	 */
	const handleTableStateChange = <T,>(updater: ((old: T) => T) | T, state: T) => {
		return updater instanceof Function ? updater(state) : updater;
	};

	/**
	 * Handles changes to the global filter value.
	 * @param updater - New global filter value or updater function
	 */
	const handleGlobalFilterChange: OnChangeFn<string> = (updater) => {
		globalFilterValue = handleTableStateChange(updater, globalFilterValue);
	};

	/**
	 * Handles changes to column filters.
	 * @param updater - New column filter state or updater function
	 */
	const handleColumnFilterChange: OnChangeFn<ColumnFiltersState> = (updater) => {
		columnFilterState = handleTableStateChange(updater, columnFilterState);
	};

	/**
	 * Handles changes to sorting state.
	 * @param updater - New sorting state or updater function
	 */
	const handleSortingChange: OnChangeFn<SortingState> = (updater) => {
		sortingState = handleTableStateChange(updater, sortingState);
	};

	/**
	 * Creates Tanstack table configuration options.
	 * @param data - Data to display in the table
	 * @returns Table configuration
	 */
	const createTableOptions = (data: Tech[]): TableOptions<Tech> => {
		const typeFilterConfig: FilterConfig<TechCategory> = {
			filterType: 'multi-select',
			data: techTypeOptions,
			multiple: true,
			idKey: 'name',
			nameKey: 'name',
			label: 'Tech Type',
			placeholder: 'Select a Tech Type'
		};

		const columns: ColumnDef<Tech>[] = [
			{ accessorKey: 'name', header: 'Name' },
			{
				accessorKey: 'imgUrl',
				enableGlobalFilter: false,
				enableColumnFilter: false,
				enableSorting: false
			},
			{
				accessorKey: 'proficiency',
				enableGlobalFilter: false,
				enableColumnFilter: false,
				header: 'Proficiency'
			},
			{
				accessorKey: 'type',
				header: 'Tech Type',
				enableGlobalFilter: false,
				meta: {
					filterConfig: typeFilterConfig
				}
			}
		];

		return {
			data,
			columns,
			state: {
				globalFilter: globalFilterValue,
				columnFilters: columnFilterState,
				sorting: sortingState
			},
			getCoreRowModel: getCoreRowModel(),
			manualFiltering: true,
			onGlobalFilterChange: handleGlobalFilterChange,
			onColumnFiltersChange: handleColumnFilterChange,
			onSortingChange: handleSortingChange
		};
	};

	/** Table options  */
	let options: TableOptions<Tech> = $derived(createTableOptions(data));

	/**
	 * Gets new data if filter state or sorting state for the table change.
	 */
	$effect(() => {
		setTableData(globalFilterValue, columnFilterState, sortingState);
	});
</script>

<Section id="tech" header="Tech Stack" class="h-full">
	<div class="flex h-full min-h-0 flex-col space-y-4 sm:space-y-8">
		<p class="text-shadow-lg text-xs sm:text-base">
			A collection of technologies and services I've worked with, with stars showing my level of
			proficiency.
		</p>
		<Table {data} {options} {loading} label="Tech List">
			{#snippet tableItem(row)}
				<TechCard tech={row.original}></TechCard>
			{/snippet}
		</Table>
	</div>
</Section>
