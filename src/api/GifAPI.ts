import { Gif } from '../types/Gif';
import { httpRequest } from './util';

const GIFS_API_URL = process.env.REACT_APP_GIFS_API_URL;
const GIFS_API_KEY = process.env.REACT_APP_GIFS_API_KEY;

interface FetchGifsParams {
  q?: string;
  offset?: number;
  limit?: number;
}

interface GiphySearch {
  data: Array<Gif>;
  pagination: unknown;
  meta: unknown;
}

export async function fetchGifs(
  params: FetchGifsParams = {
    offset: 0,
    limit: 10,
  },
): Promise<Array<Gif>> {
  const urlParams = new URLSearchParams({
    api_key: GIFS_API_KEY,
    limit: params.limit,
    offset: params.offset,
    ...(params as any),
  });
  const request = new Request(
    `${GIFS_API_URL}/gifs/search?${urlParams.toString()}`,
  );

  const results = await httpRequest<GiphySearch>(request);

  return results.data;
}
