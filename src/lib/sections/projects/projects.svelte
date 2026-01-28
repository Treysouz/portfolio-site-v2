<script lang="ts">
	import { Section } from '../section-wrapper';
	import Table from '$lib/components/table/table.svelte';
	import { getCoreRowModel, type ColumnDef, type TableOptions } from '@tanstack/table-core';
	import { useQueryClient } from '@tanstack/svelte-query';
	import { addErrorToStore } from '$lib/stores/alert';
	import ProjectCard from './components/project-card.svelte';
	import { getProjectData } from '$lib/utils/project';
	import { onMount } from 'svelte';

	import type { Project } from '$lib/types/project.types';

	/** Array of project data fetched from the API */
	let data: Project[] = $state([]);

	/** Loading state indicator for data fetching */
	let loading: boolean = $state(true);

	/** Tanstack Query client instance for data fetching and caching */
	const queryClient = useQueryClient();

	/**
	 * Gets project from the API based.
	 */
	const setTableData = async () => {
		loading = true;
		try {
			const response = await getProjectData(queryClient);
			data = response;
		} catch (error) {
			addErrorToStore('Failed to Get Project Data', error);
		} finally {
			loading = false;
		}
	};

	/**
	 * Creates Tanstack table configuration options.
	 * @param data - Data to display in the table
	 * @returns Table configuration
	 */
	const createTableOptions = (data: Project[]): TableOptions<Project> => {
		const columns: ColumnDef<Project>[] = [
			{ accessorKey: 'name', header: 'Name' },
			{
				accessorKey: 'image'
			},
			{
				accessorKey: 'techTools'
			},
			{
				accessorKey: 'description'
			},
			{
				accessorKey: 'github'
			},
			{
				accessorKey: 'url'
			}
		];

		return {
			data,
			columns,
			getCoreRowModel: getCoreRowModel()
		};
	};

	/** Table options  */
	let options: TableOptions<Project> = $derived(createTableOptions(data));

	onMount(() => {
		setTableData();
	});
</script>

<Section id="projects" header="Projects" class="h-full">
	<div class="flex min-h-0 flex-col space-y-4 sm:space-y-8">
		<p class="text-shadow-lg text-xs sm:text-base">
			Publicly accessible projects I have worked on or are currently in development.
		</p>
	</div>
	<Table {data} {options} {loading} wideLayout={true} label="Project List">
		{#snippet tableItem(row)}
			<ProjectCard project={row.original}></ProjectCard>
		{/snippet}
	</Table>
</Section>
