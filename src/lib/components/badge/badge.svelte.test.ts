import { describe, expect, it } from 'vitest';
import { render } from '@testing-library/svelte';
import Badge from './badge.svelte';
import { createRawSnippet } from 'svelte';

// Mock text content to render as the child for the Badge component.
const mockTextContent = '<p>Mock content<p>';
const mockSnippet = createRawSnippet(() => {
	return { render: () => mockTextContent };
});

describe('Badge component', () => {
	it('should render children without error', () => {
		const screen = render(Badge, {
			children: mockSnippet
		});

		expect(screen.getByTestId('badge')).toBeDefined();
	});

	it("should render with appropriate class when component's class is defined", () => {
		const screen = render(Badge, {
			class: 'custom-class',
			children: mockSnippet
		});

		const badge = screen.getByTestId('badge');

		expect(badge?.className).toContain('custom-class');
	});

	it('should render without children', () => {
		const screen = render(Badge);

		const badge = screen.getByTestId('badge');

		expect(badge?.textContent).toBe('');
	});
});
