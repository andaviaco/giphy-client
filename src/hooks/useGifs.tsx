import { useEffect, useState } from 'react';
import { fetchGifs, Gif } from '../api/GifAPI';

export enum UseGifsStatus {
  Idle = 'Idle',
  Loading = 'Loading',
  Done = 'Done',
}

export function useGifs({ initialSearch, pageSize }: any) {
  const [gifs, setGifs] = useState<Array<Gif>>([]);
  const [offset, setOffset] = useState(0);
  const [currentSearch, setCurrentSearch] = useState(initialSearch);
  const [status, setStatus] = useState(UseGifsStatus.Idle);

  useEffect(() => {
    setStatus(UseGifsStatus.Loading);

    fetchGifs({ q: currentSearch, offset: offset }).then((results) => {
      setGifs((gifs) => [...gifs, ...results]);
      setStatus(UseGifsStatus.Done);
    });
  }, [currentSearch, offset]);

  function searchGifs(searchTerm: string) {
    if (searchTerm !== currentSearch) {
      setOffset(0);
      setGifs([]);
      setCurrentSearch(searchTerm);
    }
  }

  function loadMore() {
    setOffset(offset + pageSize);
  }

  return {
    gifs,
    status,
    searchGifs,
    loadMore,
  };
}
