import { StyleSheet, View } from "react-native";
import Svg, { Path } from "react-native-svg";

export const CustomTabBackground = () => {
  return (
    <View style={styles.wrapper}>
      <View style={styles.inner}>
        <Svg
          width="100%"
          height="100%"
          viewBox="0 0 400 70"
          preserveAspectRatio="none"
        >
          <Path
            d="
    M0 0 
    H150 
    C160 0, 160 40, 200 40 
    C240 40, 240 0, 250 0 
    H400 
    V70 
    H0 
    Z"
          />
        </Svg>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    ...StyleSheet.absoluteFillObject,
    height: "100%",
    // bottom: 5,
  },
  inner: {
    flex: 1,
    borderRadius: 10,
    overflow: "hidden",
  },
});
