import { dummyProducts } from "@/constants/dummydata";
import { CustomTheme, useAppTheme } from "@/theme/paperTheme";
import { MaterialIcons } from "@expo/vector-icons";
import React from "react";
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const FeaturedProducts = () => {
  const { colors } = useAppTheme();
  const styles = createStyles(colors);
  const randomProducts = dummyProducts
    .sort(() => 0.5 - Math.random())
    .slice(0, 6);

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Featured Products</Text>
      <FlatList
        data={randomProducts}
        columnWrapperStyle={{
          justifyContent: "space-between",
          paddingHorizontal: 5,
        }}
        contentContainerStyle={{
          paddingHorizontal: 8,
        }}
        numColumns={2}
        scrollEnabled={false}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Image source={{ uri: item.image_url }} style={styles.image} />
            <View style={styles.info}>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.price}>${item.price.toFixed(2)}</Text>
            </View>
            <TouchableOpacity style={styles.iconButton}>
              <MaterialIcons
                name="add-shopping-cart"
                size={24}
                color={colors.primary}
              />
            </TouchableOpacity>
          </View>
        )}
        // horizontal
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};
const createStyles = (colors: CustomTheme["colors"]) => {
  return StyleSheet.create({
    container: {
      paddingVertical: 15,
      gap: 4,
    },
    heading: {
      fontSize: 18,
      fontWeight: "600",
      color: colors.text,
      marginLeft: 10,
      marginBottom: 2,
    },
    card: {
      width: 160,
      backgroundColor: colors.card,
      borderRadius: 12,
      // padding: 10,
      paddingBottom: 10,
      overflow: "hidden",
      shadowColor: colors.shadow,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 5,
      elevation: 3,
      margin: 8,
    },
    image: {
      width: "100%",
      height: 100,
      marginBottom: 8,
      resizeMode: "cover",
    },
    info: {
      marginBottom: 6,
      paddingHorizontal: 8,
    },
    name: {
      fontSize: 14,
      fontWeight: "500",
      color: colors.text,
    },
    price: {
      fontSize: 13,
      color: colors.textLight,
    },
    iconButton: {
      position: "absolute",
      top: 10,
      right: 10,
      backgroundColor: colors.background,
      padding: 4,
      borderRadius: 10,
    },
  });
};

export default FeaturedProducts;
