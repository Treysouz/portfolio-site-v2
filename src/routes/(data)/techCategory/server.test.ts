import { describe, it, expect, vi, beforeEach } from 'vitest';
import { GET } from './+server.js';
import { MOCK_TECH_CATEGORIES } from '$lib/mocks/constants.mocks.js';

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

describe('GET /data/techCategory', () => {
	it('should return tech category data', async () => {
		// Mock GraphQL response
		mockGqlRequest.mockResolvedValue({ techCategories: MOCK_TECH_CATEGORIES });

		// Response from mock request
		const response = await GET();

		// Data from response
		const result = await response.json();

		expect(result.techCategories).toEqual(MOCK_TECH_CATEGORIES);
	});
});
