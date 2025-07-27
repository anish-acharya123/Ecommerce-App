import { ScrollYProvider } from "@/context/ScrollContext";
import { useSearchStore } from "@/state/searchStore";
import { CustomTheme, useAppTheme } from "@/theme/paperTheme";
import { Stack, useLocalSearchParams } from "expo-router";
import { useEffect, useRef } from "react";
import { Animated, Platform, StyleSheet, TextInput } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Layout() {
  const { colors } = useAppTheme();
  const styles = createStyles(colors);
  const scrollY = useRef(new Animated.Value(0)).current;
  const setSearchTextGlobal = useSearchStore((state) => state.setSearchText);
  const inputRef = useRef<TextInput>(null);
  const searchText = useSearchStore((state) => state.searchText);
  const { category } = useLocalSearchParams();

  const headerHeight = scrollY.interpolate({
    inputRange: [0, 100],
    outputRange: [100, 60],
    extrapolate: "clamp",
  });

  const titleFontSize = scrollY.interpolate({
    inputRange: [0, 100],
    outputRange: [28, 20],
    extrapolate: "clamp",
  });

  useEffect(() => {
    const timeout = setTimeout(() => {
      inputRef.current?.focus();
    }, 100);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <ScrollYProvider value={scrollY}>
      <Stack>
        <Stack.Screen
          name="index"
          options={{
            header: () => (
              <SafeAreaView style={styles.container} edges={["top", "bottom"]}>
                <Animated.View
                  style={[styles.header, { height: headerHeight }]}
                >
                  <Animated.Text
                    style={[styles.title, { fontSize: titleFontSize }]}
                  >
                    Search Items
                  </Animated.Text>
                  <TextInput
                    ref={inputRef}
                    placeholder="Search..."
                    placeholderTextColor="#aaa"
                    style={styles.input}
                    defaultValue={
                      Array.isArray(category)
                        ? category.join(", ")
                        : category ?? searchText
                    }
                    onChangeText={() =>
                      setSearchTextGlobal(
                        Array.isArray(category)
                          ? category.join(", ")
                          : category ?? searchText
                      )
                    }
                  />
                </Animated.View>
              </SafeAreaView>
            ),
          }}
        />
      </Stack>
    </ScrollYProvider>
  );
}
const createStyles = (colors: CustomTheme["colors"]) => {
  return StyleSheet.create({
    container: {
      width: "100%",
      backgroundColor: colors.background,
    },
    header: {
      minHeight: 60,
      paddingVertical: Platform.OS === "ios" ? 20 : 10,
      paddingHorizontal: 20,
      backgroundColor: colors.background,
      justifyContent: "flex-start",
    },

    inner: {
      paddingBottom: 10,
    },
    title: {
      fontWeight: "bold",
      color: "#000",
      marginBottom: 8,
    },
    input: {
      height: 40,
      borderRadius: 8,
      backgroundColor: colors.search,
      paddingHorizontal: 12,
    },
  });
};
