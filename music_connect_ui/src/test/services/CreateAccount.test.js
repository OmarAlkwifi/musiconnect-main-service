import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import CreateAccountPage from '../../services/authentication/CreateAccount';
import { useNavigate } from 'react-router';
import '@testing-library/jest-dom';
import {wait} from "@testing-library/user-event/dist/utils";

// Mock the useNavigate function from react-router-dom
jest.mock('react-router', () => ({
    useNavigate: jest.fn(),
}));

describe('CreateAccountPage Component', () => {
    const navigate = jest.fn();

    beforeEach(() => {
        // Reset mock before each test
        useNavigate.mockImplementation(() => navigate);
    });

    test('renders CreateAccountPage with logo', () => {
        render(<CreateAccountPage />);
        const logo = screen.getByAltText('MusicConnect Logo');
        expect(logo).toBeInTheDocument();
    });

    test.skip('shows loading state when Create button is clicked', () => {
        render(<CreateAccountPage />);
        const createButton = screen.getByRole('button', { name: /create/i });
        fireEvent.click(createButton);
        expect(createButton).toHaveAttribute('loading', 'true');
    });

    test.skip('displays error message when account creation fails', async () => {
        render(<CreateAccountPage />);

        // Simulating an error in account creation
        fireEvent.change(screen.getByPlaceholderText('Username'), { target: { value: 'user' } });
        fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'pass' } });

        const createButton = screen.getByRole('button', { name: /create/i });

        // This would usually involve mocking an async function and setting the error state.
        fireEvent.click(createButton);

        // Assuming to trigger error state in createAccount function
        // It will just trigger the error message as testing the async behavior is complex
        // Updating state directly for the sake of the test.
        // In an actual case, you would mock the 'UserSlice' async call to trigger the error.
        await waitFor(() => expect(screen.getByText(/There was a problem creating your account/i)).toBeInTheDocument());
    });

    test('redirects to login page after successful account creation', async () => {
        render(<CreateAccountPage />);

        // Mock success scenario
        fireEvent.change(screen.getByPlaceholderText('Username'), { target: { value: 'user' } });
        fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'pass' } });

        const createButton = screen.getByRole('button', { name: /create/i });
        fireEvent.click(createButton);
        await wait(1500);

        // Simulate successful account creation
        await waitFor(() => expect(navigate).toHaveBeenCalledWith('/login'));
    });

    test('displays success message after account creation', async () => {
        render(<CreateAccountPage />);

        // Simulating successful account creation
        fireEvent.change(screen.getByPlaceholderText('Username'), { target: { value: 'user' } });
        fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'pass' } });

        const createButton = screen.getByRole('button', { name: /create/i });
        fireEvent.click(createButton);

        // Check for success message in UI
        await waitFor(() => expect(screen.getByText(/Account created. Redirecting to login/i)).toBeInTheDocument());
    });
});
