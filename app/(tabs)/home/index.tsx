import Categories from "@/components/Categories";
import ProductCard from "@/components/FeaturedProducts";
import ProductCarousel from "@/components/ProductCarousel";
import Screen from "@/components/Screen";
import { useScrollY } from "@/context/ScrollContext";
import { useGetProducts } from "@/services/useGetProducts";
import { Animated } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Home = () => {
  const scrollY = useScrollY();
  const { data: products, isLoading } = useGetProducts();

  return (
    <SafeAreaView style={{ flex: 1 }} edges={["bottom", "left", "right"]}>
      <Screen>
        <Animated.ScrollView
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: scrollY } } }],
            { useNativeDriver: false }
          )}
          scrollEventThrottle={16}
          style={{
            marginBottom: 80,
          }}
        >
          <ProductCarousel />
          <ProductCard
            label="Featured Products"
            data={products?.slice(0, 6)}
            isLoading={isLoading}
          />
          <Categories />
          <ProductCard
            label="Latest Product"
            data={products?.slice(6, 10)}
            isLoading={isLoading}
          />
        </Animated.ScrollView>
      </Screen>
    </SafeAreaView>
  );
};

export default Home;
