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
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { fetchGifs, Gif } from '../api/GifAPI';

export function GiftPage() {
  const [gifs, setGifs] = useState<Array<Gif>>([]);

  useEffect(() => {
    fetchGifs({ q: 'cute panda' }).then((results) => {
      setGifs(results);
      console.log(
        '🚀 ~ file: GiftsPage.tsx ~ line 19 ~ fetchGifs ~ results',
        results,
      );
    });
  }, []);

  return (
    <Container width="100%" maxWidth="1200px" padding="0 4" alignItems="center">
      <Flex direction="column" align="center" marginBottom="8">
        <Heading as="h1" marginBottom="4" textAlign="center">
          GIFs.{' '}
          <Text as="span" fontSize="lg" display="block">
            GIFs for everyone.
          </Text>
        </Heading>

        <form>
          <HStack spacing="1">
            <Input placeholder="Cute panda" />
            <Button colorScheme="purple" variant="outline" type="submit">
              Search
            </Button>
          </HStack>
        </form>
      </Flex>

      <SimpleGrid minChildWidth="100px" spacing="40px">
        {gifs.map((gif) => (
          <Box key={gif.id} bg="purple.600" align="center">
            <Image
              boxSize="100px"
              objectFit="cover"
              src={gif.images.fixed_height_still.url}
              alt="TODO"
            />
          </Box>
        ))}
      </SimpleGrid>
    </Container>
  );
}
