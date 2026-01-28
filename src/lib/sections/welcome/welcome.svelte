<!-- Section to welcome users to the site introducing name and title of developer. -->
<script lang="ts">
	import { Card, Icon, IconWrapper } from '$lib/components';
	import { Section } from '../section-wrapper';

	interface Props {
		/** Greeting text to render. */
		greeting: string;
	}

	let { greeting }: Props = $props();
</script>

<Section id="welcome">
	<div class="flex h-full w-full items-center justify-center">
		<Card class="p-4 sm:p-8 lg:max-w-2xl 2xl:max-w-5xl">
			<h1 class="break-keep text-lg md:text-xl lg:text-3xl 2xl:text-5xl">
				<span class="whitespace-nowrap">{greeting}</span><br /><br /> My name is
				<span class="text-gradient animate-gradient-move whitespace-nowrap font-bold"
					>Tremayne Souza</span
				>.
			</h1>
			<br />
			<p class="text-sm md:text-base lg:text-xl 2xl:text-3xl">
				I'm a <span class="text-gradient animate-gradient-move font-bold"
					>NY-based Front-End Software Engineer</span>
				turning ideas into responsive, accessible, and user-friendly web and mobile applications.
			</p>
			<br />
			<p class="flex items-center text-sm md:text-base lg:text-xl 2xl:text-3xl">
				Let's talk code <IconWrapper class="ml-2 size-8 sm:ml-4 md:size-10  2xl:size-12"
					><Icon svg="smile" class="animate-bounce-in text-primary h-full w-full"></Icon
					></IconWrapper
				>.
			</p>
		</Card>
	</div>
</Section>
