import type { ExperienceItem } from '$lib/types/experience.types';
import type { Project } from '$lib/types/project.types';
import type { Tech } from '$lib/types/tech.types';
import type { TechCategory } from '$lib/types/techCategory.types';

/**
 * Mock data that would come from Hygraph for Tech data
 */
export const MOCK_TECH_DATA: Tech[] = [
	{
		name: 'React',
		category: {
			name: 'Frameworks & Libraries'
		},
		proficiency: 5,
		image: {
			url: 'react.png'
		}
	},
	{
		name: 'TypeScript',
		category: {
			name: 'Programming Languages'
		},
		proficiency: 4,
		image: {
			url: 'ts.png'
		}
	},
	{
		name: 'Docker',
		category: {
			name: 'Build & DevOps'
		},
		proficiency: 3,
		image: {
			url: 'docker.png'
		}
	}
];

/**
 * Mock data that would come from Hygraph for Tech Category data
 */
export const MOCK_TECH_CATEGORIES: TechCategory[] = [
	{
		name: 'Build & DevOps'
	},
	{
		name: 'Design'
	},
	{
		name: 'Dev Env'
	}
];

/**
 * Mock data that would come from Hygraph for Project data
 */
export const MOCK_PROJECT_DATA: Project[] = [
	{
		name: 'Portfolio Site',
		techTools: MOCK_TECH_DATA,
		description: "The portfolio site you're currently viewing! ",
		image: {
			url: 'image.png'
		},
		github: 'https://github.com/mock',
		url: 'https://www.mock.dev/'
	},
	{
		name: 'Neisha Stylist',
		techTools: MOCK_TECH_DATA,
		description:
			'A website for hair salon Neisha Stylist to showcase its work and to provide information on its hair services.',
		image: {
			url: 'imageTwo.png'
		},
		github: 'https://github.com/mockTwo',
		url: 'https://www.mockTwo.dev/'
	}
];

/**
 * Mock data that would come from Hygraph for Experience data
 */
export const MOCK_EXPERIENCE_DATA: ExperienceItem[] = [
	{
		name: 'Mock',
		description: {
			html: '<p>Test</p>'
		},
		type: 'work',
		role: 'Front-end Software Engineer',
		startedAt: '2020-12-01',
		endedAt: '2025-07-01'
	},
	{
		name: 'MockTwo',
		description: {
			html: '<p>Test Two</p>'
		},
		type: 'education',
		startedAt: '2020-01-21'
	}
];
