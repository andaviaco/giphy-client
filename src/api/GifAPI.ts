// TODO: get value from env
const GIFS_API_URL = process.env.REACT_APP_GIFS_API_URL;
const GIFS_API_KEY = process.env.REACT_APP_GIFS_API_KEY;

export type GifImage = {
  url: string;
  webp: string;
  mp4: string;
};

export type GifImages = {
  downsized_still: GifImage;
  fixed_height_still: GifImage;
  original: GifImage;
  fixed_height: GifImage;
  fixed_width: GifImage;
  fixed_height_small: GifImage;
  fixed_width_small: GifImage;
};

export type Gif = {
  id: string;
  title: string;
  images: GifImages;
};

interface FetchGifsParams {
  q?: string;
  offset?: number;
}

export async function fetchGifs(
  params: FetchGifsParams = {
    offset: 0,
  },
): Promise<Array<Gif>> {
  const urlParams = new URLSearchParams({
    api_key: GIFS_API_KEY,
    limit: 10,
    offset: params.offset,
    ...(params as any),
  });
  const request = new Request(
    `${GIFS_API_URL}/gifs/search?${urlParams.toString()}`,
  );

  const result = await fetch(request);

  const { data } = await result.json();

  return data;
}
