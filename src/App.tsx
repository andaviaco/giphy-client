import React from 'react';
import { Container, Flex } from '@chakra-ui/react';
import { GiftPage } from './pages/GifsPage';

function App() {
  return (
    <Flex align="center" direction="column" min-height="100vh" marginBottom="8">
      <Flex
        align="center"
        width="100%"
        justify="center"
        paddingTop="4"
        paddingBottom="4"
        marginBottom="8"
        boxShadow="md"
      >
        <Container width="100%" maxWidth="1200px" padding="0 4">
          <Flex as="nav">Giphy App</Flex>
        </Container>
      </Flex>

      <Flex width="100%" height="100%">
        <GiftPage />
      </Flex>
    </Flex>
  );
}

export default App;
