import { describe, expect, it, vi, beforeEach } from 'vitest';
import { getExperienceData } from './experience.utils';
import { get } from '../api/api.utils';
import { MOCK_EXPERIENCE_DATA } from '$lib/mocks/constants.mocks';

vi.mock('../api/api.utils', () => ({
	get: vi.fn()
}));

const mockQueryClient = {
	getQueryData: vi.fn(),
	setQueryData: vi.fn()
} as any;

beforeEach(() => {
	vi.resetAllMocks();
	vi.mocked(get).mockResolvedValue({ experiences: MOCK_EXPERIENCE_DATA });
});

describe('experience.utils', () => {
	describe('getExperienceData()', () => {
		it('should call get with correct URL', async () => {
			await getExperienceData(mockQueryClient);

			expect(get).toHaveBeenCalledWith('/experience', {
				queryClient: mockQueryClient,
				cacheKey: ['experience']
			});
		});

		it('should return experience data from get response', async () => {
			const result = await getExperienceData(mockQueryClient);

			expect(result).toEqual(MOCK_EXPERIENCE_DATA);
		});
	});
});
