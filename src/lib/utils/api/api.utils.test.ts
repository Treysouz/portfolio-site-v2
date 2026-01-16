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
	global.fetch = mockFetch;
});

afterEach(() => {
	vi.resetAllMocks();
});

describe('api.utils', () => {
	beforeEach(() => {
		vi.resetAllMocks();
	});

	// describe('getErrorData()', () => {
	// 	const createMockPgError = (
	// 		code: string,
	// 		message: string = 'Database error'
	// 	): PostgrestError => ({
	// 		code,
	// 		message,
	// 		details: '',
	// 		hint: '',
	// 		name: ''
	// 	});

	// 	const testCases = [
	// 		{
	// 			pgErrorCode: '23505',
	// 			expectedCode: 409
	// 		},
	// 		{
	// 			pgErrorCode: '23505',
	// 			expectedCode: 409
	// 		},
	// 		{
	// 			pgErrorCode: '23505',
	// 			expectedCode: 409
	// 		},
	// 		{
	// 			pgErrorCode: '23503',
	// 			expectedCode: 400
	// 		},
	// 		{
	// 			pgErrorCode: '42P01',
	// 			expectedCode: 500
	// 		},
	// 		{
	// 			pgErrorCode: '42703',
	// 			expectedCode: 500
	// 		},
	// 		{
	// 			pgErrorCode: 'INVALID',
	// 			expectedCode: 500
	// 		}
	// 	];

	// 	test.each(testCases)(
	// 		'should construct error with $expectedCode for Postgres error status code $pgErrorCode',
	// 		({ pgErrorCode, expectedCode }) => {
	// 			const pgError = createMockPgError(pgErrorCode, 'Test Postgres Message');

	// 			const response = getErrorData('Test Error Message', pgError);

	// 			expect(response.status).toStrictEqual(expectedCode);
	// 		}
	// 	);
	// });

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
