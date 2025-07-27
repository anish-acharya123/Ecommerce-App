import { AuthProvider } from "@/context/AuthContext";
import { darkTheme, lightTheme } from "@/theme/paperTheme";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useColorScheme } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Provider as PaperProvider } from "react-native-paper";
import { ToastProvider } from "react-native-toast-notifications";
import "react-native-url-polyfill/auto";

const queryClient = new QueryClient();

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <QueryClientProvider client={queryClient}>
        <PaperProvider theme={colorScheme === "dark" ? darkTheme : lightTheme}>
          <StatusBar style={colorScheme === "dark" ? "light" : "dark"} />
          <AuthProvider>
            <ToastProvider placement="top">
              <Stack
                screenOptions={{
                  headerShown: false,
                }}
              >
                <Stack.Screen name="(tabs)" />
                <Stack.Screen name="products" />
              </Stack>
            </ToastProvider>
          </AuthProvider>
        </PaperProvider>
      </QueryClientProvider>
    </GestureHandlerRootView>
  );
}
