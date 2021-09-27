import { rest } from 'msw';
import searchResultsMock from './giphySearchResultsMock';

export const handlers = [
  rest.get(
    `${process.env.REACT_APP_GIFS_API_URL}/gifs/search`,
    (req, res, ctx) => {
      const offset = req.url.searchParams.get('offset');

      if (offset === '15') {
        return res(
          ctx.status(200),
          // reuse response but change the IDs to simulate different items
          ctx.json({
            ...searchResultsMock,
            data: searchResultsMock.data.map((item, index) => ({
              ...item,
              id: `${item.id}-${index}`,
            })),
          }),
        );
      }

      return res(ctx.status(200), ctx.json(searchResultsMock));
    },
  ),
];
