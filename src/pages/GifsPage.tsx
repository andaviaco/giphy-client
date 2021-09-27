import {
  Box,
  Button,
  Center,
  Container,
  Flex,
  Heading,
  HStack,
  Image,
  Input,
  Text,
  SimpleGrid,
  Skeleton,
} from '@chakra-ui/react';
import { useState } from 'react';
import { Gif } from '../api/GifAPI';
import { GifModal } from '../components/GifModal';
import { useGifs, UseGifsStatus } from '../hooks/useGifs';

const INITIAL_SEARCH = 'Cute panda';
const PAGE_SIZE = 15;

export function GiftPage() {
  const [selectedGif, setSelectedGif] = useState<Gif>({} as any);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [search, setSearch] = useState('');
  const { gifs, status, searchGifs, loadMore } = useGifs({
    initialSearch: INITIAL_SEARCH,
    pageSize: PAGE_SIZE,
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
              role="search"
              placeholder={INITIAL_SEARCH}
              value={search}
              onChange={handleSearchChange}
            />
            <Button
              colorScheme="purple"
              variant="outline"
              name="Search"
              type="submit"
              isLoading={status === UseGifsStatus.Loading}
            >
              Search
            </Button>
          </HStack>
        </form>
      </Flex>

      {/* TODO: create error boundary */}
      {status === UseGifsStatus.Done && gifs.length === 0 ? (
        <Flex justify="center" marginBottom="4">
          <Text>No gifs found for your search.</Text>
        </Flex>
      ) : (
        <SimpleGrid
          as="section"
          minChildWidth="200px"
          spacing="8"
          marginBottom="4"
        >
          {gifs.map((gif) => (
            <Box key={gif.id} as="article">
              <Center
                as="button"
                width="100%"
                title={`View ${gif.title} detail`}
                onClick={() => handleGifClick(gif)}
              >
                <Image
                  boxSize="200px"
                  objectFit="cover"
                  loading="lazy"
                  name={gif.title}
                  src={gif.images.fixed_height_still.url}
                  alt={gif.title}
                  fallback={<Skeleton height="200px" width="200px" />}
                />
              </Center>
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

      <GifModal
        gif={selectedGif}
        isModalOpen={isModalOpen}
        onModalClose={handleModalClose}
      />
    </Container>
  );
}
