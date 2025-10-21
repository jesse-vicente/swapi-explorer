import { useState, useEffect } from 'react';

export const useSearch = (initialValue = '', delay = 500) => {
  const [searchValue, setSearchValue] = useState(initialValue);
  const [debouncedSearchValue, setDebouncedSearchValue] = useState(initialValue);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchValue(searchValue);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [searchValue, delay]);

  const clearSearch = () => {
    setSearchValue('');
    setDebouncedSearchValue('');
  };

  return {
    searchValue,
    debouncedSearchValue,
    setSearchValue,
    clearSearch,
  };
};