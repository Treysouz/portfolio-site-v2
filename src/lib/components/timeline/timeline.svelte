<!--Section to welcome users to the site introducing name and title of developer -->

<script lang="ts">
	import { Icon, IconWrapper, ErrorState } from '$lib/components';
	import DOMPurify from 'dompurify';

	import type { ExperienceItem } from '$lib/types/experience.types';

	interface Props {
		/** Array of timeline items */
		data?: ExperienceItem[];
		/** Whether data is currently loading */
		loading?: boolean;
	}

	let { data = undefined, loading = true }: Props = $props();

	const getYear = (date?: string) => {
		if (date) {
			return new Date(date).getFullYear();
		}
		{
			return undefined;
		}
	};

	const sanitize = (html?: string) => {
		if (!html) return '';
		return DOMPurify.sanitize(html);
	};
</script>

<div>
	{#if loading}
		<div class="flex h-full w-full items-center justify-center">
			<span class="loading size-12 sm:size-16 lg:size-32"></span>
		</div>
	{:else if data?.length}
		{#each data as experience (experience.name)}
			<div
				class="relative border-l-2 border-white pb-8 pl-12 text-xs tracking-normal last:pb-0 sm:text-sm">
				<IconWrapper class="absolute -left-4 -top-3 sm:-left-6">
					<Icon
						svg={experience.type === 'education' ? 'academic-cap' : 'brief-case'}
						class="text-primary size-6 sm:size-8"></Icon>
				</IconWrapper>
				<h3 class="font-bold tracking-widest">{experience.name}</h3>
				{#if experience?.role}
					<h4>{experience.role}</h4>
				{/if}
				<span class="text-accent"
					>{getYear(experience.startedAt)}{experience?.endedAt
						? ` - ${getYear(experience.endedAt)}`
						: ''}</span>
				<!-- eslint-disable-next-line svelte/no-at-html-tags -->
				<div class="timeline-list text-sm">{@html sanitize(experience.description?.html)}</div>
			</div>
		{/each}
	{:else}
		<ErrorState svg="grimace" header="Timeline failed to load"></ErrorState>
	{/if}
</div>
