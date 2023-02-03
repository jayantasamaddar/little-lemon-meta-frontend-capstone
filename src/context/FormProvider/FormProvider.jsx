import { createContext, useContext } from 'react';

export const FormContext = createContext();

export const FormContextProvider = ({ children, value }) => {
  return <FormContext.Provider value={value}>{children}</FormContext.Provider>;
};

export const useForm = () => useContext(FormContext);
