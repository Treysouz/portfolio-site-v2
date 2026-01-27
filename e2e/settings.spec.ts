import { test, expect } from '@playwright/test';
import {
	mockTechEndpoint,
	mockTechCategoryEndpoint,
	mockExperienceEndpoint,
	mockProjectEndpoint
} from './fixtures/mocks';

test.describe('Settings Drawer', () => {
	test.beforeEach(async ({ page }) => {
		// Navigate to the home page
		await page.goto('/');

		// Clear localStorage
		await page.evaluate(() => localStorage.clear());

		//Mock API calls
		await mockTechEndpoint(page);
		await mockTechCategoryEndpoint(page);
		await mockExperienceEndpoint(page);
		await mockProjectEndpoint(page);
	});

	test.describe('Drawer Toggle', () => {
		test('should open settings drawer when Settings button is clicked', async ({ page }) => {
			// Open the Drawer
			const settingsToggle = page.getByRole('menuitem', { name: 'Settings' });
			await settingsToggle.click();

			const settingsHeader = page.getByRole('heading', { name: 'Settings' });

			await expect(settingsHeader).toBeVisible();
		});

		test('should close settings drawer when close button is clicked', async ({ page }) => {
			// Open the Drawer
			const settingsToggle = page.getByRole('menuitem', { name: 'Settings' });
			await settingsToggle.click();

			const drawerHeader = page.getByRole('heading', { name: 'Settings' });
			await expect(drawerHeader).toBeVisible();

			// Click the close button to close the Drawer
			const closeButton = page.getByRole('button', { name: 'Close Drawer' });
			await closeButton.click();

			await expect(drawerHeader).not.toBeVisible();
		});

		test('should close settings drawer when overlay is clicked', async ({ page }) => {
			// Open the drawer
			const settingsToggle = page.getByRole('menuitem', { name: 'Settings' });
			await settingsToggle.click();

			const drawerHeader = page.getByRole('heading', { name: 'Settings' });
			await expect(drawerHeader).toBeVisible();

			// Click the overlay to close the drawer
			const drawerOverlay = page.getByRole('dialog').locator('label');
			await drawerOverlay.click();

			await expect(drawerHeader).not.toBeVisible();
		});
	});

	test.describe('Animation Settings', () => {
		test('should toggle all animations when Animations toggle is clicked', async ({ page }) => {
			// Open the drawer
			const settingsToggle = page.getByRole('menuitem', { name: 'Settings' });
			await settingsToggle.click();

			// Click toggle to disable all animations
			const animationsToggle = page.getByRole('checkbox', { name: 'Animations' });
			await animationsToggle.click();

			//Click collpase title to view nested animations
			const animationsCollapseTitle = page.getByText('Animations');
			await animationsCollapseTitle.click();

			// Verify all nested animation toggles are disabled
			const gradientToggle = page.getByRole('checkbox', { name: 'Gradient Text Animation' });
			await expect(gradientToggle).not.toBeChecked();

			const bgToggle = page.getByRole('checkbox', { name: 'Animated Background' });
			await expect(bgToggle).not.toBeChecked();

			const transitionsToggle = page.getByRole('checkbox', { name: 'Transitions' });
			await expect(transitionsToggle).not.toBeChecked();
		});

		const testCases = ['Gradient Text Animation', 'Animated Background', 'Transitions'];

		testCases.forEach((testCase) => {
			test(`should toggle ${testCase} when its toggle is clicked`, async ({ page }) => {
				// Open the drawer
				const settingsToggle = page.getByRole('menuitem', { name: 'Settings' });
				await settingsToggle.click();

				//Click collpase title to view nested animations
				const animationsCollapseTitle = page.getByText('Animations');
				await animationsCollapseTitle.click();

				// Click setting toggle
				const settingToggle = page.getByRole('checkbox', { name: testCase });
				await settingToggle.click();

				await expect(settingToggle).not.toBeChecked();

				// Click setting toggle again
				await settingToggle.click();

				await expect(settingToggle).toBeChecked();
			});
		});
	});

	test.describe('Opacity Effect Setting', () => {
		test('should toggle opacity effect', async ({ page }) => {
			// Open the drawer
			const settingsToggle = page.getByRole('menuitem', { name: 'Settings' });
			await settingsToggle.click();

			// Click Opacity Effect toggle
			const settingToggle = page.getByRole('checkbox', { name: 'Opacity Effect' });
			await settingToggle.click();

			await expect(settingToggle).not.toBeChecked();

			// Click Opacity Effect toggle again
			await settingToggle.click();

			await expect(settingToggle).toBeChecked();
		});
	});
});
