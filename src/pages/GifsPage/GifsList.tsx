import React from 'react';
import { Box, Center, Image, SimpleGrid, Skeleton } from '@chakra-ui/react';
import { Gif } from '../../api/GifAPI';

interface GifsListProps {
  gifs: Array<Gif>;
  onGifClick: (gif: Gif) => void;
}

export function GifsList({ gifs, onGifClick }: GifsListProps) {
  return (
    <SimpleGrid as="section" minChildWidth="200px" spacing="8" marginBottom="4">
      {gifs.map((gif) => (
        <Box key={gif.id} as="article">
          <Center
            as="button"
            width="100%"
            title={`View ${gif.title} detail`}
            onClick={() => onGifClick(gif)}
          >
            <Image
              boxSize="200px"
              objectFit="cover"
              name={gif.title}
              src={gif.images.fixed_height_still.url}
              alt={gif.title}
              fallback={<Skeleton height="200px" width="200px" />}
            />
          </Center>
        </Box>
      ))}
    </SimpleGrid>
  );
}
