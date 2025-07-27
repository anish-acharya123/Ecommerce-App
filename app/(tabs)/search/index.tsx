import ProductCard from "@/components/FeaturedProducts";
import Loader from "@/components/Loader";
import Screen from "@/components/Screen";
import { useScrollY } from "@/context/ScrollContext";
import useDebounce from "@/hooks/useDebounce";
import { useSearchProducts } from "@/services/useGetSearchProduct";
import { useSearchStore } from "@/state/searchStore";
import React from "react";
import { Animated } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";

const Search = () => {
  const searchText = useSearchStore((state) => state.searchText);
  const debouncedSearch = useDebounce(searchText, 500);
  const scrollY = useScrollY();
  const { data: products, isLoading } = useSearchProducts(debouncedSearch);

  return (
    <SafeAreaView style={{ flex: 1 }} edges={["bottom", "left", "right"]}>
      <Screen>
        <Animated.ScrollView
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: scrollY } } }],
            { useNativeDriver: false }
          )}
          scrollEventThrottle={16}
        >
          {isLoading ? (
            <Loader />
          ) : (
            <ScrollView
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{
                marginBottom: 80,
              }}
            >
              <ProductCard
                label={`Product for ${
                  searchText.length > 0 ? searchText : "your search"
                }`}
                data={products}
                isLoading={isLoading}
              />
            </ScrollView>
          )}
        </Animated.ScrollView>
      </Screen>
    </SafeAreaView>
  );
};

export default Search;
