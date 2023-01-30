import { useState, createContext, useContext } from 'react';
import './ThemeProvider.css';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <div className="container">{children}</div>
    </ThemeContext.Provider>
  );
};

export const useTheme = theme => {
  const { setTheme } = useContext(ThemeContext);
  setTheme(theme);
};
