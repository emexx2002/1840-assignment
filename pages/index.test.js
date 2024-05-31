// pages/index.test.js

import React from 'react';
import '@testing-library/jest-dom'
import { fireEvent, render, screen } from '@testing-library/react';
import Home from './index';
import ImageCard from '../components/ImageCard';
import { Paginator } from '../components/Paginator';

test('renders Image Filter App heading', () => {
  render(<Home />);
  const headingElement = screen.getByText('Image Filter App');
  expect(headingElement).toBeInTheDocument();
});

test('renders search input', () => {
  render(<Home />);
  const inputElement = screen.getByPlaceholderText('Search...');
  expect(inputElement).toBeInTheDocument();
});

test('renders image card', () => {
    const altText = 'Test Alt Text';
    render(<ImageCard imageUrl="/placeholder.png" altDescription={altText} />);
    const imageElement = screen.getByAltText(altText);
    expect(imageElement).toBeInTheDocument();
});

test('renders the previous and next buttons, and page numbers', () => {
    const setPage = jest.fn();
    const totalRows = 100;
    const pageSize = 10;
    const page = 1;

    render(
      <Paginator
        page={page}
        pageSize={pageSize}
        setPage={setPage}
        totalRows={totalRows}
      />
    );

    // Check if the previous button is rendered
    // Check if the previous button is rendered
    const prevButton = screen.getByRole('button', { name: /Previous/i });
    expect(prevButton).toBeInTheDocument();

    // Check if the next button is rendered
    const nextButton = screen.getByRole('button', { name: /Next/i });
    expect(nextButton).toBeInTheDocument();

    // Check if page numbers are rendered
    const pageNumbers = screen.getAllByRole('button');
    expect(pageNumbers) // Assuming 10 pages + 2 for Previous and Next

})