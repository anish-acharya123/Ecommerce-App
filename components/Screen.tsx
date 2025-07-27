import { StyleSheet, View, ViewProps } from "react-native";
import { useTheme } from "react-native-paper";

export default function Screen({ children, style, ...props }: ViewProps) {
  const { colors } = useTheme();

  return (
    <View
      style={[styles.container, { backgroundColor: colors.background }, style]}
      {...props}
    >
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
