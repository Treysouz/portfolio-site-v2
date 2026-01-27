import { json, error } from '@sveltejs/kit';
import { getErrorData } from '$lib/utils/api';

import { gql, request as gqlRequest } from 'graphql-request';

export const GET = async (): Promise<Response> => {
	const document = gql`
		query getExperiences {
			experiences(orderBy: startedAt_DESC) {
				name
				description {
					html
				}
				type
				role
				startedAt
				endedAt
			}
		}
	`;

	const response = await gqlRequest({
		url: 'https://us-west-2.cdn.hygraph.com/content/cmkuqb0od014t07wda7qxdfni/master',
		document
	});

	if (response.error) {
		const { status, message } = getErrorData('Failed to load Experience data', response.error);
		error(status, message);
	}

	return json(response);
};
