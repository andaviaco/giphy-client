import React from 'react';
import { render, waitFor, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { GiftPage } from '../GifsPage';

test('displays default search results', async () => {
  render(<GiftPage />);

  await waitFor(() => screen.getAllByRole('article'));
  await waitFor(() => screen.getByTitle('View panda playing GIF detail'));

  expect(screen.getAllByRole('article').length).toEqual(15);
  expect(
    screen.getByTitle('View panda playing GIF detail'),
  ).toBeInTheDocument();
});

test('gifs search and display results', async () => {
  render(<GiftPage />);

  const searchInput = screen.getByRole('search');
  const submitButton = screen.getByRole('button', { name: /search/i });

  userEvent.type(searchInput, 'pandas');
  userEvent.click(submitButton);

  expect(submitButton).toBeDisabled();
  expect(submitButton).toHaveAttribute('data-loading');

  await waitFor(() => {
    screen.getAllByRole('article');
  });

  expect(submitButton).toBeEnabled();
  expect(screen.getAllByRole('article').length).toBeGreaterThan(0);
  expect(screen.getAllByRole('article').length).toBeLessThanOrEqual(15);
});
// test('loads more gifs', async () => {});
