import { dummyProducts } from "@/constants/dummydata";
import { CustomTheme, useAppTheme } from "@/theme/paperTheme";
import { Feather } from "@expo/vector-icons"; // Or any icon family
import { router } from "expo-router";
import React from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const categoryIcons: Record<string, keyof typeof Feather.glyphMap> = {
  "T-Shirt": "tag",
  Jacket: "wind",
  Dress: "shopping-bag",
  Hoodie: "cloud",
  Jeans: "slack",
  Pants: "align-justify",
  Shirt: "check-square",
  Coat: "umbrella",
};
const Categories = () => {
  const { colors } = useAppTheme();
  const styles = createStyles(colors);
  const categories = Array.from(
    new Set(dummyProducts.map((item) => item.category))
  );

  return (
    <View style={{ paddingVertical: 10 }}>
      <Text style={styles.heading}>Select your category</Text>
      <FlatList
        data={categories}
        keyExtractor={(item) => item}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 16 }}
        ItemSeparatorComponent={() => <View style={{ width: 12 }} />}
        renderItem={({ item }) => {
          const iconName = categoryIcons[item] || "tag";
          return (
            <TouchableOpacity
              style={styles.card}
              onPress={() => router.push(`/search?category=${item}`)}
            >
              <Feather name={iconName} size={24} color={colors.primary} />
              <Text style={styles.label}>{item}</Text>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};
const createStyles = (colors: CustomTheme["colors"]) => {
  return StyleSheet.create({
    heading: {
      fontSize: 18,
      fontWeight: "600",
      color: colors.text,
      marginLeft: 10,
      marginBottom: 5,
      textAlign: "center",
    },
    card: {
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: colors.surface,
      padding: 12,
      borderRadius: 12,
      minWidth: 80,
    },
    label: {
      marginTop: 6,
      fontSize: 14,
      color: colors.text,
      fontWeight: "500",
      textAlign: "center",
    },
  });
};

export default Categories;
