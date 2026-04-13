import * as React from "react";
import { StyleSheet, View, Text, TextInput, Pressable, Alert, ActivityIndicator } from "react-native";
import { Image } from "expo-image";
import { useNavigation } from "@react-navigation/native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import FrameComponent2 from "../components/FrameComponent2";
import {
  Color,
  Border,
  FontFamily,
  FontSize,
} from "../GlobalStyles";
import { Feather, FontAwesome, Ionicons } from "@expo/vector-icons";
import { registerUser, loginUser } from "../services/api";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const navigation = useNavigation<any>();
  const insets = useSafeAreaInsets();
  const { setUser } = useAuth();

  const [agreed, setAgreed] = React.useState(false);
  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [isLoginMode, setIsLoginMode] = React.useState(false);

  // Form state
  const [fullName, setFullName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");

  const handleSignUp = async () => {
    if (!fullName || !email || !phone || !password || !confirmPassword) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match");
      return;
    }
    if (!agreed) {
      Alert.alert("Error", "Please agree to the Terms of Service");
      return;
    }

    setLoading(true);
    try {
      const data = await registerUser(fullName, email, phone, password);
      setUser(data);
      navigation.replace("Home");
    } catch (error: any) {
      Alert.alert("Registration Failed", error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Please enter email and password");
      return;
    }

    setLoading(true);
    try {
      const data = await loginUser(email, password);
      setUser(data);
      navigation.replace("Home");
    } catch (error: any) {
      Alert.alert("Login Failed", error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSocialLogin = (provider: string) => () => {
    // Simulated Social Login
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setUser({ id: "social_mock", fullName: `${provider} User`, email: `user@${provider.toLowerCase()}.com`, token: "mock_token" });
      navigation.replace("Home");
    }, 1000);
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={[styles.header, { paddingTop: Math.max(insets.top, 16) }]}>
        <Pressable onPress={() => {}}>
          <Image
            style={styles.headerIcon}
            contentFit="contain"
            source={require("../assets/image-21.png")}
          />
        </Pressable>
        <Text style={styles.headerTitle}>Smart Bus</Text>
        <Pressable onPress={() => {}}>
          <Image
            style={styles.headerIcon}
            contentFit="contain"
            source={require("../assets/image-3.png")}
          />
        </Pressable>
      </View>

      {/* Divider */}
      <View style={styles.headerDivider} />

      <KeyboardAwareScrollView
        style={{ flex: 1 }}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        enableOnAndroid={true}
      >
        <Text style={styles.pageTitle}>
          {isLoginMode ? "Welcome Back" : "Create Your Account"}
        </Text>

        {/* Full Name (sign up only) */}
        {!isLoginMode && (
          <View style={styles.inputCard}>
            <Text style={styles.inputLabel}>Full Name</Text>
            <TextInput
              style={styles.inputField}
              placeholder="e.g., John Doe"
              placeholderTextColor="#999"
              value={fullName}
              onChangeText={setFullName}
            />
          </View>
        )}

        {/* Email Address */}
        <View style={styles.inputCard}>
          <Text style={styles.inputLabel}>Email Address</Text>
          <TextInput
            style={styles.inputField}
            placeholder="e.g., john.doe@email.com"
            placeholderTextColor="#999"
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail}
          />
        </View>

        {/* Phone Number (sign up only) */}
        {!isLoginMode && (
          <View style={styles.inputCard}>
            <Text style={styles.inputLabel}>Phone Number</Text>
            <TextInput
              style={styles.inputField}
              placeholder="e.g., +1 555-0199"
              placeholderTextColor="#999"
              keyboardType="phone-pad"
              value={phone}
              onChangeText={setPhone}
            />
          </View>
        )}

        {/* Password */}
        <View style={styles.inputCard}>
          <Text style={styles.inputLabel}>Password</Text>
          <View style={styles.passwordRow}>
            <TextInput
              style={[styles.inputField, { flex: 1 }]}
              placeholder="••••••••"
              placeholderTextColor="#999"
              secureTextEntry={!showPassword}
              value={password}
              onChangeText={setPassword}
            />
            <Pressable onPress={() => setShowPassword(!showPassword)} style={styles.eyeIcon}>
              <Ionicons
                name={showPassword ? "eye-outline" : "eye-off-outline"}
                size={22}
                color="#888"
              />
            </Pressable>
          </View>
        </View>

        {/* Confirm Password (sign up only) */}
        {!isLoginMode && (
          <View style={styles.inputCard}>
            <Text style={styles.inputLabel}>Confirm Password</Text>
            <View style={styles.passwordRow}>
              <TextInput
                style={[styles.inputField, { flex: 1 }]}
                placeholder="••••••••"
                placeholderTextColor="#999"
                secureTextEntry={!showConfirmPassword}
                value={confirmPassword}
                onChangeText={setConfirmPassword}
              />
              <Pressable onPress={() => setShowConfirmPassword(!showConfirmPassword)} style={styles.eyeIcon}>
                <Ionicons
                  name={showConfirmPassword ? "eye-outline" : "eye-off-outline"}
                  size={22}
                  color="#888"
                />
              </Pressable>
            </View>
          </View>
        )}

        {/* Terms Checkbox (sign up only) */}
        {!isLoginMode && (
          <Pressable style={styles.checkboxRow} onPress={() => setAgreed(!agreed)}>
            <View style={[styles.checkbox, agreed && styles.checkboxChecked]}>
              {agreed && <Feather name="check" size={14} color="white" />}
            </View>
            <Text style={styles.termsText}>
              I agree to the <Text style={styles.termsLink}>Terms of Service</Text> &{" "}
              <Text style={styles.termsLink}>Privacy Policy</Text>
            </Text>
          </Pressable>
        )}

        {/* Sign Up / Login Button */}
        <Pressable
          style={[styles.signUpButton, loading && styles.buttonDisabled]}
          onPress={isLoginMode ? handleLogin : handleSignUp}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="white" size="small" />
          ) : (
            <Text style={styles.signUpButtonText}>
              {isLoginMode ? "Log In" : "Sign Up"}
            </Text>
          )}
        </Pressable>

        {/* Or sign up with */}
        <Text style={styles.orText}>
          Or {isLoginMode ? "log in" : "sign up"} with:
        </Text>
        <View style={styles.socialRow}>
          <Pressable style={styles.socialCircle} onPress={handleSocialLogin("Google")}>
            <Text style={styles.googleG}>G</Text>
          </Pressable>
          <Pressable style={styles.socialCircle} onPress={handleSocialLogin("Phone")}>
            <Feather name="phone" size={20} color="black" />
          </Pressable>
        </View>

        {/* Toggle login/signup */}
        <View style={styles.loginRow}>
          <Text style={styles.alreadyText}>
            {isLoginMode ? "Don't have an account? " : "Already have an account? "}
          </Text>
          <Pressable onPress={() => setIsLoginMode(!isLoginMode)}>
            <Text style={styles.loginLink}>
              {isLoginMode ? "Sign Up" : "Log In"}
            </Text>
          </Pressable>
        </View>
      </KeyboardAwareScrollView>

      <FrameComponent2 />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.colorGainsboro,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingBottom: 16,
    backgroundColor: Color.colorGainsboro,
  },
  headerIcon: {
    width: 28,
    height: 28,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "900",
    color: Color.colorBlack,
    fontFamily: FontFamily.poppins,
  },
  headerDivider: {
    height: 1.5,
    backgroundColor: Color.colorBlack,
    opacity: 0.15,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 30,
  },
  pageTitle: {
    fontSize: 26,
    fontWeight: "900",
    fontFamily: FontFamily.poppins,
    color: Color.colorBlack,
    marginBottom: 20,
  },
  inputCard: {
    backgroundColor: Color.colorWhite,
    borderRadius: Border.br_16,
    borderWidth: 1.5,
    borderColor: Color.colorBlack,
    paddingHorizontal: 18,
    paddingTop: 12,
    paddingBottom: 14,
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: "900",
    fontFamily: FontFamily.poppins,
    color: Color.colorBlack,
    marginBottom: 4,
  },
  inputField: {
    fontSize: 15,
    fontFamily: FontFamily.inter,
    color: Color.colorBlack,
    paddingVertical: 2,
  },
  passwordRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  eyeIcon: {
    paddingLeft: 8,
  },
  checkboxRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 4,
    marginBottom: 20,
  },
  checkbox: {
    width: 22,
    height: 22,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: Color.colorBlack,
    marginRight: 12,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Color.colorWhite,
  },
  checkboxChecked: {
    backgroundColor: Color.colorRoyalblue,
    borderColor: Color.colorRoyalblue,
  },
  termsText: {
    fontSize: 13,
    fontFamily: FontFamily.inter,
    color: Color.colorBlack,
    flex: 1,
  },
  termsLink: {
    fontWeight: "700",
    textDecorationLine: "underline",
  },
  signUpButton: {
    backgroundColor: Color.colorRoyalblue,
    borderRadius: Border.br_12,
    paddingVertical: 15,
    alignItems: "center",
    borderWidth: 1.5,
    borderColor: Color.colorBlack,
    marginBottom: 20,
  },
  buttonDisabled: {
    opacity: 0.7,
  },
  signUpButtonText: {
    color: Color.colorWhite,
    fontSize: 20,
    fontFamily: FontFamily.poppins,
    fontWeight: "900",
  },
  orText: {
    textAlign: "center",
    fontSize: 14,
    fontFamily: FontFamily.inter,
    color: "#666",
    marginBottom: 14,
  },
  socialRow: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 20,
    marginBottom: 20,
  },
  socialCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    borderWidth: 1.5,
    borderColor: Color.colorBlack,
    backgroundColor: Color.colorWhite,
    alignItems: "center",
    justifyContent: "center",
  },
  googleG: {
    fontSize: 22,
    fontWeight: "700",
    color: "#4285F4",
  },
  loginRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  alreadyText: {
    fontSize: 14,
    fontFamily: FontFamily.inter,
    color: Color.colorBlack,
  },
  loginLink: {
    fontSize: 14,
    fontFamily: FontFamily.inter,
    fontWeight: "700",
    color: Color.colorRoyalblue,
    textDecorationLine: "underline",
  },
});

export default Login;
