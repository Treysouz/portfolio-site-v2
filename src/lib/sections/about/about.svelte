<!--Section detailing developer's professional experience-->

<script lang="ts">
	import { Card, Timeline, NavItem } from '$lib/components';
	import type { ExperienceItem } from '$lib/types/experience.types';
	import { getExperienceData } from '$lib/utils/experience';
	import { Section } from '../section-wrapper';
	import { addErrorToStore } from '$lib/stores/alert';

	/** Class for Nav Items*/
	const NAV_ITEM_CLASS = 'md:size-30 p-2 sm:p-4';

	/** Array of experience data fetched from the API */
	let data: ExperienceItem[] = $state([]);

	/** Loading state indicator for data fetching */
	let loading: boolean = $state(true);

	/**
	 * Gets experience data from the API and defines timeline data.
	 */
	const setTimelineData = async () => {
		loading = true;
		try {
			const response = await getExperienceData();
			data = response;
		} catch (error) {
			addErrorToStore('Failed to Get Timeline Data', error);
		} finally {
			loading = false;
		}
	};

	$effect(() => {
		setTimelineData();
	});
</script>

<Section id="about" header="About Me">
	<div
		class="flex h-full w-full grow flex-col justify-between space-x-4 space-y-4 tracking-wide sm:space-x-8 sm:space-y-8 xl:flex-row xl:space-y-0">
		<div class="flex w-full flex-col justify-between space-y-4 sm:space-y-8">
			<Card class="w-full space-y-4 p-4 sm:p-8">
				<p class="text-sm md:text-base">
					I've been coding in one way or another for over 13 years — from tinkering with Myspace
					HTML templates and small school projects to building internal tooling for fast-growing
					companies. For the past 7 years, I've worked as a professional Software Engineer pushing
					code for startups, large-scale platforms, and entrepreneurs with exciting ideas.
					<br />
					<br />

					Beyond shipping features or spinning up new applications from scratch, I've contributed to
					shared libraries, CI/CD pipelines, and developer documentation, and supported hiring
					processes through reviewing code tests, conducting interviews, and onboarding new
					developers.

					<br />
					<br />
					What keeps me motivated is the creative side of development. I have a passion for exploring
					new tools, experimenting with different approaches, and finding better and cooler ways to solve
					problems and improve the user experience.
				</p>
			</Card>
			<Card class="max-w-full p-0 sm:w-min">
				<div
					class="flex w-full flex-row flex-wrap items-center justify-around overflow-hidden rounded-lg sm:flex-nowrap sm:space-x-4">
					<NavItem
						svg="document-text"
						text="Resume"
						class={NAV_ITEM_CLASS}
						anchorProps={{
							href: '/resume',
							target: '_blank',
							rel: 'noopener'
						}}></NavItem>
					<NavItem
						svg="linkedin"
						text="Linkedin"
						class={NAV_ITEM_CLASS}
						anchorProps={{
							href: 'https://www.linkedin.com/in/tremayne-souza-98862b1a5/',
							target: '_blank',
							rel: 'noopener'
						}}></NavItem>
					<NavItem
						svg="github"
						text="GitHub"
						class={NAV_ITEM_CLASS}
						anchorProps={{
							href: 'https://github.com/Treysouz',
							target: '_blank',
							rel: 'noopener'
						}}></NavItem>
					<NavItem
						svg="envelope"
						text="Contact"
						class={NAV_ITEM_CLASS}
						anchorProps={{
							href: 'mailto:treysouz@gmail.com',
							rel: 'noopener'
						}}></NavItem>
				</div>
			</Card>
		</div>
		<Card class="grow p-4 sm:p-8 xl:max-w-md 2xl:max-w-2xl">
			<div class="pl-4 pt-4">
				<Timeline {data} {loading}></Timeline>
			</div>
		</Card>
	</div>
</Section>
