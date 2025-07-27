import { Dimensions, Image, Text, View } from "react-native";
import Carousel from "react-native-reanimated-carousel";

const { width } = Dimensions.get("window");

const dummyData = [
  {
    id: "2",
    title: "Winter Deals",
    image: "https://images.unsplash.com/photo-1556740749-887f6717d7e4?w=800",
  },
  {
    id: "3",
    title: "New Arrivals",
    image: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=800",
  },
];

const ProductCarousel = () => {
  return (
    <Carousel
      width={width}
      height={220}
      autoPlay
      data={dummyData}
      scrollAnimationDuration={1500}
      renderItem={({ item }) => (
        <View>
          <Image
            source={{ uri: item.image }}
            style={{
              width: "100%",
              height: 220,
            }}
            resizeMode="cover"
          />
          <View
            style={{
              position: "absolute",
              bottom: 10,
              left: 10,
              backgroundColor: "rgba(0,0,0,0.5)",
              paddingHorizontal: 10,
              paddingVertical: 4,
              borderRadius: 6,
            }}
          >
            <Text style={{ color: "#fff", fontWeight: "bold", fontSize: 14 }}>
              {item.title}
            </Text>
          </View>
        </View>
      )}
    />
  );
};

export default ProductCarousel;
