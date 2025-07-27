import {
  MD3DarkTheme,
  MD3LightTheme,
  MD3Theme,
  useTheme,
} from "react-native-paper";

export interface CustomTheme extends MD3Theme {
  colors: MD3Theme["colors"] & {
    text: string;
    textLight: string;
    card: string;
    shadow: string;
    search: string;
  };
}

export const lightTheme: CustomTheme = {
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
    textLight: "#555555",
    card: "#F5F5F5",
    shadow: "#000000",
    search: "#f2f2f2",
  },
};

export const darkTheme: CustomTheme = {
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
    textLight: "#AAAAAA",
    card: "#1E1E1E",
    shadow: "#FFFFFF",
    search: "#ffff",
  },
};

export const useAppTheme = () => useTheme<CustomTheme>();
