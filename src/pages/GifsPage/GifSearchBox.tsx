import React, { useState } from 'react';
import { Button, HStack, Input } from '@chakra-ui/react';

export function GifSearchBox({ placeholder, isLoading, onSubmit }: any) {
  const [search, setSearch] = useState('');

  function handleSearchChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { value } = event.target;

    setSearch(value);
  }

  function handleSearchSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    onSubmit(search);
  }

  return (
    <form onSubmit={handleSearchSubmit}>
      <HStack spacing="1">
        <Input
          role="search"
          placeholder={placeholder}
          value={search}
          onChange={handleSearchChange}
        />
        <Button
          colorScheme="purple"
          variant="outline"
          name="Search"
          type="submit"
          isLoading={isLoading}
        >
          Search
        </Button>
      </HStack>
    </form>
  );
}
