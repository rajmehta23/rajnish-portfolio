import { useState, useEffect } from 'react';

export enum ScrollDirection {
  UP = 'up',
  DOWN = 'down',
  NONE = 'none'
}

export function useScrollDirection(threshold: number = 10) {
  const [scrollDirection, setScrollDirection] = useState<ScrollDirection>(ScrollDirection.NONE);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    let scrollTimer: NodeJS.Timeout;

    const updateScrollDirection = () => {
      const scrollY = window.pageYOffset;

      if (Math.abs(scrollY - lastScrollY) < threshold) {
        return;
      }

      setScrollDirection(scrollY > lastScrollY ? ScrollDirection.DOWN : ScrollDirection.UP);
      setLastScrollY(scrollY > 0 ? scrollY : 0);
    };

    const onScroll = () => {
      if (scrollTimer) clearTimeout(scrollTimer);
      scrollTimer = setTimeout(updateScrollDirection, 10);
    };

    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, [lastScrollY, threshold]);

  return scrollDirection;
}
