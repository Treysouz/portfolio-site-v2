import type { QueryClient } from '@tanstack/svelte-query';
import { get } from '../api';

import type { Project, GetResponse } from '$lib/types/project.types';

export const getProjectData = async (queryClient?: QueryClient): Promise<Project[]> => {
	const cacheKey = ['project'];

	const response = await get<GetResponse>('/project', {
		queryClient,
		cacheKey
	});

	return response.projects;
};
