import { describe, expect, it, vi, beforeEach } from 'vitest';
import { queryTechData } from './tech.utils';
import { post } from '../api/api.utils';
import { MOCK_TECH_DATA } from '$lib/mocks/constants.mocks';

vi.mock('../api/api.utils', () => ({
	post: vi.fn()
}));

const mockQueryClient = {
	getQueryData: vi.fn(),
	setQueryData: vi.fn()
} as any;

beforeEach(() => {
	vi.resetAllMocks();
	vi.mocked(post).mockResolvedValue({
		techTools: MOCK_TECH_DATA
	});
});

describe('tech.utils', () => {
	describe('queryTechData()', () => {
		it('should call post with correct URL and payload', async () => {
			await queryTechData(mockQueryClient, 'React', ['Frameworks & Libraries'], {
				column: 'name',
				ascending: true
			});

			expect(post).toHaveBeenCalledWith(
				'/tech',
				{
					value: 'React',
					categories: ['Frameworks & Libraries'],
					sort: { column: 'name', ascending: true }
				},
				{
					queryClient: mockQueryClient,
					cacheKey: [
						'tech',
						{
							value: 'React',
							categories: ['Frameworks & Libraries'],
							sort: { column: 'name', ascending: true }
						}
					]
				}
			);
		});

		it('should return tech data from post response', async () => {
			const result = await queryTechData(mockQueryClient);

			expect(result).toEqual(MOCK_TECH_DATA);
		});
	});
});
