<script lang="ts">
	import Card from '$lib/components/card/card.svelte';
	import { WelcomeSection, AboutSection, TechStackSection, ProjectSection } from '$lib/sections';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
</script>

<header class="h-full">
	<WelcomeSection greeting={data.greeting}></WelcomeSection>
</header>

<AboutSection></AboutSection>

<TechStackSection techTypeOptions={data.techTypeOptions || []}></TechStackSection>

<ProjectSection></ProjectSection>

<footer>
	<div class="flex w-full flex-row items-center justify-center">
		<Card
			class="w-full space-y-1 rounded-none p-4 text-center lg:w-auto lg:rounded-b-none lg:rounded-t-lg"
			><span class="text-xs sm:text-sm">Copyright © 2025 Tremayne Souza </span>
			<span class="text-xs sm:text-sm">
				All other copyrighted materials are property of their respective copyright holders
			</span></Card>
	</div>
</footer>
