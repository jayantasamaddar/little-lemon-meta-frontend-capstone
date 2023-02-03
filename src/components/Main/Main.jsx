import { useEffect } from 'react';
import './Main.css';

export const Main = ({ children }) => {
  useEffect(() => {
    const handler = window.scrollTo(0, 0);
    window.addEventListener('unload', handler);
    return () => window.removeEventListener(this, handler);
  }, []);
  return <main role="region">{children}</main>;
};
