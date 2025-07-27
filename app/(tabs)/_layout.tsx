import { COLORS } from "@/constants/colors";
import { useAuth } from "@/context/AuthContext";
import { useAppTheme } from "@/theme/paperTheme";
import { AntDesign, Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { useEffect, useState } from "react";
import { Keyboard, View } from "react-native";
import { Avatar } from "react-native-paper";

const ActiveIndicator = () => {
  return (
    <View
      style={{
        height: 4,
        width: 20,
        backgroundColor: COLORS.background,
        borderRadius: 2,
        marginTop: 8,
      }}
    />
  );
};

export default function TabLayout() {
  const { colors } = useAppTheme();
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const { session, loading } = useAuth();

  useEffect(() => {
    const showSubscription = Keyboard.addListener("keyboardDidShow", () => {
      setKeyboardVisible(true);
    });
    const hideSubscription = Keyboard.addListener("keyboardDidHide", () => {
      setKeyboardVisible(false);
    });

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  if (loading) return null;

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarHideOnKeyboard: true,
        tabBarActiveTintColor: colors.background,
        tabBarInactiveTintColor: colors.outline,

        tabBarStyle: {
          backgroundColor: colors.primary,
          borderRadius: 10,
          borderColor: "transparent",
          height: 80,
          display: isKeyboardVisible ? "none" : "flex",
          justifyContent: "center",
          alignItems: "center",
          position: "absolute",
          marginHorizontal: 10,
          elevation: 0,
          marginBottom: 15,
        },
        tabBarIconStyle: {
          marginTop: 20,
        },
        tabBarItemStyle: {
          justifyContent: "center",
          alignItems: "center",
        },
        tabBarLabelStyle: {
          display: "none",
        },
        // tabBarBadgeStyle: {
        //   color: colors.card,
        //   backgroundColor: COLORS.border,
        // },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          tabBarIcon: ({ color, focused }) => (
            <View style={{ alignItems: "center" }}>
              <AntDesign name="home" size={24} color={color} />
              {focused && <ActiveIndicator />}
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          tabBarIcon: ({ color, focused }) => (
            <View style={{ alignItems: "center" }}>
              <Feather name="search" size={24} color={color} />
              {focused && <ActiveIndicator />}
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="cart"
        options={{
          tabBarIcon: ({ color, focused }) => (
            <View style={{ alignItems: "center" }}>
              <AntDesign name="shoppingcart" size={24} color={color} />
              {focused && <ActiveIndicator />}
            </View>
          ),
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          tabBarIcon: ({ color, focused }) => (
            <View>
              {!session ? (
                <View>
                  <MaterialCommunityIcons
                    name="account-circle-outline"
                    size={24}
                    color={color}
                  />
                  {focused && <ActiveIndicator />}
                </View>
              ) : (
                <Avatar.Image
                  size={32}
                  source={{
                    uri: "https://media.altpress.com/fkdgxpscnt/uploads/2021/10/07/john-doe-interview-part-2.jpg",
                  }}
                />
              )}
            </View>
          ),
        }}
      />
    </Tabs>
  );
}
