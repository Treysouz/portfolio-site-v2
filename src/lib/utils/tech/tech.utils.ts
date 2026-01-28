import type { QueryClient } from '@tanstack/svelte-query';
import { post } from '../api';

import type { SortConfig, PostPayload, Tech, PostResponse } from '../../types/tech.types';
import type { TechCategoryName } from '$lib/types/techCategory.types';

export const queryTechData = async (
	queryClient?: QueryClient,
	searchValue?: string,
	categories?: TechCategoryName[],
	sortConfig?: SortConfig
): Promise<Tech[]> => {
	const payload: PostPayload = {
		value: searchValue,
		categories,
		sort: sortConfig
	};

	const cacheKey = ['tech', payload];

	const response = await post<PostResponse>('/tech', payload, {
		queryClient,
		cacheKey
	});

	return response.techTools;
};
