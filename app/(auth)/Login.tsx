import { styles } from "@/assets/styles/Auth.styles";
import { supabase } from "@/lib/supabase";
import { signInSchema } from "@/schemas/Auth.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "expo-router";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Alert, Text, TextInput, TouchableOpacity, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { z } from "zod";

// Types
type SignInFormData = z.infer<typeof signInSchema>;

export default function Login() {
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState<"email" | "otp">("email");

  const {
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm<SignInFormData>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      emailAddress: "",
    },
  });

  const onSubmit = async (data: SignInFormData) => {
    const { error } = await supabase.auth.signInWithOtp({
      email: data.emailAddress,
      options: {
        shouldCreateUser: true,
      },
    });

    if (error) {
      Alert.alert("Error", error.message);
      return;
    }

    Alert.alert("OTP Sent", "Check your email inbox.");
    setStep("otp");
  };

  const verifyOtp = async () => {
    const { data, error } = await supabase.auth.verifyOtp({
      email: getValues("emailAddress"),
      token: otp,
      type: "email",
    });

    if (error) {
      Alert.alert("Login Failed", error.message);
      return;
    }

    Alert.alert("Success", "You are now logged in!");
    // redirect or proceed to home screen
  };

  return (
    <KeyboardAwareScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      enableOnAndroid
      extraScrollHeight={30}
    >
      <View style={styles.container}>
        <Text style={styles.title}>Welcome Back</Text>

        {step === "email" ? (
          <>
            <TextInput
              style={[styles.input, errors.emailAddress && styles.errorInput]}
              placeholder="Enter your email"
              placeholderTextColor="#9A8478"
              autoCapitalize="none"
              keyboardType="email-address"
              onChangeText={(text) => setValue("emailAddress", text)}
            />
            {errors.emailAddress && (
              <Text style={styles.errorText}>
                {errors.emailAddress.message}
              </Text>
            )}

            <TouchableOpacity
              style={styles.button}
              onPress={handleSubmit(onSubmit)}
            >
              <Text style={styles.buttonText}>Send OTP</Text>
            </TouchableOpacity>
          </>
        ) : (
          <>
            <TextInput
              style={styles.input}
              placeholder="Enter the 6-digit OTP"
              placeholderTextColor="#9A8478"
              keyboardType="number-pad"
              value={otp}
              onChangeText={setOtp}
            />

            <TouchableOpacity style={styles.button} onPress={verifyOtp}>
              <Text style={styles.buttonText}>Verify OTP</Text>
            </TouchableOpacity>
          </>
        )}

        <View style={styles.footerContainer}>
          <Text style={styles.footerText}>Don&apos;t have an account?</Text>
          <Link href="/sign-up" asChild>
            <TouchableOpacity>
              <Text style={styles.linkText}>Sign up</Text>
            </TouchableOpacity>
          </Link>
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
}
