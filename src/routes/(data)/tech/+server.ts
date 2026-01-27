import { json, error } from '@sveltejs/kit';
import { getErrorData } from '$lib/utils/api';
import type { PostPayload } from '$lib/types/tech.types.js';

import { gql, request as gqlRequest } from 'graphql-request';

export const POST = async ({ request }): Promise<Response> => {
	const { value, categories, sort }: PostPayload = await request.json();

	const document = gql`
		query getTechTools($where: TechToolWhereInput, $orderBy: TechToolOrderByInput, $first: Int) {
			techTools(where: $where, orderBy: $orderBy, first: $first) {
				image {
					url
				}
				id
				name
				proficiency
				category {
					name
				}
			}
		}
	`;

	const whereClause: Record<string, unknown> = {};

	if (value) {
		whereClause.name_contains = value;
	}

	if (categories && categories.length > 0) {
		whereClause.category = { name_in: categories };
	}

	const variables = {
		where: whereClause,
		first: 50,
		orderBy: sort?.column ? `${sort.column}_${sort.ascending ? 'ASC' : 'DESC'}` : null
	};

	const response = await gqlRequest({
		url: 'https://us-west-2.cdn.hygraph.com/content/cmkuqb0od014t07wda7qxdfni/master',
		document,
		variables
	});

	if (response.error) {
		const { status, message } = getErrorData('Failed to load Tech Stack data', response.error);
		error(status, message);
	}

	return json(response);
};
