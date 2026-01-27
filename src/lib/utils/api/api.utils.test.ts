import { describe, expect, vi, beforeEach, test, afterEach } from 'vitest';
import { post } from './api.utils.js';

const mockUrl = '/api/test';
const mockPayload = { name: 'test', value: 123 };
const mockResponse = { id: '1', success: true };

const mockFetch = vi.fn();
const mockGetQueryData = vi.fn();
const mockSetQueryData = vi.fn();

const mockQueryClient = {
	getQueryData: mockGetQueryData,
	setQueryData: mockSetQueryData
} as any;

beforeEach(() => {
	vi.resetAllMocks();

	global.fetch = mockFetch;
});

afterEach(() => {
	vi.resetAllMocks();
});

describe('api.utils', () => {
	describe('post()', () => {
		test('should make POST request with correct parameters', async () => {
			mockFetch.mockResolvedValueOnce({
				ok: true,
				json: async () => mockResponse
			});

			const response = await post(mockUrl, mockPayload);

			expect(mockFetch).toHaveBeenCalledWith(mockUrl, {
				method: 'POST',
				body: JSON.stringify(mockPayload),
				headers: {
					'Content-Type': 'application/json'
				}
			});
			expect(response).toEqual(mockResponse);
		});

		test('should throw error when response is not ok', async () => {
			mockFetch.mockResolvedValueOnce({
				ok: false,
				status: 404
			});

			await expect(post(mockUrl, mockPayload)).rejects.toThrow('HTTP error with status: 404');
		});

		test('should return cached data when cache hit occurs', async () => {
			const mockCacheResponse = {
				id: 'test',
				success: false
			};
			mockFetch.mockResolvedValueOnce({
				ok: true,
				json: async () => mockResponse
			});
			mockGetQueryData.mockReturnValue(mockCacheResponse);
			const response = await post(mockUrl, mockPayload, {
				queryClient: mockQueryClient,
				cacheKey: ['test-key']
			});

			expect(response).toEqual(mockCacheResponse);
			expect(mockQueryClient.getQueryData).toHaveBeenCalledWith(['test-key']);
			expect(mockFetch).not.toHaveBeenCalled();
		});

		test('should not use cache when cacheKey is not provided', async () => {
			mockFetch.mockResolvedValueOnce({
				ok: true,
				json: async () => mockResponse
			});

			await post(mockUrl, mockPayload, {
				queryClient: mockQueryClient
			});

			expect(mockQueryClient.getQueryData).not.toHaveBeenCalled();
			expect(mockQueryClient.setQueryData).not.toHaveBeenCalled();
			expect(mockFetch).toHaveBeenCalled();
		});
	});
});
