import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";

import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import { styles } from "@/assets/styles/Auth.styles";
import { COLORS } from "@/constants/colors";
import { signUpSchema, verifyCodeSchema } from "@/schemas/Auth.schema";
import { useState } from "react";

type SignUpData = z.infer<typeof signUpSchema>;
type VerifyData = z.infer<typeof verifyCodeSchema>;

export default function SignUpScreen() {
  const router = useRouter();
  const [pendingVerification, setPendingVerification] = useState(false);
  const [error, setError] = useState("");

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpData>({
    resolver: zodResolver(signUpSchema),
  });

  const {
    control: verifyControl,
    handleSubmit: handleVerify,
    formState: { errors: verifyErrors },
  } = useForm<VerifyData>({
    resolver: zodResolver(verifyCodeSchema),
  });

  const onSignUpPress = async (data: SignUpData) => {};

  const onVerifyPress = async (data: VerifyData) => {};

  if (pendingVerification) {
    return (
      <View style={styles.verificationContainer}>
        <Text style={styles.verificationTitle}>Verify your email</Text>

        {error ? (
          <View style={styles.errorBox}>
            <Ionicons name="alert-circle" size={20} color={COLORS.expense} />
            <Text style={styles.errorText}>{error}</Text>
            <TouchableOpacity onPress={() => setError("")}>
              <Ionicons name="close" size={20} color={COLORS.textLight} />
            </TouchableOpacity>
          </View>
        ) : null}

        <Controller
          control={verifyControl}
          name="code"
          render={({ field: { onChange, value } }) => (
            <TextInput
              style={[
                styles.verificationInput,
                verifyErrors.code && styles.errorInput,
              ]}
              placeholder="Enter your verification code"
              placeholderTextColor="#9A8478"
              value={value}
              onChangeText={onChange}
            />
          )}
        />
        {verifyErrors.code && (
          <Text style={styles.errorText}>{verifyErrors.code.message}</Text>
        )}

        <TouchableOpacity
          onPress={handleVerify(onVerifyPress)}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Verify</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <KeyboardAwareScrollView
      style={{ flex: 1 }}
      contentContainerStyle={{ flexGrow: 1 }}
      enableOnAndroid
      enableAutomaticScroll
    >
      <View style={styles.container}>
        {/* <Image
          source={require("../../assets/images/revenue-i2.png")}
          style={styles.illustration}
        /> */}

        <Text style={styles.title}>Create Account</Text>

        {error ? (
          <View style={styles.errorBox}>
            <Ionicons name="alert-circle" size={20} color={COLORS.expense} />
            <Text style={styles.errorText}>{error}</Text>
            <TouchableOpacity onPress={() => setError("")}>
              <Ionicons name="close" size={20} color={COLORS.textLight} />
            </TouchableOpacity>
          </View>
        ) : null}

        <Controller
          control={control}
          name="emailAddress"
          render={({ field: { onChange, value } }) => (
            <TextInput
              style={[styles.input, errors.emailAddress && styles.errorInput]}
              placeholder="Enter email"
              autoCapitalize="none"
              placeholderTextColor="#9A8478"
              value={value}
              onChangeText={onChange}
            />
          )}
        />
        {errors.emailAddress && (
          <Text style={styles.errorText}>{errors.emailAddress.message}</Text>
        )}

        <Controller
          control={control}
          name="password"
          render={({ field: { onChange, value } }) => (
            <TextInput
              style={[styles.input, errors.password && styles.errorInput]}
              placeholder="Enter password"
              placeholderTextColor="#9A8478"
              secureTextEntry
              value={value}
              onChangeText={onChange}
            />
          )}
        />
        {errors.password && (
          <Text style={styles.errorText}>{errors.password.message}</Text>
        )}

        <TouchableOpacity
          style={styles.button}
          onPress={handleSubmit(onSignUpPress)}
        >
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>

        <View style={styles.footerContainer}>
          <Text style={styles.footerText}>Already have an account?</Text>
          <TouchableOpacity onPress={() => router.back()}>
            <Text style={styles.linkText}>Sign in</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
}
