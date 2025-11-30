import React from 'react';
import '@testing-library/jest-dom';
import { render, fireEvent } from '@testing-library/react';
import SearchBar from '../../components/SearchBar';

describe('SearchBar Component', () => {
    test('renders correctly with default service', () => {
        const { getByPlaceholderText } = render(<SearchBar />);
        const inputElement = getByPlaceholderText('Search MusicConnect');
        expect(inputElement).toBeInTheDocument();
    });

    test('renders correctly with custom service', () => {
        const { getByPlaceholderText } = render(<SearchBar service="TestService" />);
        const inputElement = getByPlaceholderText('Search TestService');
        expect(inputElement).toBeInTheDocument();
    });

    test('updates the query state when the input changes', () => {
        const { getByPlaceholderText } = render(<SearchBar />);
        const inputElement = getByPlaceholderText('Search MusicConnect');

        fireEvent.change(inputElement, { target: { value: 'new query' } });

        expect(inputElement.value).toBe('new query');
    });

    test.skip('calls onSearch when the search button is clicked', () => {
        const mockOnSearch = jest.fn();
        const { getByPlaceholderText, getByRole } = render(<SearchBar onSearch={mockOnSearch} />);
        const inputElement = getByPlaceholderText('Search MusicConnect');

        fireEvent.change(inputElement, { target: { value: 'test query' } });

        // Note: Call the button's onClick handler directly instead of simulating a click on the icon.
        const searchButton = getByRole('button');
        fireEvent.click(searchButton);

        expect(mockOnSearch).toBeCalledWith('test query'); // If you implement the handleSearch to call onSearch
    });
});
