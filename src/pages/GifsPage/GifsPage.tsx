import { Button, Container, Flex, Heading, Text } from '@chakra-ui/react';
import { useState } from 'react';
import { GifModal } from '../../components/GifModal';
import { useGifs, UseGifsStatus } from '../../hooks/useGifs';
import { Gif } from '../../types/Gif';
import { GifSearchBox } from './GifSearchBox';
import { GifsList } from './GifsList';

const INITIAL_SEARCH = 'Cute panda';
const PAGE_SIZE = 15;

export function GiftPage() {
  const [selectedGif, setSelectedGif] = useState<Gif>({} as any);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { gifs, status, searchGifs, loadMore } = useGifs({
    initialSearch: INITIAL_SEARCH,
    pageSize: PAGE_SIZE,
  });

  function handleGifClick(gifInfo: any) {
    setSelectedGif(gifInfo);
    setIsModalOpen(true);
  }

  function handleModalClose() {
    setIsModalOpen(false);
  }

  function handleSearchSubmit(search: string) {
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

        <GifSearchBox
          placeholder={INITIAL_SEARCH}
          isLoading={status === UseGifsStatus.Loading}
          onSubmit={handleSearchSubmit}
        />
      </Flex>

      {/* TODO: create error boundary */}
      {status === UseGifsStatus.Done && gifs.length === 0 ? (
        <Flex justify="center" marginBottom="4">
          <Text>No gifs found for your search.</Text>
        </Flex>
      ) : (
        <GifsList gifs={gifs} onGifClick={handleGifClick} />
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
