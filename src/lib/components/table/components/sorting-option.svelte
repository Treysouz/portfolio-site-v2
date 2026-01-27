<!--Component to render as a sorting option in the sorting combobox-->

<script lang="ts">
	import { Icon } from '$lib/components';
	import type { SortingOptionConfig } from '../table.types';

	interface Props {
		/**Sorting option config*/
		option: SortingOptionConfig;
	}
	let { option }: Props = $props();
</script>

<div
	class="flex w-full flex-row items-center space-x-2"
	aria-label={option.label}
	title={option.label}>
	<span>{option.header}</span>
	<Icon class="mb-0.5 size-3 sm:size-4" svg={option.desc ? 'arrow-down' : 'arrow-up'}></Icon>
</div>
