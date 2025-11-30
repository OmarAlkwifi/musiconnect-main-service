import React from 'react';
import {render} from '@testing-library/react';
import DashboardPage from '../../services/Dashboard';
import '@testing-library/jest-dom';

describe('DashboardPage Component', () => {
    test('renders the DashboardPage correctly', () => {
        const { getByText } = render(<DashboardPage />);

        // Check if ServiceButton components are rendered
        expect(getByText('YouTube Music')).toBeInTheDocument();
        expect(getByText('Spotify')).toBeInTheDocument();
    });

    test('renders service buttons with correct properties', () => {
        const { getByText } = render(<DashboardPage />);

        // Check if YouTube Music button exists and has correct URL
        const youtubeButton = getByText(/YouTube Music/i).closest('a'); // Find the closest anchor element
        expect(youtubeButton).toHaveAttribute('href', '/youtube-music'); // Check href attribute

        // Check if Spotify button exists and has correct URL
        const spotifyButton = getByText(/Spotify/i).closest('a'); // Find the closest anchor element
        expect(spotifyButton).toHaveAttribute('href', '/spotify'); // Check href attribute
    });
});
