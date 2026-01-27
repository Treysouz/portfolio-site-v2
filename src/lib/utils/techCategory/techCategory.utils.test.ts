import { describe, expect, it, vi, beforeEach } from 'vitest';
import { queryTechData } from './techCategory.utils';
import { post } from '../api/api.utils';
import type { Tech } from '$lib/types/tech.types';

vi.mock('../api/api.utils', () => ({
	post: vi.fn()
}));

const mockTechData: Tech[] = [
	{
		imgUrl: '/vitest.webp',
		name: 'Vitest',
		proficiency: 5,
		type: 'Testing & QA'
	},
	{
		imgUrl: '/BitBucket.webp',
		name: 'BitBucket',
		proficiency: 5,
		type: 'Project Management'
	},
	{
		imgUrl: '/Bootstrap.webp',
		name: 'Bootstrap',
		proficiency: 5,
		type: 'Frameworks & Libraries'
	},
	{
		imgUrl: 'react.webp',
		name: 'React',
		proficiency: 5,
		type: 'Frameworks & Libraries'
	},
	{
		imgUrl: '/Codecov.webp',
		name: 'Codecov',
		proficiency: 5,
		type: 'Build & DevOps'
	}
];

const mockQueryClient = {
	getQueryData: vi.fn(),
	setQueryData: vi.fn()
} as any;

beforeEach(() => {
	vi.resetAllMocks();
	vi.mocked(post).mockResolvedValue(mockTechData);
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
					types: ['Frameworks & Libraries'],
					sort: { column: 'name', ascending: true }
				},
				{
					queryClient: mockQueryClient,
					cacheKey: [
						'tech',
						{
							value: 'React',
							types: ['Frameworks & Libraries'],
							sort: { column: 'name', ascending: true }
						}
					]
				}
			);
		});

		it('should return tech data from post response', async () => {
			const result = await queryTechData(mockQueryClient);

			expect(result).toEqual(mockTechData);
		});
	});
});
