/** Enum of technology types from Supabase */
export type TechType = 'test';

/** Details of Image file associated with Tech */
export type TechLogo = {
	url: string;
};

/** Details of Tech Category */
export type TechCategory = {
	name: string;
};

/** Represents a technology/tool with its metadata. */
export type Tech = {
	/** Details of Image file associated with Tech */
	img: TechLogo;
	/** Name of the tech  */
	name: string;
	/** Proficiency level from 0-5  */
	proficiency: number;
	/** Category of the tech */
	tech_category: TechCategory;
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
	/** Filter by one or more technology types */
	types?: string[];
	/** Text search filter (searches by technology name) */
	value?: string;
	/** Sort configuration */
	sort?: SortConfig;
}
