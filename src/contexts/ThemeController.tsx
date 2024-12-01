import {
  useState, ReactNode, createContext,
  useContext,
} from 'react';
import { ConfigProvider, theme } from 'antd';

interface IThemeContext {
  isDarkMode: boolean,
  switchTheme: () => void,
}

const ThemeContext = createContext<IThemeContext>({} as IThemeContext);

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const { defaultAlgorithm, darkAlgorithm } = theme;
  const [isDarkMode, setIsDarkMode] = useState(localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches));

  const switchTheme = () => {
    setIsDarkMode((prev) => {
      window.localStorage.setItem('theme', prev ? 'light' : 'dark');
      return !prev;
    });
  };

  return (
    // eslint-disable-next-line react/jsx-no-constructed-context-values
    <ThemeContext.Provider value={{ isDarkMode, switchTheme }}>
      <ConfigProvider theme={{ algorithm: isDarkMode ? darkAlgorithm : defaultAlgorithm }}>
        {children}
      </ConfigProvider>
    </ThemeContext.Provider>
  );
};
