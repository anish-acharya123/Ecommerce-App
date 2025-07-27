import React from "react";
import { StyleSheet } from "react-native";
import { ActivityIndicator, useTheme } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

const Loader: React.FC = () => {
  const theme = useTheme();
  return (
    <SafeAreaView style={styles.centered}>
      <ActivityIndicator size="large" color={theme.colors.primary} />
    </SafeAreaView>
  );
};

export default Loader;

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
