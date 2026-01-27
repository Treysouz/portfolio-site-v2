import { generateGreeting, getHourOfDay } from '$lib/utils/greeting';
import { addErrorToStore } from '$lib/stores/alert';
import { getTechCategoryData } from '$lib/utils/techCategory';

import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch }) => {
	/**  Get the current hour of the day to use as parameter for generateGreeting()*/
	const currentHour = getHourOfDay();

	/** Set greeting to the return value of generateGreeting()*/
	const greeting = generateGreeting(currentHour);

	/**
	 * Gets tech category data from the API.
	 */
	const getTechTypeOptions = async () => {
		try {
			const response = await getTechCategoryData(undefined, fetch);
			return response;
		} catch (error) {
			addErrorToStore('Failed to Get Tech Category Data', error);
		}
	};

	const techTypeOptions = await getTechTypeOptions();

	return {
		techTypeOptions,
		greeting
	};
};
