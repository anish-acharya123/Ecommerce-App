import { MD3DarkTheme, MD3LightTheme } from "react-native-paper";

export const lightTheme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    primary: "#000000", 
    background: "#FFFFFF", 
    surface: "#FFFFFF", 
    text: "#000000", 
    onSurface: "#000000", 
    outline: "#CCCCCC",
    secondary: "#555555", 
    error: "#FF3333", 
  },
};

export const darkTheme = {
  ...MD3DarkTheme,
  colors: {
    ...MD3DarkTheme.colors,
    primary: "#FFFFFF",
    background: "#000000",
    surface: "#1A1A1A",
    text: "#FFFFFF",
    onSurface: "#FFFFFF",
    outline: "#555555",
    secondary: "#AAAAAA",
    error: "#FF6666",
  },
};
