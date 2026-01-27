<!--Project card component to render inside the project table-->

<script lang="ts">
	import { Card, Badge, NavItem } from '$lib/components';
	import type { Project } from '$lib/types/project.types';

	interface Props {
		/** Project that the card represents*/
		project: Project;
	}

	/** Class for Nav Items*/
	const NAV_ITEM_CLASS = 'md:size-30 p-2 sm:p-4';

	let { project }: Props = $props();

	let { name, image, description, github, url, techTools } = $derived(project);
</script>

<Card>
	<div
		class="lg:h-100 flex w-full flex-row flex-wrap overflow-hidden rounded-lg md:flex-nowrap xl:h-60">
		<div>
			<img
				class="md:w-160 w-full object-cover md:h-full"
				loading="lazy"
				alt={name}
				src={image.url} />
		</div>
		<div class="flex w-full flex-row flex-wrap gap-4 p-4 sm:gap-8 sm:p-8 xl:flex-nowrap">
			<div class="flex w-full flex-col justify-between space-y-4 sm:space-y-8">
				<div class="space-y-4 sm:space-y-8">
					<h3 class="leading-2 font-bold sm:text-lg">{name}</h3>
					<span class="text-sm xl:text-base">{description}</span>
				</div>
				<div class="flex flex-row flex-wrap gap-4">
					{#each techTools as tool (tool.name)}
						<Badge class="outline-accent text-accent h-min font-bold outline-1">{tool.name}</Badge>
					{/each}
				</div>
			</div>
			<div>
				<div
					class="flex h-full w-full flex-row flex-wrap items-center justify-around space-x-4 overflow-hidden rounded-lg sm:flex-nowrap sm:space-x-8">
					<NavItem
						svg="github"
						text="GitHub"
						anchorProps={{
							href: github,
							target: '_blank',
							rel: 'noopener'
						}}></NavItem>
					<NavItem
						svg="external-link"
						text="Link"
						anchorProps={{
							href: url,
							target: '_blank',
							rel: 'noopener'
						}}></NavItem>
				</div>
			</div>
		</div>
	</div>
</Card>
