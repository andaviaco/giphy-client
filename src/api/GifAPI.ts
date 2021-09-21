// TODO: get value from env
const GIFS_API_URL = 'https://api.giphy.com/v1';
const GIFS_API_KEY = '...';

interface FetchGifsParams {
  q?: string;
}

type GifImage = {
  url: string;
};

type GifImages = {
  downsized_still: GifImage;
  fixed_height_still: GifImage;
};

export type Gif = {
  id: string;
  title: string;
  images: GifImages;
};

export async function fetchGifs(
  params: FetchGifsParams = {},
): Promise<Array<Gif>> {
  const urlParams = new URLSearchParams({
    api_key: GIFS_API_KEY,
    limit: 10,
    ...(params as any),
  });
  const request = new Request(
    `${GIFS_API_URL}/gifs/search?${urlParams.toString()}`,
  );

  const result = await fetch(request);

  const { data } = await result.json();

  return data;
}
