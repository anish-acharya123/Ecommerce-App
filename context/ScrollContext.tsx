import { createContext, useContext } from "react";
import { Animated } from "react-native";

export const ScrollYContext = createContext<Animated.Value | null>(null);

export const ScrollYProvider = ScrollYContext.Provider;

export const useScrollY = () => {
  const context = useContext(ScrollYContext);
  if (!context) {
    throw new Error("useScrollY must be used within ScrollYProvider");
  }
  return context;
};
