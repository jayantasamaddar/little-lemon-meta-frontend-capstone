import { createContext, useContext } from 'react';
import { useWindowResize } from '../../hooks';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const windowSize = useWindowResize();
  console.log(windowSize);

  return (
    <AppContext.Provider value={{ windowSize }}>{children}</AppContext.Provider>
  );
};

export const useAppGlobals = () => {
  const globals = useContext(AppContext);
  return globals;
};
