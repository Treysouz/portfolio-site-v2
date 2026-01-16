import { json, error } from '@sveltejs/kit';
import { getErrorData } from '$lib/utils/api';
import { createClient } from '@supabase/supabase-js';
import type { PostPayload, Tech } from '$lib/types/tech.types.js';

export const POST = async ({ request }) => {
	// const { value, types, sort }: PostPayload = await request.json();
	// let query = supabase.from('Tech').select('*');
	// if (value) {
	// 	query = query.ilike('name', `%${value}%`);
	// }
	// if (types?.length) {
	// 	let orQuery = '';
	// 	types.forEach((type, index) => {
	// 		orQuery += `type.eq.${type}${index < types.length - 1 ? ',' : ''}`;
	// 	});
	// 	query = query.or(orQuery);
	// }
	// if (sort) {
	// 	query = query.order(sort.column || '', { ascending: sort.ascending });
	// }
	// const response = await query;
	// if (response.error) {
	// 	const { status, message } = getErrorData('Failed to load Tech Stack data', response.error);
	// 	error(status, message);
	// }
	// const formattedData: Tech[] = response.data?.map((entity) => {
	// 	const { img_url, name, proficiency, type } = entity;
	// 	return {
	// 		imgUrl: img_url,
	// 		name,
	// 		proficiency: proficiency > 5 || proficiency < 0 ? 0 : proficiency,
	// 		type: type
	// 	};
	// });
	// return json(formattedData);
};
