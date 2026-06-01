import { useEffect, useState } from 'react';

export function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);

    const listener = () => {
      setMatches(media.matches);
    };

    listener();
    media.addEventListener('change', listener);

    return () => {
      media.removeEventListener('change', listener);
    };
  }, [query]);

  return matches;
}

export const useIsSmall = () => useMediaQuery('(min-width: 480px)');
export const useIsMedium = () => useMediaQuery('(min-width: 768px)');
export const useIsLarge = () => useMediaQuery('(min-width: 1024px)');
