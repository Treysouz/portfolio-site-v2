<!--Tech card component to render inside the tech table-->

<script lang="ts">
	import { Card, Icon, Badge } from '$lib/components';
	import type { Tech } from '$lib/types/tech.types';

	interface Props {
		/** Tech that the card represents*/
		tech: Tech;
	}

	let { tech }: Props = $props();

	let { name, image, proficiency, category } = $derived(tech);
</script>

<Card class="size-38 flex items-center justify-center p-2 sm:size-52 sm:p-4">
	<div class="flex flex-col items-center justify-around space-y-2 sm:space-y-4">
		<img class="size-12 object-contain sm:size-16" loading="lazy" alt={name} src={image.url} />

		<span class="leading-2 text-center font-bold sm:text-lg">{name}</span>
		<div class="flex flex-row" title="Proficiency">
			{#each Array(5) as _, index (index)}
				<Icon
					svg={index + 1 <= (proficiency || 0) ? 'star-filled' : 'star-outline'}
					class="text-accent size-3 sm:size-4"></Icon>
			{/each}
		</div>
		<Badge>{category?.name}</Badge>
	</div>
</Card>
