import Categories from "@/components/Categories";
import FeaturedProducts from "@/components/FeaturedProducts";
import ProductCarousel from "@/components/ProductCarousel";
import Screen from "@/components/Screen";
import { useScrollY } from "@/context/ScrollContext";
import { Animated } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Home = () => {
  const scrollY = useScrollY();

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
          <FeaturedProducts />
          <Categories />
          <FeaturedProducts />
        </Animated.ScrollView>
      </Screen>
    </SafeAreaView>
  );
};

export default Home;
