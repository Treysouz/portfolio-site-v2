import { error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ fetch }) => {
	try {
		const response = await fetch(
			'https://us-west-2.graphassets.com/cmkuqb14n3hsx07lh4u5ge3kj/cmkwto21d2hs208lop0ccsi20'
		);

		if (!response.ok) {
			error(404, 'File not found');
		}

		const pdfBuffer = await response.arrayBuffer();

		return new Response(pdfBuffer, {
			headers: {
				'Content-Type': 'application/pdf',
				'Content-Disposition': 'inline; filename="Tremayne_Souza_Resume.pdf"'
			}
		});
	} catch (e) {
		error(500, `Failed to retrieve file. ${e instanceof Error ? e.message : ''}`);
	}
};
