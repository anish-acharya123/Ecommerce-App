import Screen from "@/components/Screen";
import { useCartStore } from "@/state/cartStore";
import { CustomTheme, useAppTheme } from "@/theme/paperTheme";
import { MaterialIcons } from "@expo/vector-icons";
import React from "react";
import {
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Button } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

const SHIPPING_COST = 5.0;

const Cart = () => {
  const { colors } = useAppTheme();
  const styles = createStyles(colors);
  const {
    cart,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
    clearCart,
  } = useCartStore();

  const subtotal = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const total = subtotal + SHIPPING_COST;

  return (
    <SafeAreaView style={styles.container}>
      <Screen>
        <ScrollView
          contentContainerStyle={{
            marginBottom: 100,
          }}
        >
          {cart.length === 0 ? (
            <Text style={styles.emptyText}>Your cart is empty.</Text>
          ) : (
            <>
              <FlatList
                data={cart}
                scrollEnabled={false}
                keyExtractor={(item) => `${item.id}-${item.selectedSize}`}
                renderItem={({ item }) => (
                  <View style={styles.card}>
                    <Image
                      source={{ uri: item.image_url }}
                      style={styles.image}
                    />
                    <View style={styles.details}>
                      <Text style={styles.name}>{item.name}</Text>
                      <Text style={styles.category}>{item.category}</Text>
                      <Text style={styles.size}>Size: {item.selectedSize}</Text>
                      <View style={styles.quantityRow}>
                        <TouchableOpacity
                          onPress={() =>
                            decreaseQuantity(item.id, item.selectedSize)
                          }
                        >
                          <MaterialIcons
                            name="remove-circle-outline"
                            size={24}
                            color={colors.primary}
                          />
                        </TouchableOpacity>
                        <Text style={styles.quantity}>{item.quantity}</Text>
                        <TouchableOpacity
                          onPress={() =>
                            increaseQuantity(item.id, item.selectedSize)
                          }
                        >
                          <MaterialIcons
                            name="add-circle-outline"
                            size={24}
                            color={colors.primary}
                          />
                        </TouchableOpacity>
                      </View>
                      <Text style={styles.price}>
                        ${(item.price * item.quantity).toFixed(2)}
                      </Text>
                    </View>
                    <TouchableOpacity
                      onPress={() => removeFromCart(item.id, item.selectedSize)}
                    >
                      <MaterialIcons
                        name="delete-outline"
                        size={24}
                        color={colors.error}
                      />
                    </TouchableOpacity>
                  </View>
                )}
                contentContainerStyle={{ paddingBottom: 16 }}
              />

              <View style={styles.summary}>
                <View style={styles.summaryRow}>
                  <Text style={styles.summaryLabel}>Subtotal</Text>
                  <Text style={styles.summaryValue}>
                    ${subtotal.toFixed(2)}
                  </Text>
                </View>
                <View style={styles.summaryRow}>
                  <Text style={styles.summaryLabel}>Shipping</Text>
                  <Text style={styles.summaryValue}>
                    ${SHIPPING_COST.toFixed(2)}
                  </Text>
                </View>
                <View style={styles.summaryRow}>
                  <Text style={styles.summaryTotal}>Total</Text>
                  <Text style={styles.summaryTotal}>${total.toFixed(2)}</Text>
                </View>
                <Button
                  mode="contained"
                  onPress={() => console.log("Checkout pressed")}
                  style={styles.checkoutBtn}
                  labelStyle={{ color: colors.background }}
                >
                  Checkout
                </Button>
              </View>
            </>
          )}
        </ScrollView>
      </Screen>
    </SafeAreaView>
  );
};

export default Cart;

const createStyles = (colors: CustomTheme["colors"]) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
      paddingHorizontal: 10,
    },
    emptyText: {
      textAlign: "center",
      color: colors.textLight,
      marginTop: 100,
      fontSize: 16,
    },
    card: {
      flexDirection: "row",
      backgroundColor: colors.card,
      borderRadius: 12,
      padding: 12,
      marginBottom: 12,
      alignItems: "center",
      gap: 10,
      shadowColor: colors.shadow,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
    },
    image: {
      width: 70,
      height: 70,
      borderRadius: 8,
    },
    details: {
      flex: 1,
    },
    name: {
      fontSize: 16,
      fontWeight: "bold",
      color: colors.text,
    },
    category: {
      fontSize: 13,
      color: colors.textLight,
    },
    size: {
      fontSize: 13,
      color: colors.secondary,
    },
    quantityRow: {
      flexDirection: "row",
      alignItems: "center",
      marginTop: 6,
      gap: 10,
    },
    quantity: {
      fontSize: 16,
      fontWeight: "bold",
      color: colors.text,
    },
    price: {
      marginTop: 6,
      fontSize: 14,
      fontWeight: "bold",
      color: colors.primary,
    },
    summary: {
      marginTop: 12,
      borderTopWidth: 1,
      borderTopColor: colors.outline,
      paddingTop: 12,
      gap: 8,
    },
    summaryRow: {
      flexDirection: "row",
      justifyContent: "space-between",
    },
    summaryLabel: {
      fontSize: 14,
      color: colors.textLight,
    },
    summaryValue: {
      fontSize: 14,
      color: colors.text,
    },
    summaryTotal: {
      fontSize: 16,
      fontWeight: "bold",
      color: colors.text,
    },
    checkoutBtn: {
      marginTop: 12,
      backgroundColor: colors.primary,
      paddingVertical: 6,
      borderRadius: 8,
    },
  });
