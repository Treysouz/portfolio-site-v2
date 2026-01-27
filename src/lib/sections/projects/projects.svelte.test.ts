import { describe, expect, it, vi, beforeEach } from 'vitest';
import { render, waitFor } from '@testing-library/svelte';
import Projects from './projects.svelte';
import { getProjectData } from '$lib/utils/project';
import * as alertStore from '$lib/stores/alert';
import { MOCK_PROJECT_DATA } from '$lib/mocks/constants.mocks';

// Mock the tech query utility
vi.mock('$lib/utils/project', () => ({
	getProjectData: vi.fn()
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
	vi.mocked(getProjectData).mockResolvedValue(MOCK_PROJECT_DATA);
});

describe('Projects Section', () => {
	describe('Fetch project data', () => {
		it('should fetch project data on mount', async () => {
			render(Projects);

			await waitFor(() => {
				expect(getProjectData).toHaveBeenCalled();
			});
		});

		it('should call addErrorToStore() when getting data fails', async () => {
			const mockError = new Error('Failed to fetch data');
			vi.mocked(getProjectData).mockRejectedValueOnce(mockError);

			const mockAddError = vi.mocked(alertStore.addErrorToStore);

			render(Projects);

			await waitFor(() => {
				expect(mockAddError).toHaveBeenCalledWith('Failed to Get Project Data', mockError);
			});
		});
	});
});
