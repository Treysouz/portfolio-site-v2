import type { TechCategory } from './techCategory.types';

/** Details of Image file associated with Tech */
export type TechLogo = {
	url: string;
};

/** Represents a technology/tool with its metadata. */
export type Tech = {
	/** Details of Image file associated with Tech */
	image: TechLogo;
	/** Name of the tech  */
	name: string;
	/** Proficiency level from 0-5  */
	proficiency: number;
	/** Category of the tech */
	category: TechCategory;
};

/** Configuration for sorting tech data */
export interface SortConfig {
	/** Tech property to sort by */
	column: string;
	/** Sort order: true for ascending, false for descending */
	ascending?: boolean;
}

/** Request payload for POST /data/tech endpoint. */
export interface PostPayload {
	/** Filter by one or more technology categories */
	categories?: string[];
	/** Text search filter (searches by technology name) */
	value?: string;
	/** Sort configuration */
	sort?: SortConfig;
}

/** Request response for POST /data/tech endpoint. */
export interface PostResponse {
	techTools: Tech[];
}
