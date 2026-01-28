<!--Icon link for navigation bar-->

<script lang="ts">
	import { SVGS, Icon, IconWrapper } from '$lib/components';
	import type { HTMLAnchorAttributes } from 'svelte/elements';

	interface Props {
		/** Text to render inside the link */
		text?: string;
		/** The name of the SVG icon to display (must be a valid key from svgs.ts) */
		svg?: keyof typeof SVGS;
		/** Props for anchor element*/
		anchorProps?: HTMLAnchorAttributes;
		/** Whether this nav item is currently active */
		isActive?: boolean;
		/** Handler for item click */
		onclick?: (event: MouseEvent) => unknown;
		/** Additional CSS classes to apply to the component */
		class?: string;
	}

	let {
		text = '',
		svg = 'home',
		anchorProps = undefined,
		isActive = false,
		onclick = undefined,
		class: className = ''
	}: Props = $props();

	let parentName = $derived(anchorProps?.href ? 'a' : 'div');
</script>

<svelte:element
	this={parentName}
	{onclick}
	{...anchorProps}
	class="sm:hover:bg-secondary/25 flex items-center justify-center font-bold text-white {className} {isActive
		? 'bg-secondary/50'
		: ''}">
	<div class="flex flex-col items-center justify-start space-y-2 sm:space-y-4">
		<IconWrapper class="text-primary">
			<Icon {svg} class="size-6 sm:size-10"></Icon>
		</IconWrapper>
		<span class="whitespace-nowrap text-center text-xs sm:text-base">{text}</span>
	</div>
</svelte:element>
