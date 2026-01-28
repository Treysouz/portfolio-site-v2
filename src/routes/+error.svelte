<script lang="ts">
	import { page } from '$app/state';
	import ErrorState from '$lib/components/error-state/error-state.svelte';
</script>

<ErrorState
	svg="grimace"
	header="Page failed to load"
	message="Status Code {page.status} - {page.error?.message}"></ErrorState>
