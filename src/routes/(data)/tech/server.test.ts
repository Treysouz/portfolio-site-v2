import { describe, it, expect, vi, beforeEach } from 'vitest';
import { POST } from './+server.js';
import { MOCK_TECH_DATA } from '$lib/mocks/constants.mocks.js';

import type { PostPayload } from '$lib/types/tech.types.js';

// Mock GraphQL request function
const mockGqlRequest = vi.fn();

// Mock graphql-request module
vi.mock('graphql-request', () => ({
	gql: (strings: TemplateStringsArray) => strings.join(''),
	request: (...args: unknown[]) => mockGqlRequest(...args)
}));

beforeEach(() => {
	// Reset the mock before each test
	vi.resetAllMocks();
});

describe('POST /data/tech', () => {
	const createMockRequest = (payload: PostPayload = {}) => ({
		json: async () => payload
	});

	it('should return tech data when no filters are applied', async () => {
		// Mock GraphQL response
		mockGqlRequest.mockResolvedValue({ techTools: MOCK_TECH_DATA });

		// Mock Request
		const mockRequest = createMockRequest({});
		// Response from mock request
		const response = await POST({ request: mockRequest });
		// Data from response
		const result = await response.json();

		expect(result.techTools).toEqual(MOCK_TECH_DATA);
		expect(mockGqlRequest).toHaveBeenCalledWith(
			expect.objectContaining({
				variables: expect.objectContaining({
					where: {},
					first: 50,
					orderBy: null
				})
			})
		);
	});

	it('should apply text search when value is provided', async () => {
		// Mock GraphQL response
		mockGqlRequest.mockResolvedValue({ techTools: MOCK_TECH_DATA });

		// Mock Request
		const mockRequest = createMockRequest({ value: 'React' });
		// Response from mock request
		const response = await POST({ request: mockRequest });
		// Data from response
		const result = await response.json();

		expect(result.techTools).toEqual(MOCK_TECH_DATA);
		expect(mockGqlRequest).toHaveBeenCalledWith(
			expect.objectContaining({
				variables: expect.objectContaining({
					where: { name_contains: 'React' }
				})
			})
		);
	});

	it('should apply category filter when categories are provided', async () => {
		// Mock GraphQL response
		mockGqlRequest.mockResolvedValue({ techTools: MOCK_TECH_DATA });

		// Mock Request
		const mockRequest = createMockRequest({ categories: ['Design'] });
		// Response from mock request
		const response = await POST({ request: mockRequest });
		// Data from response
		const result = await response.json();

		expect(result.techTools).toEqual(MOCK_TECH_DATA);
		expect(mockGqlRequest).toHaveBeenCalledWith(
			expect.objectContaining({
				variables: expect.objectContaining({
					where: { category: { name_in: ['Design'] } }
				})
			})
		);
	});

	it('should apply order filter when sort config is provided', async () => {
		// Mock GraphQL response
		mockGqlRequest.mockResolvedValue({ techTools: MOCK_TECH_DATA });

		// Mock Request
		const mockRequest = createMockRequest({
			sort: {
				column: 'name',
				ascending: true
			}
		});

		// Response from mock request
		const response = await POST({ request: mockRequest });
		// Data from response
		const result = await response.json();

		expect(result.techTools).toEqual(MOCK_TECH_DATA);
		expect(mockGqlRequest).toHaveBeenCalledWith(
			expect.objectContaining({
				variables: expect.objectContaining({
					orderBy: 'name_ASC'
				})
			})
		);
	});

	it('should handle Hygraph errors', async () => {
		// Mock GraphQL response with error
		mockGqlRequest.mockResolvedValue({ error: { message: 'GraphQL error' } });

		// Mock Request
		const mockRequest = createMockRequest({});

		await expect(POST({ request: mockRequest })).rejects.toThrow();
	});
});
