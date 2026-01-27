import { describe, expect, it, vi, beforeEach } from 'vitest';
import { getProjectData } from './project.utils';
import { get } from '../api/api.utils';
import { MOCK_PROJECT_DATA } from '$lib/mocks/constants.mocks';

vi.mock('../api/api.utils', () => ({
	get: vi.fn()
}));

const mockQueryClient = {
	getQueryData: vi.fn(),
	setQueryData: vi.fn()
} as any;

beforeEach(() => {
	vi.resetAllMocks();
	vi.mocked(get).mockResolvedValue({ projects: MOCK_PROJECT_DATA });
});

describe('project.utils', () => {
	describe('getProjectData()', () => {
		it('should call get with correct URL', async () => {
			await getProjectData(mockQueryClient);

			expect(get).toHaveBeenCalledWith('/project', {
				queryClient: mockQueryClient,
				cacheKey: ['project']
			});
		});

		it('should return project data from get response', async () => {
			const result = await getProjectData(mockQueryClient);

			expect(result).toEqual(MOCK_PROJECT_DATA);
		});
	});
});
