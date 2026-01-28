import type { QueryClient } from '@tanstack/svelte-query';
import { get } from '../api';

import type { ExperienceItem, GetResponse } from '$lib/types/experience.types';

export const getExperienceData = async (queryClient?: QueryClient): Promise<ExperienceItem[]> => {
	const cacheKey = ['experience'];

	const response = await get<GetResponse>('/experience', {
		queryClient,
		cacheKey
	});

	return response.experiences;
};
