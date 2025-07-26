import Screen from "@/components/Screen";
import React from "react";
import { ScrollView, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Home = () => {
  return (
    <Screen>
      <SafeAreaView
        style={{
          flex: 1,
        }}
      >
        <ScrollView
          style={{
            height: 500,
          }}
        >
          <Text
            style={{
              fontSize: 16,
            }}
          >
            Home
          </Text>
        </ScrollView>
      </SafeAreaView>
    </Screen>
  );
};

export default Home;
