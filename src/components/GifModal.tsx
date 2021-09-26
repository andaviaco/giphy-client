import React, { Fragment } from 'react';
import { Container, Grid, GridItem, Text } from '@chakra-ui/react';

import { Modal } from './Modal';

import { Gif, GifImages } from '../api/GifAPI';

interface GifModalProps {
  gif: Gif;
  isModalOpen: boolean;
  onModalClose: () => void;
}

export function GifModal({ gif, isModalOpen, onModalClose }: GifModalProps) {
  return (
    <Modal isOpen={isModalOpen} onClose={onModalClose} title={gif.title}>
      <Container align="center" marginBottom="8">
        <picture>
          <source type="image/webp" srcSet={gif?.images?.original.webp} />
          <source type="video/mp4" srcSet={gif?.images?.original.mp4} />
          <img src={gif?.images?.original.url} alt="" />
        </picture>
      </Container>
      <Container>
        <Grid templateColumns="repeat(4, 1fr)" gap={4}>
          {/* TODO: memoize array? */}
          {[
            'fixed_height',
            'fixed_height_small',
            'fixed_width',
            'fixed_width_small',
          ].map((renditionType: any) => (
            <Fragment key={renditionType}>
              <GridItem colSpan={1}>
                <Text as="strong">{renditionType}</Text>
              </GridItem>

              {/* TODO: set size */}
              <GridItem colSpan={3}>
                <picture>
                  <source
                    type="image/webp"
                    srcSet={
                      gif?.images?.[renditionType as keyof GifImages]?.webp
                    }
                  />
                  <source
                    type="video/mp4"
                    srcSet={
                      gif?.images?.[renditionType as keyof GifImages]?.mp4
                    }
                  />
                  <img
                    src={gif?.images?.[renditionType as keyof GifImages]?.url}
                    alt=""
                  />
                </picture>
              </GridItem>
            </Fragment>
          ))}
        </Grid>
      </Container>
    </Modal>
  );
}
