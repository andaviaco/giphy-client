export type GifRendition = {
  url: string;
  webp: string;
  mp4: string;
};

export type GifImages = {
  downsized_still: GifRendition;
  fixed_height_still: GifRendition;
  original: GifRendition;
  fixed_height: GifRendition;
  fixed_width: GifRendition;
  fixed_height_small: GifRendition;
  fixed_height_downsampled: GifRendition;
  fixed_width_small: GifRendition;
  fixed_width_downsampled: GifRendition;
  preview: GifRendition;
  looping: GifRendition;
  downsized: GifRendition;
};

export type Gif = {
  id: string;
  title: string;
  images: GifImages;
};
