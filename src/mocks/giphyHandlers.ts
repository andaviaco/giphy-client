import { rest } from 'msw';
import searchResultsMock from './giphySearchResultsMock';

export const handlers = [
  rest.get(
    `${process.env.REACT_APP_GIFS_API_URL}/gifs/search`,
    (req, res, ctx) => {
      return res(ctx.status(200), ctx.json(searchResultsMock));
    },
  ),
];
