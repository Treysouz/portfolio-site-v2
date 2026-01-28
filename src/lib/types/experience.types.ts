/** Details of Experience Item */
export type ExperienceItem = {
	name: string;
	description?: {
		html: string;
	};
	type: 'work' | 'education';
	role?: string;
	startedAt: string;
	endedAt?: string;
};

/** Request response for GET /data/experience endpoint. */
export interface GetResponse {
	experiences: ExperienceItem[];
}
