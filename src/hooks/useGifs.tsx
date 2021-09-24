import { useState } from 'react';
import { fetchGifs, Gif } from '../api/GifAPI';

export function useGifs({ pageSize }: any) {
  const [gifs, setGifs] = useState<Array<Gif>>([]);
  const [offset, setOffset] = useState(0);
  const [currentSearch, setCurrentSearch] = useState('');

  function searchGifs(searchTerm: string) {
    setCurrentSearch(searchTerm);

    fetchGifs({ q: searchTerm }).then((results) => {
      setGifs(results);
    });
  }

  function loadMore() {
    setOffset((offset) => offset + pageSize);

    fetchGifs({ q: currentSearch, offset: offset }).then((results) => {
      setGifs([...gifs, ...results]);
    });
  }

  return {
    gifs,
    searchGifs,
    loadMore,
  };
}
