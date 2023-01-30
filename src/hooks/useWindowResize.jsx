import { useState, useEffect } from 'react';

export const useWindowResize = () => {
  const [size, setSize] = useState({
    windowWidth: window.innerWidth,
    windowHeight: window.innerHeight,
  });

  useEffect(() => {
    const handler = ({ target }) => {
      setSize({
        windowWidth: target.innerWidth,
        windowHeight: target.innerHeight,
      });
    };

    window.addEventListener('resize', handler);
    return () => window.removeEventListener('resize', handler);
  }, [size]);

  return size;
};

// const ResizeTracker = maxWidth => {
//   const [windowWidth, setWindowWidth] = React.useState(window.innerWidth);
//   const [isMobile, setIsMobile] = React.useState(
//     windowWidth < maxWidth ? true : false
//   );

//   useEffect(() => {
//     window.addEventListener('resize', () => {
//       const currentWidth = window.innerWidth;
//       setWindowWidth(currentWidth);
//       setIsMobile(currentWidth < maxWidth ? true : false);
//     });
//   }, [maxWidth]);

//   return { windowWidth, isMobile };
// };

// export default ResizeTracker;
