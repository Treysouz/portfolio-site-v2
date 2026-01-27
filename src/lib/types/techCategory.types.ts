/** Names of tech categories */
export type TechCategoryName =
	| 'Hosting & Infrastructure'
	| 'Programming Languages'
	| 'Frameworks & Libraries'
	| 'Build & DevOps'
	| 'Project Management'
	| 'Testing & QA'
	| 'Design'
	| 'Dev Env'
	| 'Database Tools';

/** Details of Tech Category */
export type TechCategory = {
	name: TechCategoryName;
};

/** Request response for POST /data/tech endpoint. */
export interface PostResponse {
	techCategories: TechCategory[];
}
