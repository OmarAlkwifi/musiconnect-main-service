import React from 'react';
import { render } from '@testing-library/react';
import ServiceButton from '../../components/ServiceButton';
import '@testing-library/jest-dom';

describe('ServiceButton Component', () => {
    const service = "YouTube Music";
    const serviceURL = "/youtube-music";
    const icon = "faYoutube"; // Use appropriate icon if using mocked
    const colour = "red";

    test('renders the ServiceButton correctly with provided props', () => {
        const { getByText, getByRole } = render(
            <ServiceButton
                service={service}
                serviceURL={serviceURL}
                icon={icon}
                colour={colour}
            />
        );

        // Check if the service name is rendered
        expect(getByText(service)).toBeInTheDocument();

        // Check if the link has the correct URL
        const linkElement = getByRole('link');
        expect(linkElement).toHaveAttribute('href', serviceURL);

    });

    test('applies the correct styles based on props', () => {
        const { container } = render(
            <ServiceButton
                service={service}
                serviceURL={serviceURL}
                icon={icon}
                colour={colour}
            />
        );

        // Check if the Card component has the correct class
        const cardElement = container.firstChild;
        expect(cardElement).toHaveClass('ServiceButton');
    });
});
