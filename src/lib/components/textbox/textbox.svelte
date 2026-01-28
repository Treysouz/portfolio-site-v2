<!--Text Box component -->

<script lang="ts">
	import { Icon } from '$lib/components';
	import type { Snippet } from 'svelte';
	import type { FormEventHandler, HTMLInputAttributes } from 'svelte/elements';

	interface Props extends HTMLInputAttributes {
		/** Name of input*/
		name: string;
		/** Text in box*/
		value?: string | number;
		/** Content to render before textbox input*/
		boxPrefix?: Snippet;
		/** Content to render after textbox input */
		boxSuffix?: Snippet;
		/** Additional CSS classes to apply to the component */
		class?: string;
		/** Debounce delay in milliseconds for oninput event */
		debounce?: number;
	}

	let {
		name,
		type = 'text',
		value = $bindable(undefined),
		boxPrefix = undefined,
		boxSuffix = undefined,
		class: className = '',
		debounce = 0,
		oninput,
		...props
	}: Props = $props();

	/** Reference to input element*/
	let inputElement: HTMLInputElement;

	/** Timeout ID for debouncing */
	let debounceTimeout: ReturnType<typeof setTimeout> | undefined;

	/** Focuses input element when called*/
	export const focusInput = () => {
		inputElement?.focus();
	};

	/**
	 * Handles input events with optional debouncing
	 * @param event - The input event
	 */
	const handleInput: FormEventHandler<HTMLInputElement> = (event) => {
		if (debounceTimeout) {
			clearTimeout(debounceTimeout);
		}

		if (debounce > 0) {
			debounceTimeout = setTimeout(() => {
				oninput?.(event);
			}, debounce);
		} else {
			oninput?.(event);
		}
	};
</script>

<label
	class="input focus-within:outline-accent h-8 bg-black/25 shadow-lg backdrop-blur-lg focus-within:outline-offset-0 sm:h-10 {className}">
	{#if type === 'search'}
		<div class="&>*]:rounded-l-lg flex h-full items-center justify-center">
			<Icon svg="magnifying-glass" class="-mt-0.5 size-4 sm:size-5"></Icon>
		</div>
	{/if}
	{#if boxPrefix}
		<div class="h-full *:rounded-l-lg">
			{@render boxPrefix()}
		</div>
	{/if}
	<input
		{name}
		{...props}
		bind:value
		oninput={handleInput}
		class="w-full bg-transparent px-1 text-sm placeholder-gray-400 ring-0 sm:text-base"
		bind:this={inputElement} />
	{#if boxSuffix}
		<div class="h-full *:rounded-r-lg">
			{@render boxSuffix()}
		</div>
	{/if}
</label>

<style>
	input[type='search']::-webkit-search-cancel-button {
		cursor: pointer;
		filter: brightness(0) invert(0.5);
	}

	input[type='search']::-webkit-search-cancel-button:hover {
		filter: brightness(0) invert(1);
	}
</style>
