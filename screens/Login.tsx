import * as React from "react";
import { StyleSheet, View, Text, TextInput, Pressable, Alert, ActivityIndicator, Modal, Platform, KeyboardAvoidingView } from "react-native";
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
import * as WebBrowser from "expo-web-browser";
import { makeRedirectUri } from "expo-auth-session";
import * as Google from "expo-auth-session/providers/google";
import Constants from "expo-constants";
import { registerUser, loginUser, loginWithGoogle, sendPhoneOtp, verifyPhoneOtp } from "../services/api";
import { useAuth } from "../context/AuthContext";
import { useAppTheme as useAppTheme } from "../context/ThemeContext";

WebBrowser.maybeCompleteAuthSession();

const Login = () => {
  const navigation = useNavigation<any>();
  const insets = useSafeAreaInsets();
  const { setUser } = useAuth();
  const { themeColors } = useAppTheme();

  const [agreed, setAgreed] = React.useState(false);
  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [isLoginMode, setIsLoginMode] = React.useState(false);

  // --- Form state ---
  const [fullName, setFullName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");

  const isExpoGo =
    Constants.appOwnership === "expo" ||
    Constants.executionEnvironment === "storeClient";

  // --- Google OAuth Hook ---
  // Google OAuth only works on web in Expo Go (SDK 54+).
  // On mobile, the auth proxy was removed and Google rejects exp:// redirect URIs.
  const isWeb = Platform.OS === 'web';

  const [request, response, promptAsync] = Google.useAuthRequest({
    webClientId:
      "998727045283-sa05gb0ml7jk0urbr6hdmckbhel6e34h.apps.googleusercontent.com",
    androidClientId:
      "998727045283-lrue57b5edadk28q79mb3m67ub622joo.apps.googleusercontent.com",
    redirectUri: makeRedirectUri({ scheme: 'smart-bus' }),
  });

  React.useEffect(() => {
    if (response?.type === "success") {
      const { authentication } = response;
      if (authentication?.idToken) {
        handleGoogleLoginComplete(authentication.idToken);
      } else if (authentication?.accessToken) {
        handleGoogleLoginWithAccessToken(authentication.accessToken);
      }
    }
  }, [response]);

  const handleGoogleLoginComplete = async (idToken: string) => {
    setLoading(true);
    try {
      const data = await loginWithGoogle(idToken);
      setUser(data);
      navigation.replace("Home");
    } catch (error: any) {
      Alert.alert("Google Login Failed", error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLoginWithAccessToken = async (accessToken: string) => {
    setLoading(true);
    try {
      const res = await fetch("https://www.googleapis.com/userinfo/v2/me", {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      const userInfo = await res.json();
      const data = await loginWithGoogle(accessToken, true);
      setUser(data);
      navigation.replace("Home");
    } catch (error: any) {
      Alert.alert("Google Login Failed", error.message);
    } finally {
      setLoading(false);
    }
  };

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

  const handleGooglePress = () => {
    // We can now allow Google Sign in on Mobile because we are building a standalone APK
    if (!request) {
      Alert.alert("Wait", "Google Auth is still loading...");
      return;
    }

    promptAsync();
  };

  // --- Phone OTP state ---
  const [showPhoneModal, setShowPhoneModal] = React.useState(false);
  const [phoneInput, setPhoneInput] = React.useState("");
  const [otpInput, setOtpInput] = React.useState("");
  const [otpSent, setOtpSent] = React.useState(false);
  const [demoOtp, setDemoOtp] = React.useState("");
  const [phoneLoading, setPhoneLoading] = React.useState(false);

  const handleSendOtp = async () => {
    if (!phoneInput || phoneInput.length < 10) {
      Alert.alert("Error", "Please enter a valid phone number");
      return;
    }
    setPhoneLoading(true);
    try {
      const result = await sendPhoneOtp(phoneInput);
      setOtpSent(true);

      if (result.sms_sent) {
        // Real SMS was sent
        setDemoOtp("");
        Alert.alert("OTP Sent! ✅", "A 6-digit verification code has been sent to your phone via SMS.");
      } else if (result.demo_otp) {
        // Demo mode — show OTP in banner
        setDemoOtp(result.demo_otp);
        Alert.alert("OTP Sent (Demo)", "Demo OTP: " + result.demo_otp + "\n\nEnter this code below.");
      }
    } catch (error: any) {
      Alert.alert("Error", error.message);
    } finally {
      setPhoneLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    if (!otpInput || otpInput.length !== 6) {
      Alert.alert("Error", "Please enter the 6-digit OTP");
      return;
    }
    setPhoneLoading(true);
    try {
      const data = await verifyPhoneOtp(phoneInput, otpInput);
      setUser(data);
      setShowPhoneModal(false);
      
      if (!data.isProfileComplete) {
        navigation.replace("CompleteProfile");
      } else {
        navigation.replace("Home");
      }
    } catch (error: any) {
      Alert.alert("Verification Failed", error.message);
    } finally {
      setPhoneLoading(false);
    }
  };

  const handleSocialLogin = (provider: string) => () => {
    if (provider === "Google") {
      handleGooglePress();
      return;
    }
    if (provider === "Phone") {
      // Reset phone modal state and open it
      setPhoneInput("");
      setOtpInput("");
      setOtpSent(false);
      setDemoOtp("");
      setShowPhoneModal(true);
      return;
    }
    Alert.alert("Coming Soon!", provider + " sign in is not supported yet.");
  };

  return (
    <View style={[styles.container, { backgroundColor: themeColors.background }]}> 
      {/* Header */}
      <View style={[styles.header, { paddingTop: Math.max(insets.top, 16), backgroundColor: themeColors.headerBg }]}> 
        <Pressable onPress={() => { }}>
          <Image
            style={[styles.headerIcon, { tintColor: themeColors.icon }]}
            contentFit="contain"
            source={require("../assets/image-21.png")}
          />
        </Pressable>
        <Text style={[styles.headerTitle, { color: themeColors.text }]}>Smart Bus</Text>
        <Pressable onPress={() => { }}>
          <Image
            style={[styles.headerIcon, { tintColor: themeColors.icon }]}
            contentFit="contain"
            source={require("../assets/image-3.png")}
          />
        </Pressable>
      </View>

      {/* Divider */}
      <View style={[styles.headerDivider, { backgroundColor: themeColors.divider }]} />

      <KeyboardAwareScrollView
        style={{ flex: 1 }}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        enableOnAndroid={true}
      >
        <Text style={[styles.pageTitle, { color: themeColors.text }]}> 
          {isLoginMode ? "Welcome Back" : "Create Your Account"}
        </Text>

        {/* Full Name (sign up only) */}
        {!isLoginMode && (
          <View style={[styles.inputCard, { backgroundColor: themeColors.cardBackground, borderColor: themeColors.divider }]}> 
            <Text style={[styles.inputLabel, { color: themeColors.text }]}>Full Name</Text>
            <TextInput
              style={[styles.inputField, { color: themeColors.text }]}
              placeholder="e.g., John Doe"
              placeholderTextColor={themeColors.subText}
              value={fullName}
              onChangeText={setFullName}
            />
          </View>
        )}

        {/* Email Address */}
        <View style={[styles.inputCard, { backgroundColor: themeColors.cardBackground, borderColor: themeColors.divider }]}> 
          <Text style={[styles.inputLabel, { color: themeColors.text }]}>Email Address</Text>
          <TextInput
            style={[styles.inputField, { color: themeColors.text }]}
            placeholder="e.g., john.doe@email.com"
            placeholderTextColor={themeColors.subText}
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail}
          />
        </View>

        {/* Phone Number (sign up only) */}
        {!isLoginMode && (
          <View style={[styles.inputCard, { backgroundColor: themeColors.cardBackground, borderColor: themeColors.divider }]}> 
            <Text style={[styles.inputLabel, { color: themeColors.text }]}>Phone Number</Text>
            <TextInput
              style={[styles.inputField, { color: themeColors.text }]}
              placeholder="e.g., +1 555-0199"
              placeholderTextColor={themeColors.subText}
              keyboardType="phone-pad"
              value={phone}
              onChangeText={setPhone}
            />
          </View>
        )}

        {/* Password */}
        <View style={[styles.inputCard, { backgroundColor: themeColors.cardBackground, borderColor: themeColors.divider }]}> 
          <Text style={[styles.inputLabel, { color: themeColors.text }]}>Password</Text>
          <View style={styles.passwordRow}>
            <TextInput
              style={[styles.inputField, { flex: 1, color: themeColors.text }]}
              placeholder="••••••••"
              placeholderTextColor={themeColors.subText}
              secureTextEntry={!showPassword}
              value={password}
              onChangeText={setPassword}
            />
            <Pressable onPress={() => setShowPassword(!showPassword)} style={styles.eyeIcon}>
              <Ionicons
                name={showPassword ? "eye-outline" : "eye-off-outline"}
                size={22}
                color={themeColors.subText}
              />
            </Pressable>
          </View>
        </View>

        {/* Confirm Password (sign up only) */}
        {!isLoginMode && (
          <View style={[styles.inputCard, { backgroundColor: themeColors.cardBackground, borderColor: themeColors.divider }]}> 
            <Text style={[styles.inputLabel, { color: themeColors.text }]}>Confirm Password</Text>
            <View style={styles.passwordRow}>
              <TextInput
                style={[styles.inputField, { flex: 1, color: themeColors.text }]}
                placeholder="••••••••"
                placeholderTextColor={themeColors.subText}
                secureTextEntry={!showConfirmPassword}
                value={confirmPassword}
                onChangeText={setConfirmPassword}
              />
              <Pressable onPress={() => setShowConfirmPassword(!showConfirmPassword)} style={styles.eyeIcon}>
                <Ionicons
                  name={showConfirmPassword ? "eye-outline" : "eye-off-outline"}
                  size={22}
                  color={themeColors.subText}
                />
              </Pressable>
            </View>
          </View>
        )}

        {/* Terms Checkbox (sign up only) */}
        {!isLoginMode && (
          <Pressable style={styles.checkboxRow} onPress={() => setAgreed(!agreed)}>
            <View style={[styles.checkbox, agreed && styles.checkboxChecked, { borderColor: themeColors.primary, backgroundColor: agreed ? themeColors.primary : themeColors.cardBackground }]}>
              {agreed && <Feather name="check" size={14} color={Color.colorWhite} />}
            </View>
            <Text style={[styles.termsText, { color: themeColors.text }]}> 
              I agree to the <Text style={[styles.termsLink, { color: themeColors.primary }]}>Terms of Service</Text> &{" "}
              <Text style={[styles.termsLink, { color: themeColors.primary }]}>Privacy Policy</Text>
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
            <ActivityIndicator color={Color.colorWhite} size="small" />
          ) : (
            <Text style={styles.signUpButtonText}>
              {isLoginMode ? "Log In" : "Sign Up"}
            </Text>
          )}
        </Pressable>

        {/* Or sign up with */}
        <Text style={[styles.orText, { color: themeColors.subText }]}> 
          Or {isLoginMode ? "log in" : "sign up"} with:
        </Text>
        <View style={styles.socialRow}>
          <Pressable style={[styles.socialCircle, { backgroundColor: themeColors.cardBackground, borderColor: themeColors.divider }]} onPress={handleSocialLogin("Google")}>
            <Text style={styles.googleG}>G</Text>
          </Pressable>
          <Pressable style={[styles.socialCircle, { backgroundColor: themeColors.cardBackground, borderColor: themeColors.divider }]} onPress={handleSocialLogin("Phone")}>
            <Feather name="phone" size={20} color={themeColors.text} />
          </Pressable>
        </View>

        {/* Toggle login/signup */}
        <View style={styles.loginRow}>
          <Text style={[styles.alreadyText, { color: themeColors.text }]}> 
            {isLoginMode ? "Don't have an account? " : "Already have an account? "}
          </Text>
          <Pressable onPress={() => setIsLoginMode(!isLoginMode)}>
            <Text style={[styles.loginLink, { color: themeColors.primary }]}> 
              {isLoginMode ? "Sign Up" : "Log In"}
            </Text>
          </Pressable>
        </View>
      </KeyboardAwareScrollView>

      <FrameComponent2 />

      {/* Phone OTP Modal */}
      <Modal
        visible={showPhoneModal}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowPhoneModal(false)}
      >
        <KeyboardAvoidingView 
          style={styles.modalOverlay}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <View style={[styles.modalCard, { backgroundColor: themeColors.cardBackground }]}> 
            <View style={styles.modalHeader}>
              <Text style={[styles.modalTitle, { color: themeColors.text }]}> 
                {otpSent ? "Enter OTP" : "Phone Login"}
              </Text>
              <Pressable onPress={() => setShowPhoneModal(false)}>
                <Feather name="x" size={26} color={themeColors.text} />
              </Pressable>
            </View>

            {!otpSent ? (
              <>
                <Text style={[styles.modalSubtitle, { color: themeColors.subText }]}> 
                  Enter your phone number to receive a verification code
                </Text>
                <View style={[styles.modalInputCard, { backgroundColor: themeColors.elevatedBackground, borderColor: themeColors.divider }]}> 
                  <Text style={[styles.inputLabel, { color: themeColors.text }]}>Phone Number</Text>
                  <TextInput
                    style={[styles.inputField, { color: themeColors.text }]}
                    placeholder="e.g., 8793091663"
                    placeholderTextColor={themeColors.subText}
                    keyboardType="phone-pad"
                    value={phoneInput}
                    onChangeText={setPhoneInput}
                    maxLength={15}
                  />
                </View>
                <Pressable
                  style={[styles.signUpButton, phoneLoading && styles.buttonDisabled]}
                  onPress={handleSendOtp}
                  disabled={phoneLoading}
                >
                  {phoneLoading ? (
                    <ActivityIndicator color={Color.colorWhite} size="small" />
                  ) : (
                    <Text style={styles.signUpButtonText}>Send OTP</Text>
                  )}
                </Pressable>
              </>
            ) : (
              <>
                <Text style={[styles.modalSubtitle, { color: themeColors.subText }]}> 
                  We sent a 6-digit code to {phoneInput}
                </Text>
                {demoOtp ? (
                  <View style={[styles.demoOtpBanner, { backgroundColor: themeColors.elevatedBackground }]}> 
                    <Feather name="info" size={16} color={themeColors.primary} />
                    <Text style={[styles.demoOtpText, { color: themeColors.primary }]}>Demo OTP: {demoOtp}</Text>
                  </View>
                ) : null}
                <View style={[styles.modalInputCard, { backgroundColor: themeColors.elevatedBackground, borderColor: themeColors.divider }]}> 
                  <Text style={[styles.inputLabel, { color: themeColors.text }]}>Verification Code</Text>
                  <TextInput
                    style={[styles.inputField, styles.otpField, { color: themeColors.text }]}
                    placeholder="000000"
                    placeholderTextColor={themeColors.subText}
                    keyboardType="number-pad"
                    value={otpInput}
                    onChangeText={setOtpInput}
                    maxLength={6}
                  />
                </View>
                <Pressable
                  style={[styles.signUpButton, phoneLoading && styles.buttonDisabled]}
                  onPress={handleVerifyOtp}
                  disabled={phoneLoading}
                >
                  {phoneLoading ? (
                    <ActivityIndicator color={Color.colorWhite} size="small" />
                  ) : (
                    <Text style={styles.signUpButtonText}>Verify & Login</Text>
                  )}
                </Pressable>
                <Pressable onPress={() => { setOtpSent(false); setOtpInput(""); }} style={styles.resendRow}>
                  <Text style={[styles.resendText, { color: themeColors.subText }]}>Didn't receive? <Text style={[styles.resendLink, { color: themeColors.primary }]}>Resend OTP</Text></Text>
                </Pressable>
              </>
            )}
          </View>
        </KeyboardAvoidingView>
      </Modal>
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
  // --- Phone OTP Modal Styles ---
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "flex-end",
  },
  modalCard: {
    backgroundColor: Color.colorWhite,
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 40,
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: "900",
    fontFamily: FontFamily.poppins,
    color: Color.colorBlack,
  },
  modalSubtitle: {
    fontSize: 14,
    fontFamily: FontFamily.inter,
    color: "#666",
    marginBottom: 20,
    lineHeight: 20,
  },
  modalInputCard: {
    backgroundColor: Color.colorGainsboro || "#F0F2F5",
    borderRadius: Border.br_16,
    borderWidth: 1.5,
    borderColor: Color.colorBlack,
    paddingHorizontal: 18,
    paddingTop: 12,
    paddingBottom: 14,
    marginBottom: 20,
  },
  otpField: {
    fontSize: 28,
    letterSpacing: 12,
    textAlign: "center",
    fontWeight: "700",
  },
  demoOtpBanner: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#EBF5FF",
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 10,
    marginBottom: 16,
    gap: 8,
  },
  demoOtpText: {
    fontSize: 14,
    fontFamily: FontFamily.inter,
    fontWeight: "700",
    color: "#2563EB",
  },
  resendRow: {
    alignItems: "center",
    marginTop: 16,
  },
  resendText: {
    fontSize: 14,
    fontFamily: FontFamily.inter,
    color: "#666",
  },
  resendLink: {
    fontWeight: "700",
    color: Color.colorRoyalblue,
    textDecorationLine: "underline",
  },
});

export default Login;
