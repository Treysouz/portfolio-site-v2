<!--Badge Component-->
<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		/** Content to render inside the badge */
		children?: Snippet;
		/** Additional CSS classes to apply to the badge */
		class?: string;
	}

	let { children = undefined, class: className = '' }: Props = $props();
</script>

<span
	data-testid="badge"
	class={`badge badge-outline h-full py-1 text-center text-xs leading-3 tracking-tight sm:text-nowrap ${className}`}
	>{@render children?.()}</span>
