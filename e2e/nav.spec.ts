import { test, expect } from '@playwright/test';
import {
	mockTechEndpoint,
	mockTechCategoryEndpoint,
	mockExperienceEndpoint,
	mockProjectEndpoint
} from './fixtures/mocks';

test.describe('Navigation', () => {
	test.beforeEach(async ({ page }) => {
		// Navigate to the home page
		await page.goto('/');
		//Mock API calls
		await mockTechEndpoint(page);
		await mockTechCategoryEndpoint(page);
		await mockExperienceEndpoint(page);
		await mockProjectEndpoint(page);
	});

	const testCases = [
		{
			text: 'Welcome',
			href: '/#welcome'
		},
		{
			text: 'About Me',
			href: '/#about'
		},
		{
			text: 'Tech',
			href: '/#tech'
		},
		{
			text: 'Projects',
			href: '/#projects'
		}
	];

	testCases.forEach((testCase) => {
		test.describe(`${testCase.text} Link`, () => {
			test('nav link navigate to correct anchors', async ({ page }) => {
				// Test on desktop viewport
				await page.setViewportSize({ width: 1280, height: 720 });

				// Wait for the page to load
				await page.waitForSelector('[data-testid="desktop-nav"]');

				// Test link
				await page.click(`text=${testCase.text}`);
				await page.waitForURL(testCase.href);
				expect(page.url()).toContain(testCase.href);
			});
		});
	});
});
