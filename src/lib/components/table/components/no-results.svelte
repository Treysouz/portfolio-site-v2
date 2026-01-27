<script lang="ts">
	import { ErrorState } from '$lib/components';

	interface Props {
		/** Whether this component is rendering in the context of a table error*/
		isError?: boolean;
	}

	let { isError = false }: Props = $props();

	/** Text to render as header for error state*/
	let header = $derived(isError ? 'Something went wrong' : 'No results found');
	/** Text to render as content below header for error state*/
	let message = $derived(
		isError ? 'Please try again later' : 'Please check your input and filters and try again'
	);
</script>

<ErrorState svg={isError ? 'grimace' : 'frown'} {header} {message}></ErrorState>
