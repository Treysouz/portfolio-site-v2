import { Page } from '@playwright/test';

export const mockTechEndpoint = async (page: Page) => {
	await page.route('**/tech', async (route) => {
		await route.fulfill({
			status: 200,
			contentType: 'application/json',
			body: JSON.stringify({
				techTools: [
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
				]
			})
		});
	});
};

export async function mockTechCategoryEndpoint(page: Page) {
	await page.route('**/techCategory', async (route) => {
		await route.fulfill({
			status: 200,
			contentType: 'application/json',
			body: JSON.stringify({
				techCategories: [
					{
						name: 'Build & DevOps'
					},
					{
						name: 'Design'
					},
					{
						name: 'Dev Env'
					}
				]
			})
		});
	});
}

export async function mockProjectEndpoint(page: Page) {
	await page.route('**/project', async (route) => {
		await route.fulfill({
			status: 200,
			contentType: 'application/json',
			body: JSON.stringify({
				projects: [
					{
						name: 'Portfolio Site',
						techTools: [{ name: 'test' }],
						description: "The portfolio site you're currently viewing! ",
						image: {
							url: 'image.png'
						},
						github: 'https://github.com/mock',
						url: 'https://www.mock.dev/'
					},
					{
						name: 'Neisha Stylist',
						techTools: [{ name: 'test' }],
						description:
							'A website for hair salon Neisha Stylist to showcase its work and to provide information on its hair services.',
						image: {
							url: 'imageTwo.png'
						},
						github: 'https://github.com/mockTwo',
						url: 'https://www.mockTwo.dev/'
					}
				]
			})
		});
	});
}

export async function mockExperienceEndpoint(page: Page) {
	await page.route('**/experience', async (route) => {
		await route.fulfill({
			status: 200,
			contentType: 'application/json',
			body: JSON.stringify({
				projects: [
					{
						name: 'Portfolio Site',
						techTools: [{ name: 'test' }],
						description: "The portfolio site you're currently viewing! ",
						image: {
							url: 'image.png'
						},
						github: 'https://github.com/mock',
						url: 'https://www.mock.dev/'
					},
					{
						name: 'Neisha Stylist',
						techTools: [{ name: 'test' }],
						description:
							'A website for hair salon Neisha Stylist to showcase its work and to provide information on its hair services.',
						image: {
							url: 'imageTwo.png'
						},
						github: 'https://github.com/mockTwo',
						url: 'https://www.mockTwo.dev/'
					}
				]
			})
		});
	});
}
