import { supabase } from "@/lib/supabase";
import { signInSchema } from "@/schemas/Auth.schema";
import { CustomTheme, useAppTheme } from "@/theme/paperTheme";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "expo-router";
import React from "react";
import { useForm } from "react-hook-form";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useToast } from "react-native-toast-notifications";
import { z } from "zod";

type SignInFormData = z.infer<typeof signInSchema>;

export default function Login() {
  const toast = useToast();
  const { colors } = useAppTheme();
  const styles = createStyles(colors);

  const {
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<SignInFormData>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: SignInFormData) => {
    const { error } = await supabase.auth.signInWithPassword({
      email: data.email,
      password: data.password,
    });

    if (error) {
      toast.show(error.message ?? "Login Failed", {
        type: "error",
      });
      return;
    }

    toast.show("You are now logged in!", {
      type: "success",
    });
  };

  return (
    <KeyboardAwareScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      enableOnAndroid
      extraScrollHeight={30}
    >
      <View style={styles.container}>
        <Text style={[styles.title, { color: colors.text }]}>Welcome Back</Text>

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

        {/* Login Button */}
        <TouchableOpacity
          style={styles.button}
          onPress={handleSubmit(onSubmit)}
        >
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>

        {/* Footer */}
        <View style={styles.footerContainer}>
          <Text style={styles.footerText}>Don&apos;t have an account?</Text>
          <Link href="profile/sign-up" asChild>
            <TouchableOpacity>
              <Text style={styles.linkText}>Sign up</Text>
            </TouchableOpacity>
          </Link>
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
