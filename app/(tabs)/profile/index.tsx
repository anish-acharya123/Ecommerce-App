import { useAuth } from "@/context/AuthContext";
import { useGetProfile } from "@/services/useGetUser";
import React from "react";
import {
  ActivityIndicator,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useTheme } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { useToast } from "react-native-toast-notifications";

const defaultAvatar =
  "https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png";

const Profile = () => {
  const { user, logout } = useAuth();
  const toast = useToast();
  const theme = useTheme();

  const { data: profile, isLoading, isError, error } = useGetProfile(user?.id);
  if (isLoading) {
    return (
      <SafeAreaView style={styles.centered}>
        <ActivityIndicator size="large" color={theme.colors.primary} />
      </SafeAreaView>
    );
  }

  if (isError) {
    toast.show("Failed to load profile: " + error.message, { type: "danger" });
  }

  const handleLogout = async () => {
    await logout();
    toast.show("Logged out successfully", { type: "success" });
  };

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <View style={styles.profileContainer}>
        <Image
          source={{ uri: profile?.avatar_url || defaultAvatar }}
          style={styles.avatar}
        />
        <Text style={[styles.name, { color: theme.colors.onBackground }]}>
          {profile?.full_name || "Full Name"}
        </Text>
        <Text style={[styles.email, { color: theme.colors.onBackground }]}>
          {profile?.email || "Email"}
        </Text>
      </View>

      <TouchableOpacity
        style={[styles.logoutButton, { backgroundColor: theme.colors.primary }]}
        onPress={handleLogout}
      >
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  profileContainer: {
    alignItems: "center",
    marginTop: 40,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#ccc",
  },
  name: {
    fontSize: 20,
    fontWeight: "600",
    marginTop: 16,
  },
  email: {
    fontSize: 16,
    marginTop: 4,
  },
  logoutButton: {
    marginTop: 40,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  logoutText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "500",
  },
});

export default Profile;
