import type { QueryClient } from '@tanstack/svelte-query';
import { get } from '../api';

import type { TechCategory, GetResponse } from '../../types/techCategory.types';
import type { FetchFn } from '$lib/types/api.types';

export const getTechCategoryData = async (
	queryClient?: QueryClient,
	fetchFn?: FetchFn
): Promise<TechCategory[]> => {
	const cacheKey = ['techCategory'];

	const response = await get<GetResponse>(
		'/techCategory',
		{
			queryClient,
			cacheKey
		},
		fetchFn
	);

	return response.techCategories;
};
