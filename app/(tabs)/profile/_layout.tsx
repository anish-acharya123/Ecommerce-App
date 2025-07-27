import { useAuth } from "@/context/AuthContext";
import { Stack } from "expo-router";

export default function Layout() {
  const { session, loading } = useAuth();

  if (loading) return null;

  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Protected guard={!!session}>
        <Stack.Screen name="index" />
      </Stack.Protected>
      <Stack.Protected guard={!session}>
        <Stack.Screen name="sign-up" />
        <Stack.Screen name="Login" />
      </Stack.Protected>
    </Stack>
  );
}
