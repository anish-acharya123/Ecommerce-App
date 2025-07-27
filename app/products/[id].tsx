import Loader from "@/components/Loader";
import {
  useGetProductById,
  useSimilarProducts,
} from "@/services/useGetProducts";
import { useCartStore } from "@/state/cartStore";
import { useAppTheme } from "@/theme/paperTheme";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import React, { useState } from "react";
import {
  Dimensions,
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const { width } = Dimensions.get("window");

const ProductDetails = () => {
  const { id } = useLocalSearchParams();
  const { colors } = useAppTheme();
  const { data: product, isLoading: productLoading } = useGetProductById(
    id as string
  );
  const { data: similarProducts, isLoading: relatedproductLoading } =
    useSimilarProducts(product?.category, id as string);
  const addToCart = useCartStore((state) => state.addToCart);

  const [selectedSize, setSelectedSize] = useState<string>("");

  if (productLoading || relatedproductLoading) return <Loader />;

  return (
    <ScrollView style={{ backgroundColor: colors.background }}>
      <Image source={{ uri: product?.image_url }} style={styles.image} />

      <View style={styles.content}>
        <Text style={[styles.title, { color: colors.text }]}>
          {product?.name}
        </Text>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            gap: 8,
          }}
        >
          <Text style={[styles.price, { color: colors.primary }]}>
            ${product?.price}
          </Text>

          <Text
            style={[
              styles.price,
              {
                color:
                  product?.stock != null && product.stock > 0
                    ? "#008000"
                    : "#FF0000",
              },
            ]}
          >
            {product?.stock != null && product.stock > 0
              ? "In Stock"
              : "Out of Stock"}
          </Text>
        </View>

        <View style={styles.sizeContainer}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            Select Size
          </Text>
          <View style={styles.sizeOptions}>
            {product?.size.map((size: string) => {
              const isSelected = selectedSize === size;
              return (
                <TouchableOpacity
                  key={size}
                  style={[
                    styles.sizeButton,
                    {
                      backgroundColor: isSelected
                        ? colors.primary
                        : colors.background,
                      borderColor: colors.primary,
                    },
                  ]}
                  onPress={() => setSelectedSize(size)}
                >
                  <Text
                    style={{
                      fontSize: 16,
                      color: isSelected ? colors.background : colors.primary,
                      fontWeight: isSelected ? "bold" : "normal",
                    }}
                  >
                    {size}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* Description */}
        <Text style={[styles.sectionTitle, { color: colors.text }]}>
          Description
        </Text>
        <Text style={[styles.description, { color: colors.text }]}>
          {product?.description}
        </Text>

        {/* Action Buttons */}
        <View style={styles.actionButtons}>
          <TouchableOpacity
            onPress={() => {
              if (product) {
                addToCart(product, selectedSize);
              }
            }}
            disabled={!product}
            style={[
              styles.cartBtn,
              { backgroundColor: colors.primary, opacity: product ? 1 : 0.5 },
            ]}
          >
            <Ionicons name="cart" size={20} color="white" />
            <Text style={styles.cartText}>Add to Cart</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.buyBtn, { backgroundColor: colors.primary }]}
          >
            <MaterialCommunityIcons name="golf-cart" size={24} color="white" />
            <Text style={styles.buyText}>Buy Now</Text>
          </TouchableOpacity>
        </View>

        {similarProducts && similarProducts.length > 0 && (
          <>
            <Text
              style={[
                styles.sectionTitle,
                { color: colors.text, marginTop: 20 },
              ]}
            >
              Related Items
            </Text>
            <FlatList
              data={similarProducts}
              keyExtractor={(item) => item.id}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.relatedList}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.relatedItem}
                  onPress={() => router.push(`/products/${item.id}`)}
                >
                  <Image
                    source={{ uri: item.image_url }}
                    style={styles.relatedImage}
                  />
                  <Text style={[styles.relatedName, { color: colors.text }]}>
                    {item.name}
                  </Text>
                </TouchableOpacity>
              )}
            />
          </>
        )}
      </View>
    </ScrollView>
  );
};

export default ProductDetails;

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: width * 1.05,
    resizeMode: "cover",
    // borderBottomLeftRadius: 16,
    // borderBottomRightRadius: 16,
  },
  content: {
    padding: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
  },
  price: {
    fontSize: 18,
    fontWeight: "600",
    marginVertical: 8,
  },
  sizeContainer: {
    marginTop: 16,
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 8,
  },
  sizeOptions: {
    flexDirection: "row",
    gap: 10,
  },
  sizeButton: {
    borderWidth: 1,
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
    fontSize: 16,
  },
  description: {
    fontSize: 14,
    lineHeight: 20,
    marginVertical: 10,
  },
  actionButtons: {
    flexDirection: "row",
    gap: 12,
    marginTop: 16,
  },
  cartBtn: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    justifyContent: "center",
    borderRadius: 10,
    paddingVertical: 12,
  },
  cartText: {
    color: "white",
    fontWeight: "600",
    fontSize: 16,
  },
  buyBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    justifyContent: "center",
    flex: 1,
    borderRadius: 10,
    paddingVertical: 12,
  },
  buyText: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
  },
  relatedList: {
    paddingVertical: 12,
  },
  relatedItem: {
    marginRight: 14,
    width: 120,
  },
  relatedImage: {
    width: 120,
    height: 140,
    borderRadius: 8,
    resizeMode: "cover",
  },
  relatedName: {
    marginTop: 6,
    fontSize: 13,
    fontWeight: "500",
  },
  loading: {
    textAlign: "center",
    marginTop: 50,
  },
});
