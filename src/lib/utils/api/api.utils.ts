import type { QueryClient } from '@tanstack/svelte-query';
import type { ApiError, QueryOptions, FetchFn } from '../../types/api.types';

/**
 * Returns value from Tanstack cache at given key
 * @param {QueryClient} queryClient - TanStack query client for cache
 * @param {cacheKey} unknown[] - Key to lookup in cache
 * @returns {NonNullable<T> | undefined} Cache value
 */
const getCachedData = <T>(queryClient: QueryClient, cacheKey: unknown[]) => {
	const cachedData = queryClient.getQueryData<T>(cacheKey);
	if (cachedData) {
		return cachedData;
	}
};

/**
 * Constructs a SvelteKit error object from an API error
 * @param {string} message - The error message to display to the user
 * @param {ApiError} apiError - The error object from API response
 * @returns {ApiError} Object representing data for an API error
 */
export const getErrorData = (message: string, apiError: ApiError): ApiError => {
	// Whether this is running in a Prod environment.
	const isProd = import.meta.env.PROD;

	// Update error message to provide more context based on error if environment is not Prod.
	message = `${message}${isProd ? `: ${apiError.message}` : ''}`;

	// Get HTTP status code.
	const status = apiError.status;
	return { status, message };
};

/**
 * Makes a POST request to the specified URL with the given payload
 * Supports optional Tanstack Query caching that persists during navigation but clears on page refresh
 * @param {string} url - The endpoint URL to POST to
 * @param {unknown} payload - The data to send in the request body
 * @param {QueryOptions} options - Optional configuration including QueryClient and cache key
 * @returns {Promise<T>} The JSON response from the server
 */
export const post = async <T>(
	url: string,
	payload: unknown,
	queryOptions?: QueryOptions
): Promise<T> => {
	const { queryClient, cacheKey } = queryOptions || {};

	// Check cache if QueryClient and cacheKey provided
	if (queryClient && cacheKey) {
		getCachedData<T>(queryClient, cacheKey);
	}

	// Make the request
	const response = await fetch(url, {
		method: 'POST',
		body: JSON.stringify(payload),
		headers: {
			'Content-Type': 'application/json'
		}
	});

	// Throw error if fetching fails
	if (!response.ok) {
		throw new Error(`HTTP error with status: ${response.status}`);
	}

	const data = await response.json();

	// Store in cache if QueryClient and cacheKey provided
	if (queryClient && cacheKey) {
		queryClient.setQueryData(cacheKey, data);
	}

	return data;
};

/**
 * Makes a GET request to the specified URL
 * Supports optional Tanstack Query caching that persists during navigation but clears on page refresh
 * @param {string} url - The endpoint URL to POST to
 * @param {QueryOptions} queryOptions - Optional configuration including QueryClient and cache key
 * @param {FetchFn} fetchFn - Given function to use for Fetch (intended to help with server-side requests)
 * @returns {Promise<T>} The JSON response from the server
 */
export const get = async <T>(
	url: string,
	queryOptions?: QueryOptions,
	fetchFn?: FetchFn
): Promise<T> => {
	const { queryClient, cacheKey } = queryOptions || {};

	// Check cache if QueryClient and cacheKey provided
	if (queryClient && cacheKey) {
		getCachedData<T>(queryClient, cacheKey);
	}

	const request = {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json'
		}
	};

	// Make the request
	const response = fetchFn ? await fetchFn(url, request) : await fetch(url, request);

	// Throw error if fetching fails
	if (!response.ok) {
		throw new Error(`HTTP error with status: ${response.status}`);
	}

	const data = await response.json();

	// Store in cache if QueryClient and cacheKey provided
	if (queryClient && cacheKey) {
		queryClient.setQueryData(cacheKey, data);
	}

	return data;
};
