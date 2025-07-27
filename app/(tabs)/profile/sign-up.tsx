import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import { supabase } from "@/lib/supabase";
import { uploadImageToBucket } from "@/lib/uploadAvatar";
import { signUpSchema } from "@/schemas/Auth.schema";
import { CustomTheme, useAppTheme } from "@/theme/paperTheme";
import * as ImagePicker from "expo-image-picker";
import { useState } from "react";
import { useToast } from "react-native-toast-notifications";

type SignUpData = z.infer<typeof signUpSchema>;

export default function SignUpScreen() {
  const toast = useToast();
  const { colors } = useAppTheme();
  const styles = createStyles(colors);

  const router = useRouter();
  const [error, setError] = useState("");
  const [pickedImageUri, setPickedImageUri] = useState<string | null>(null);

  const {
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<SignUpData>({
    resolver: zodResolver(signUpSchema.omit({ avatar_url: true })),
  });

  const onPickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.7,
    });

    if (!result.canceled) {
      setPickedImageUri(result.assets[0].uri);
    }
  };

  const onSignUp = async (data: SignUpData) => {
    const { email, password, full_name } = data;

    const { data: signUpData, error: signUpError } = await supabase.auth.signUp(
      {
        email,
        password,
      }
    );

    if (signUpError) {
      toast.show(signUpError.message, {
        type: "error",
      });
      return;
    }

    const user = signUpData.user;

    if (!user) {
      toast.show("Try logging in after email confirmation.", {
        type: "error",
      });
      return;
    }
    console.log(user.id, pickedImageUri);
    const avatar_url = await uploadImageToBucket(user.id, pickedImageUri);

    const { error: insertError } = await supabase.from("users").insert([
      {
        id: user.id,
        email: user.email,
        full_name,
        avatar_url,
      },
    ]);

    if (insertError) {
      toast.show("Failed to save user profile", {
        type: "error",
      });
      return;
    }

    toast.show("Account created", {
      type: "success",
    });

    router.replace("/");
  };

  return (
    <KeyboardAwareScrollView
      style={{ flex: 1 }}
      contentContainerStyle={{ flexGrow: 1 }}
      enableOnAndroid
      enableAutomaticScroll
    >
      <View style={styles.container}>
        <Text style={styles.title}>Create Account</Text>

        {error ? (
          <View style={styles.errorBox}>
            <Ionicons name="alert-circle" size={20} color={colors.primary} />
            <Text style={styles.errorText}>{error}</Text>
            <TouchableOpacity onPress={() => setError("")}>
              <Ionicons name="close" size={20} color={colors.textLight} />
            </TouchableOpacity>
          </View>
        ) : null}

        <TextInput
          style={[styles.input, errors.email && styles.errorInput]}
          placeholder="Enter your email"
          placeholderTextColor="#9A8478"
          autoCapitalize="none"
          keyboardType="email-address"
          onChangeText={(text) => setValue("email", text)}
        />
        {errors.email && (
          <Text style={styles.errorText}>{errors.email.message}</Text>
        )}

        <TextInput
          style={[styles.input, errors.password && styles.errorInput]}
          placeholder="Enter your password"
          placeholderTextColor="#9A8478"
          secureTextEntry
          onChangeText={(text) => setValue("password", text)}
        />
        {errors.password && (
          <Text style={styles.errorText}>{errors.password.message}</Text>
        )}

        <TextInput
          style={[styles.input, errors.password && styles.errorInput]}
          placeholder="Enter your Full Name"
          placeholderTextColor="#9A8478"
          secureTextEntry
          onChangeText={(text) => setValue("full_name", text)}
        />
        {errors.full_name && (
          <Text style={styles.errorText}>{errors.full_name.message}</Text>
        )}

        <TouchableOpacity style={styles.button} onPress={onPickImage}>
          <Text style={styles.buttonText}>
            {pickedImageUri ? "Change Avatar" : "Pick Avatar Image"}
          </Text>
        </TouchableOpacity>

        {pickedImageUri && (
          <Image
            source={{ uri: pickedImageUri }}
            style={{
              width: 100,
              height: 100,
              borderRadius: 50,
              alignSelf: "center",
              marginTop: 10,
            }}
          />
        )}

        <TouchableOpacity
          style={styles.button}
          onPress={handleSubmit(onSignUp)}
        >
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>

        <View style={styles.footerContainer}>
          <Text style={styles.footerText}>Already have an account?</Text>
          <TouchableOpacity onPress={() => router.push("profile/Login")}>
            <Text style={styles.linkText}>Sign in</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
}

const createStyles = (colors: CustomTheme["colors"]) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
      padding: 20,
      justifyContent: "center",
    },
    title: {
      fontSize: 24,
      fontWeight: "bold",
      color: colors.text,
      marginBottom: 24,
      textAlign: "center",
    },
    input: {
      backgroundColor: colors.surface,
      color: colors.text,
      borderColor: colors.outline,
      borderWidth: 1,
      borderRadius: 8,
      paddingHorizontal: 12,
      paddingVertical: 10,
      marginBottom: 16,
    },
    errorInput: {
      borderColor: colors.error,
    },
    errorText: {
      color: colors.error,
      fontSize: 12,
      marginBottom: 8,
    },
    errorBox: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: colors.error + "20",
      padding: 10,
      borderRadius: 8,
      marginBottom: 12,
      gap: 8,
    },
    button: {
      backgroundColor: colors.primary,
      paddingVertical: 12,
      borderRadius: 8,
      alignItems: "center",
      marginTop: 12,
    },
    buttonText: {
      color: colors.background,
      fontWeight: "600",
      fontSize: 16,
    },
    footerContainer: {
      flexDirection: "row",
      justifyContent: "center",
      marginTop: 16,
    },
    footerText: {
      color: colors.textLight,
      fontSize: 16,
    },
    linkText: {
      marginLeft: 4,
      color: colors.primary,
      fontWeight: "500",
      fontSize: 16,
    },
  });
