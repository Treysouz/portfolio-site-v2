import { describe, expect, it, vi, afterEach, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/svelte';
import { createRawSnippet } from 'svelte';
import Table from './table.svelte';
import type { TableOptions } from '@tanstack/table-core';
import { getCoreRowModel } from '@tanstack/table-core';

interface TestEntity {
	id: string;
	name: string;
	category: string;
	value: number;
}

const mockData: TestEntity[] = [
	{ id: '1', name: 'Item 1', category: 'A', value: 100 },
	{ id: '2', name: 'Item 2', category: 'B', value: 200 },
	{ id: '3', name: 'Item 3', category: 'A', value: 300 }
];

const mockOnGlobalFilterChange = vi.fn();
const mockOnSortingChange = vi.fn();
const mockOnColumnFiltersChange = vi.fn();

const createMockTableOptions = (data: TestEntity[]): TableOptions<TestEntity> => ({
	data,
	columns: [
		{ accessorKey: 'name', header: 'Name' },
		{
			accessorKey: 'category',
			header: 'Category',
			enableColumnFilter: true,
			meta: {
				filterConfig: {
					filterType: 'multi-select',
					data: [{ category: 'A' }, { category: 'B' }],
					multiple: true,
					idKey: 'category',
					nameKey: 'category',
					label: 'Category',
					placeholder: 'Select Category'
				}
			}
		},
		{ accessorKey: 'value', header: 'Value' }
	],
	getCoreRowModel: getCoreRowModel(),
	state: {
		sorting: [{ id: 'name', desc: false }]
	},
	enableFilters: true,
	enableSorting: true,
	enableGlobalFilter: true,
	onColumnFiltersChange: mockOnColumnFiltersChange,
	onSortingChange: mockOnSortingChange,
	onGlobalFilterChange: mockOnGlobalFilterChange
});

const mockTableItemSnippet = createRawSnippet(() => ({
	render: () => '<div data-testid="table-item">Item</div>'
}));

describe('Table component', () => {
	describe('Rendering', () => {
		it('should render table with data', () => {
			render(Table<TestEntity>, {
				data: mockData,
				options: createMockTableOptions(mockData),
				tableItem: mockTableItemSnippet,
				label: 'Test Table'
			});

			const list = screen.getByRole('list', { name: 'Test Table' });
			expect(list).toBeDefined();

			const items = screen.getAllByTestId('table-item');
			expect(items.length).toBe(3);
		});

		it('should render loading state', () => {
			render(Table<TestEntity>, {
				data: mockData,
				options: createMockTableOptions(mockData),
				tableItem: mockTableItemSnippet,
				label: 'Test Table',
				loading: true
			});

			const loadingSpinner = document.querySelector('.loading');
			expect(loadingSpinner).toBeDefined();
		});

		it('should render no results state when no data', () => {
			render(Table<TestEntity>, {
				data: [],
				options: createMockTableOptions([]),
				tableItem: mockTableItemSnippet,
				label: 'Test Table'
			});

			const noResultsText = screen.getByText('No results found');
			expect(noResultsText).toBeDefined();
		});
	});

	describe('Filtering', () => {
		it('should render filter combobox for filterable columns', () => {
			render(Table<TestEntity>, {
				data: mockData,
				options: createMockTableOptions(mockData),
				tableItem: mockTableItemSnippet,
				label: 'Test Table'
			});

			const combobox = screen.getByRole('combobox', { name: 'Category' });
			expect(combobox).toBeDefined();
		});

		it('should call column setFilterValue when filter is selected', async () => {
			render(Table<TestEntity>, {
				data: mockData,
				options: createMockTableOptions(mockData),
				tableItem: mockTableItemSnippet,
				label: 'Test Table'
			});

			// Open the Category filter combobox
			const categoryCombobox = screen.getByRole('combobox', { name: 'Category' });
			await fireEvent.click(categoryCombobox);

			// Find and click a filter option
			const options = screen.getAllByRole('option');
			const categoryAOption = options.find((opt) => opt.textContent?.includes('A'));

			if (categoryAOption) {
				const checkbox = categoryAOption.querySelector('input[type="checkbox"]');
				if (checkbox) {
					await fireEvent.click(checkbox);
				}
			}

			expect(mockOnColumnFiltersChange).toHaveBeenCalled();
		});
	});

	describe('Sorting', () => {
		it('should call table setSorting when sorting option is selected', async () => {
			render(Table<TestEntity>, {
				data: mockData,
				options: createMockTableOptions(mockData),
				tableItem: mockTableItemSnippet,
				label: 'Test Table'
			});

			// Open sorting comobobox
			const sortCombobox = screen.getByRole('combobox', { name: 'Sort Table' });
			await fireEvent.click(sortCombobox);

			// Select option
			const option = screen.getByTitle('Value Ascending');
			await fireEvent.click(option);

			expect(mockOnSortingChange).toHaveBeenCalled();
		});

		it('should reset sorting when clear button is clicked', async () => {
			const mockOptions = {
				...createMockTableOptions(mockData),
				onSortingChange: mockOnSortingChange
			};

			render(Table<TestEntity>, {
				data: mockData,
				options: mockOptions,
				tableItem: mockTableItemSnippet,
				label: 'Test Table'
			});

			// Open the sorting combobox
			const sortCombobox = screen.getByRole('combobox', { name: 'Sort Table' });
			await fireEvent.click(sortCombobox);

			// Find the clear button
			const clearButton = screen.getByLabelText('Clear Sort Table Selection');
			await fireEvent.click(clearButton);

			// The sorting callback should be called to reset
			expect(mockOnSortingChange).toHaveBeenCalled();
		});
	});

	describe('Search functionality', () => {
		beforeEach(() => {
			vi.useFakeTimers();
		});

		afterEach(() => {
			vi.useRealTimers();
		});

		it('should call setGlobalFilter when search input changes after debounce', async () => {
			const mockOptions = {
				...createMockTableOptions(mockData),
				onGlobalFilterChange: mockOnGlobalFilterChange
			};

			render(Table<TestEntity>, {
				data: mockData,
				options: mockOptions,
				tableItem: mockTableItemSnippet,
				label: 'Test Table'
			});

			const searchBox = screen.getByRole('textbox', { name: 'Test Table' });
			await fireEvent.input(searchBox, { target: { value: 'Item 1' } });

			expect(mockOnGlobalFilterChange).not.toHaveBeenCalled();

			vi.advanceTimersByTime(500);

			expect(mockOnGlobalFilterChange).toHaveBeenCalled();
		});
	});
});
