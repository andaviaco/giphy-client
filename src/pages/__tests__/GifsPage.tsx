import React from 'react';
import { render, waitFor, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

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

// test('gifs search and display results', async () => {});
// test('loads more gifs', async () => {});
