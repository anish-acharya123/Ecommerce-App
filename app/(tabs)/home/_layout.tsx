import { Stack } from "expo-router";
import { StyleSheet, TextInput } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

function SearchHeader() {
  return (
    <SafeAreaView style={styles.container}>
      <TextInput
        placeholder="Search..."
        placeholderTextColor="#aaa"
        style={styles.input}
      />
    </SafeAreaView>
  );
}

export default function HomeLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          header: () => <SearchHeader />,
        }}
      />
    </Stack>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    paddingHorizontal: 12,
    paddingTop: 10,
    backgroundColor: "#fff",
  },
  input: {
    backgroundColor: "#f0f0f0",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    fontSize: 16,
  },
});
