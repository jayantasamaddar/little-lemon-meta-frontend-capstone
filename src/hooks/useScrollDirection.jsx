import { useState, useRef, useEffect } from 'react';

export const useScrollDirection = () => {
  const [scrollDirection, setScrollDirection] = useState('scrollUp');
  const scrollRef = useRef(window.scrollY);

  useEffect(() => {
    const handler = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > scrollRef.current) setScrollDirection('scrollDown');
      else setScrollDirection('scrollUp');
      scrollRef.current = currentScrollY;
      return;
    };
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, []);

  return { direction: scrollDirection, scrollY: scrollRef.current };
};
