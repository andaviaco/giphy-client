import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  HStack,
  Input,
  Text,
  SimpleGrid,
} from '@chakra-ui/react';
import { useEffect } from 'react';
import { fetchGifs } from '../api/GifAPI';

export function GiftPage() {
  useEffect(() => {
    fetchGifs({ q: 'cute panda' }).then((results) => {
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

      <SimpleGrid minChildWidth="120px" spacing="40px">
        <Box bg="purple.600" height="80px"></Box>
        <Box bg="purple.600" height="80px"></Box>
        <Box bg="purple.600" height="80px"></Box>
        <Box bg="purple.600" height="80px"></Box>
        <Box bg="purple.600" height="80px"></Box>
        <Box bg="purple.600" height="80px"></Box>
      </SimpleGrid>
    </Container>
  );
}
