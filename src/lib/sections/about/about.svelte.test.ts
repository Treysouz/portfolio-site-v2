import { describe, expect, it, vi, beforeEach } from 'vitest';
import { render, waitFor } from '@testing-library/svelte';
import About from './about.svelte';
import { getExperienceData } from '$lib/utils/experience';
import * as alertStore from '$lib/stores/alert';
import { MOCK_EXPERIENCE_DATA } from '$lib/mocks/constants.mocks';

// Mock the tech query utility
vi.mock('$lib/utils/experience', () => ({
	getExperienceData: vi.fn()
}));

// Mock Tanstack Query
vi.mock('@tanstack/svelte-query', () => ({
	useQueryClient: vi.fn(() => ({}))
}));

// Mock alert store
vi.mock('$lib/stores/alert', () => ({
	addErrorToStore: vi.fn()
}));

beforeEach(() => {
	vi.resetAllMocks();
	vi.mocked(getExperienceData).mockResolvedValue(MOCK_EXPERIENCE_DATA);
});

describe('About Section', () => {
	describe('Fetch project data', () => {
		it('should fetch experience data on mount', async () => {
			render(About);

			await waitFor(() => {
				expect(getExperienceData).toHaveBeenCalled();
			});
		});

		it('should call addErrorToStore() when getting data fails', async () => {
			const mockError = new Error('Failed to fetch data');
			vi.mocked(getExperienceData).mockRejectedValueOnce(mockError);

			const mockAddError = vi.mocked(alertStore.addErrorToStore);

			render(About);

			await waitFor(() => {
				expect(mockAddError).toHaveBeenCalledWith('Failed to Get Timeline Data', mockError);
			});
		});
	});
});
