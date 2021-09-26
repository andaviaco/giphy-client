import React, { Fragment } from 'react';
import { Container, Grid, GridItem, Text } from '@chakra-ui/react';

import { Modal } from './Modal';

import { Gif, GifImages, GifRendition } from '../api/GifAPI';

interface GifModalProps {
  gif: Gif;
  isModalOpen: boolean;
  onModalClose: () => void;
}

interface GifImageProps {
  rendition: Partial<GifRendition>;
}

function GifPicture({ rendition }: GifImageProps) {
  return (
    <picture>
      <source type="image/webp" srcSet={rendition.webp} />
      <source type="video/mp4" srcSet={rendition.mp4} />
      <img src={rendition.url} alt="" />
    </picture>
  );
}

export function GifModal({ gif, isModalOpen, onModalClose }: GifModalProps) {
  const renditionTypes: Array<keyof GifImages> = [
    'fixed_height',
    'fixed_width',
    'fixed_height_small',
    'fixed_width_small',
  ];

  return (
    <Modal isOpen={isModalOpen} onClose={onModalClose} title={gif.title}>
      <Container align="center" marginBottom="8">
        <GifPicture rendition={gif?.images?.original} />
      </Container>
      <Container>
        <Grid templateColumns="repeat(4, 1fr)" gap={4}>
          {renditionTypes.map((renditionType) => (
            <Fragment key={renditionType}>
              <GridItem colSpan={1}>
                <Text as="strong">{renditionType}</Text>
              </GridItem>

              {/* TODO: set size */}
              <GridItem colSpan={3}>
                <GifPicture rendition={gif?.images?.[renditionType]} />
              </GridItem>
            </Fragment>
          ))}
        </Grid>
      </Container>
    </Modal>
  );
}
