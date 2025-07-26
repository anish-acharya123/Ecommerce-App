import { AuthProvider } from "@/context/AuthContext";
import { darkTheme, lightTheme } from "@/theme/paperTheme";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useColorScheme } from "react-native";
import { Provider as PaperProvider } from "react-native-paper";

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <PaperProvider theme={colorScheme === "dark" ? darkTheme : lightTheme}>
      <StatusBar style={colorScheme === "dark" ? "light" : "dark"} />
      <AuthProvider>
        <Stack>
          <Stack.Screen
            name="(tabs)"
            options={{
              headerShown: false,
            }}
          />
        </Stack>
      </AuthProvider>
    </PaperProvider>
  );
}
