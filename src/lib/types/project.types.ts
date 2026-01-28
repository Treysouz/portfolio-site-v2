import type { Tech } from './tech.types';

/** Details of Image file associated with Project */
export type ProjectImage = {
	url: string;
};

/** Details of Project */
export type Project = {
	name: string;
	techTools: Tech[];
	description: string;
	image: ProjectImage;
	github: string;
	url: string;
};

/** Request response for GET /data/project endpoint. */
export interface GetResponse {
	projects: Project[];
}
