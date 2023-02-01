import { createContext, useContext } from 'react';

const AppContext = createContext();

export const AppProvider = ({ children, value }) => {
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => {
  const globals = useContext(AppContext);
  return globals;
};
