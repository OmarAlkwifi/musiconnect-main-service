import React from 'react';
import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import LoginPage from '../../services/authentication/Login';

describe('LoginPage Component', () => {
    test('renders MusicConnect logo when default type is MusicConnect', () => {
        render(<LoginPage />);
        const logo = screen.getByAltText('MusicConnect Logo');
        expect(logo).toBeInTheDocument();
        expect(logo.src).toContain('music-connect-logo.png');
    });

    test('renders Spotify logo when type is Spotify', () => {
        render(<LoginPage type="Spotify" />);
        const logo = screen.getByAltText('Spotify Logo');
        expect(logo).toBeInTheDocument();
        expect(logo.src).toContain('spotify-logo.png');
    });

    test('renders YouTube Music logo when type is YouTube Music', () => {
        render(<LoginPage type="YouTube Music" />);
        const logo = screen.getByAltText('YouTube Music Logo');
        expect(logo).toBeInTheDocument();
        expect(logo.src).toContain('youtube-music-logo.png');
    });

    test('renders header for Spotify', () => {
        render(<LoginPage type="Spotify" />);
        expect(screen.getByRole('link')).toHaveAccessibleName("MusicConnect Logo");
    });

    test('renders header for YouTube Music', () => {
        render(<LoginPage type="YouTube Music" />);
        expect(screen.getByRole('link')).toHaveAccessibleName("MusicConnect Logo");
    });

    test('does not render header for MusicConnect login', () => {
        render(<LoginPage />);
        expect(screen.getByRole('link')).not.toHaveAccessibleName("MusicConnect Logo");
    });

    test.skip('shows error message when login fails', () => {
        render(<LoginPage />);
        fireEvent.click(screen.getByRole('button', { name: /login/i }));

        // Manually trigger the setError state after the login attempt within this test
        fireEvent.change(screen.getByPlaceholderText('Username'), { target: { value: 'user' } });
        fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'pass' } });

        fireEvent.click(screen.getByRole('button', { name: /login/i }));

        expect(screen.getByText(/There was a problem logging you in/i)).toBeInTheDocument();
    });

    test.skip('changes loading state on button click', () => {
        render(<LoginPage />);

        const button = screen.getByRole('button', { name: /login/i });
        expect(button).toHaveAttribute('loading', 'false');

        fireEvent.click(button);
        expect(button).toHaveAttribute('loading', 'true');
    });

    test('redirects to create account when clicked', () => {
        render(<LoginPage />);
        const createAccountLink = screen.getByText(/Create Account/i);
        expect(createAccountLink).toHaveAttribute('href', '/create-account');
    });
});
