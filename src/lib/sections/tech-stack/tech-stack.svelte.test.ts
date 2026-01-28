import { describe, expect, it, vi, beforeEach } from 'vitest';
import { render, screen, waitFor, fireEvent } from '@testing-library/svelte';
import TechStack from './tech-stack.svelte';
import { queryTechData } from '$lib/utils/tech';
import * as alertStore from '$lib/stores/alert';
import { MOCK_TECH_CATEGORIES, MOCK_TECH_DATA } from '$lib/mocks/constants.mocks';

// Mock the tech query utility
vi.mock('$lib/utils/tech', () => ({
	queryTechData: vi.fn()
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
	vi.mocked(queryTechData).mockResolvedValue(MOCK_TECH_DATA);
});

describe('Tech Stack Section', () => {
	describe('Fetch tech data', () => {
		it('should fetch tech data on mount', async () => {
			render(TechStack);

			await waitFor(() => {
				expect(queryTechData).toHaveBeenCalled();
			});
		});
		it('should fetch tech data with the appropriate params if sorting is defined', async () => {
			render(TechStack);

			// Open sorting comobobox
			const sortCombobox = screen.getByRole('combobox', { name: 'Sort Table' });
			await fireEvent.click(sortCombobox);

			// Select option
			const option = screen.getByTitle('Name Ascending');
			await fireEvent.click(option);

			await waitFor(() => {
				expect(queryTechData).toHaveBeenCalledWith(expect.anything(), '', [], {
					column: 'name',
					ascending: true
				});
			});
		});
		it('should fetch tech data with the appropriate params if global filter is defined', async () => {
			render(TechStack);

			// Enter text for search box
			const searchBox = screen.getByRole('textbox', { name: 'Tech List' });
			await fireEvent.input(searchBox, { target: { value: 'Item 1' } });

			await waitFor(() => {
				expect(queryTechData).toHaveBeenCalledWith(expect.anything(), 'Item 1', [], {
					column: 'proficiency',
					ascending: false
				});
			});
		});
		it('should fetch tech data with the appropriate params if column filter is defined', async () => {
			render(TechStack, { techTypeOptions: MOCK_TECH_CATEGORIES });

			// Open the Tech Type filter combobox
			const typeCombobox = screen.getByTitle('Open Tech Type Menu');
			await fireEvent.click(typeCombobox);

			// Find and click a filter option
			const option = screen.getByText('Dev Env');
			await fireEvent.click(option);

			await waitFor(() => {
				expect(queryTechData).toHaveBeenCalledWith(expect.anything(), '', ['Dev Env'], {
					column: 'proficiency',
					ascending: false
				});
			});
		});

		it('should call addErrorToStore() when querying data fails', async () => {
			const mockError = new Error('Failed to fetch data');
			vi.mocked(queryTechData).mockRejectedValueOnce(mockError);

			const mockAddError = vi.mocked(alertStore.addErrorToStore);

			render(TechStack);

			await waitFor(() => {
				expect(mockAddError).toHaveBeenCalledWith('Failed to Query Tech Data', mockError);
			});
		});
	});
});
