import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  HStack,
  Image,
  Input,
  Text,
  SimpleGrid,
  Grid,
  GridItem,
} from '@chakra-ui/react';
import { Fragment, useState } from 'react';
import { Gif, GifImages } from '../api/GifAPI';
import { Modal } from '../components/Modal';
import { useGifs, UseGifsStatus } from '../hooks/useGifs';

const INITIAL_SEARCH = 'Cute panda';

export function GiftPage() {
  const [selectedGif, setSelectedGif] = useState<Gif>({} as any);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [search, setSearch] = useState('');
  const { gifs, status, searchGifs, loadMore } = useGifs({
    initialSearch: INITIAL_SEARCH,
    pageSize: 10,
  });

  function handleGifClick(gifInfo: any) {
    setIsModalOpen(true);
    setSelectedGif(gifInfo);
  }

  function handleModalClose() {
    setIsModalOpen(false);
  }

  function handleSearchChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { value } = event.target;

    setSearch(value);
  }

  function handleSearchSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    searchGifs(search);
  }

  function handleLoadMore() {
    loadMore();
  }

  return (
    <Container width="100%" maxWidth="1200px" padding="0 4" alignItems="center">
      <Flex direction="column" align="center" marginBottom="8">
        <Heading as="h1" marginBottom="4" textAlign="center">
          GIFs.{' '}
          <Text as="span" fontSize="lg" display="block">
            GIFs for everyone.
          </Text>
        </Heading>

        <form onSubmit={handleSearchSubmit}>
          <HStack spacing="1">
            <Input
              placeholder={INITIAL_SEARCH}
              value={search}
              onChange={handleSearchChange}
            />
            <Button
              colorScheme="purple"
              variant="outline"
              type="submit"
              isLoading={status === UseGifsStatus.Loading}
            >
              Search
            </Button>
          </HStack>
        </form>
      </Flex>

      {status === UseGifsStatus.Done && gifs.length === 0 ? (
        <Flex justify="center" marginBottom="4">
          <Text>No gifs found for your search.</Text>
        </Flex>
      ) : (
        <SimpleGrid minChildWidth="100px" spacing="8" marginBottom="4">
          {gifs.map((gif) => (
            <Box
              key={gif.id}
              bg="purple.600"
              align="center"
              onClick={() => handleGifClick(gif)}
            >
              {/* TODO: Set fallback */}
              <Image
                boxSize="100px"
                objectFit="cover"
                src={gif.images.fixed_height_still.url}
                alt="TODO"
              />
            </Box>
          ))}
        </SimpleGrid>
      )}

      <Flex justify="center">
        <Button
          variant="outline"
          onClick={handleLoadMore}
          isLoading={status === UseGifsStatus.Loading}
        >
          Load More
        </Button>
      </Flex>

      <Modal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        title={selectedGif.title}
      >
        <Container align="center" marginBottom="6">
          <picture>
            <source
              type="image/webp"
              srcSet={selectedGif?.images?.original.webp}
            />
            <source
              type="video/mp4"
              srcSet={selectedGif?.images?.original.mp4}
            />
            <img src={selectedGif?.images?.original.url} alt="" />
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
                        selectedGif?.images?.[renditionType as keyof GifImages]
                          ?.webp
                      }
                    />
                    <source
                      type="video/mp4"
                      srcSet={
                        selectedGif?.images?.[renditionType as keyof GifImages]
                          ?.mp4
                      }
                    />
                    <img
                      src={
                        selectedGif?.images?.[renditionType as keyof GifImages]
                          ?.url
                      }
                      alt=""
                    />
                  </picture>
                </GridItem>
              </Fragment>
            ))}
          </Grid>
        </Container>
      </Modal>
    </Container>
  );
}
