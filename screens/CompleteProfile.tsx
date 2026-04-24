import * as React from "react";
import { StyleSheet, View, Text, TextInput, Pressable, Alert, ActivityIndicator, KeyboardAvoidingView, Platform, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Picker } from "@react-native-picker/picker";
import { Feather } from "@expo/vector-icons";
import { Color, Border, FontFamily } from "../GlobalStyles";
import { updateProfile } from "../services/api";
import { useAuth } from "../context/AuthContext";
import AsyncStorage from "@react-native-async-storage/async-storage";

const CompleteProfile = () => {
  const navigation = useNavigation<any>();
  const insets = useSafeAreaInsets();
  const { user, setUser } = useAuth();

  const [loading, setLoading] = React.useState(false);
  
  const [fullName, setFullName] = React.useState(user?.fullName === "Phone User" ? "" : (user?.fullName || ""));
  const [email, setEmail] = React.useState(user?.email || "");
  const [gender, setGender] = React.useState(user?.gender || "");
  const [location, setLocation] = React.useState(user?.location || "");

  const handleSubmit = async () => {
    if (!fullName || !email || !gender || !location) {
      Alert.alert("Missing Fields", "Please fill out all fields to continue.");
      return;
    }

    setLoading(true);
    try {
      const updatedUser = await updateProfile({
        fullName,
        email,
        gender,
        location,
        isProfileComplete: true,
      });
      
      // Update local state and storage
      setUser(updatedUser);
      await AsyncStorage.setItem("user", JSON.stringify(updatedUser));
      
      Alert.alert("Success", "Profile completed successfully!");
      navigation.replace("Home");
    } catch (error: any) {
      Alert.alert("Update Failed", error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView 
      style={styles.container} 
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView 
        contentContainerStyle={[styles.scrollContent, { paddingTop: Math.max(insets.top, 20) + 20 }]}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.pageTitle}>Complete Your Profile</Text>
        <Text style={styles.pageSubtitle}>
          Just a few more details to get you started with Smart Bus.
        </Text>

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

        <View style={styles.inputCard}>
          <Text style={styles.inputLabel}>Email Address</Text>
          <TextInput
            style={styles.inputField}
            placeholder="e.g., john@example.com"
            placeholderTextColor="#999"
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail}
          />
        </View>

        <View style={styles.inputCard}>
          <Text style={styles.inputLabel}>Gender</Text>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={gender}
              onValueChange={(itemValue) => setGender(itemValue)}
              style={styles.picker}
            >
              <Picker.Item label="Select Gender" value="" color="#999" />
              <Picker.Item label="Male" value="Male" />
              <Picker.Item label="Female" value="Female" />
              <Picker.Item label="Other" value="Other" />
              <Picker.Item label="Prefer not to say" value="Prefer not to say" />
            </Picker>
          </View>
        </View>

        <View style={styles.inputCard}>
          <Text style={styles.inputLabel}>Location (City)</Text>
          <TextInput
            style={styles.inputField}
            placeholder="e.g., Pune"
            placeholderTextColor="#999"
            value={location}
            onChangeText={setLocation}
          />
        </View>

        <Pressable
          style={[styles.submitButton, loading && styles.buttonDisabled]}
          onPress={handleSubmit}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="white" size="small" />
          ) : (
            <Text style={styles.submitButtonText}>Save & Continue</Text>
          )}
        </Pressable>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.colorGainsboro,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  pageTitle: {
    fontSize: 28,
    fontWeight: "900",
    fontFamily: FontFamily.poppins,
    color: Color.colorBlack,
    marginBottom: 8,
  },
  pageSubtitle: {
    fontSize: 16,
    fontFamily: FontFamily.inter,
    color: "#555",
    marginBottom: 30,
    lineHeight: 22,
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
    flex: 1,
  },
  placeholderText: {
    color: "#999",
  },
  pickerContainer: {
    marginHorizontal: -16, // to compensate for picker's internal padding
    marginTop: -8,
    marginBottom: -8,
  },
  picker: {
    height: 50,
    width: "100%",
  },
  datePickerButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 4,
  },
  submitButton: {
    backgroundColor: Color.colorRoyalblue,
    borderRadius: Border.br_12,
    paddingVertical: 15,
    alignItems: "center",
    borderWidth: 1.5,
    borderColor: Color.colorBlack,
    marginTop: 20,
  },
  buttonDisabled: {
    opacity: 0.7,
  },
  submitButtonText: {
    color: Color.colorWhite,
    fontSize: 18,
    fontFamily: FontFamily.poppins,
    fontWeight: "900",
  },
});

export default CompleteProfile;
