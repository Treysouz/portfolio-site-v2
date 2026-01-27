import { describe, expect, it, vi, beforeEach } from 'vitest';
import { getTechCategoryData } from './techCategory.utils';
import { get } from '../api/api.utils';
import { MOCK_TECH_CATEGORIES } from '$lib/mocks/constants.mocks';

vi.mock('../api/api.utils', () => ({
	get: vi.fn()
}));

const mockQueryClient = {
	getQueryData: vi.fn(),
	setQueryData: vi.fn()
} as any;

beforeEach(() => {
	vi.resetAllMocks();
	vi.mocked(get).mockResolvedValue({ techCategories: MOCK_TECH_CATEGORIES });
});

describe('techCategory.utils', () => {
	describe('getTechCategoryData()', () => {
		it('should call get with correct URL and payload', async () => {
			await getTechCategoryData(mockQueryClient);

			expect(get).toHaveBeenCalledWith(
				'/techCategory',
				{
					queryClient: mockQueryClient,
					cacheKey: ['techCategory']
				},
				undefined
			);
		});

		it('should return tech data from get response', async () => {
			const result = await getTechCategoryData(mockQueryClient);

			expect(result).toEqual(MOCK_TECH_CATEGORIES);
		});
	});
});
