import React, { Fragment } from 'react';
import { Container, Grid, GridItem, Text } from '@chakra-ui/react';

import { Modal } from './Modal';
import { formatRenditionName } from '../util';
import { Gif, GifImages, GifRendition } from '../types/Gif';

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
    <>
      {rendition.url ? (
        <picture>
          {rendition.webp ? (
            <source type="image/webp" srcSet={rendition.webp} />
          ) : null}
          <img src={rendition.url} alt="" loading="lazy" />
        </picture>
      ) : (
        <video autoPlay loop>
          <source type="video/mp4" src={rendition.mp4} />
        </video>
      )}
    </>
  );
}

export function GifModal({ gif, isModalOpen, onModalClose }: GifModalProps) {
  const renditionTypes: Array<keyof GifImages> = [
    'fixed_height',
    'fixed_height_small',
    'fixed_width',
    'fixed_width_small',
    'preview',
    'downsized',
    'fixed_height_downsampled',
    'fixed_width_downsampled',
    'looping',
  ];

  return (
    <Modal isOpen={isModalOpen} onClose={onModalClose} title={gif.title}>
      <Container align="center" marginBottom="8">
        <GifPicture rendition={gif?.images?.original} />
      </Container>
      <Container>
        <Grid templateColumns="repeat(4, 1fr)" gap={8}>
          {renditionTypes.map((renditionType) => (
            <Fragment key={renditionType}>
              <GridItem colSpan={1}>
                <Text as="strong">{formatRenditionName(renditionType)}</Text>
              </GridItem>

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
