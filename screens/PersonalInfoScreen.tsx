import * as React from "react";
import { StyleSheet, View, Text, Pressable, ScrollView, TextInput } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Color, Border, FontFamily } from "../GlobalStyles";
import { Ionicons, Feather } from "@expo/vector-icons";
import { useAuth } from "../context/AuthContext";

const PersonalInfoScreen = () => {
  const navigation = useNavigation<any>();
  const insets = useSafeAreaInsets();
  const { user } = useAuth();

  const [name, setName] = React.useState(user?.fullName || "Adwait Kamble");
  const [email, setEmail] = React.useState(user?.email || "adwait@example.com");
  const [phone, setPhone] = React.useState(user?.phone || "+91 9876543210");

  return (
    <View style={styles.container}>
      <View style={[styles.header, { paddingTop: Math.max(insets.top, 16) }]}>
        <Pressable onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={24} color={Color.colorBlack} />
        </Pressable>
        <Text style={styles.headerTitle}>Personal Info</Text>
        <View style={styles.backBtn} />
      </View>

      <ScrollView style={{ flex: 1 }} contentContainerStyle={styles.content}>
        <View style={styles.avatarSection}>
          <View style={styles.avatarCircle}>
            <Ionicons name="person" size={48} color={Color.colorRoyalblue} />
          </View>
          <Pressable style={styles.changePhotoBtn}>
            <Text style={styles.changePhotoText}>Change Photo</Text>
          </Pressable>
        </View>

        <View style={styles.formSection}>
          <Text style={styles.label}>Full Name</Text>
          <View style={styles.inputContainer}>
            <Feather name="user" size={20} color="#888" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              value={name}
              onChangeText={setName}
              placeholder="Your full name"
            />
          </View>

          <Text style={styles.label}>Email Address</Text>
          <View style={styles.inputContainer}>
            <Feather name="mail" size={20} color="#888" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              value={email}
              onChangeText={setEmail}
              placeholder="Your email"
              keyboardType="email-address"
            />
          </View>

          <Text style={styles.label}>Phone Number</Text>
          <View style={styles.inputContainer}>
            <Feather name="phone" size={20} color="#888" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              value={phone}
              onChangeText={setPhone}
              placeholder="Your phone number"
              keyboardType="phone-pad"
            />
          </View>

          <Pressable style={styles.saveBtn} onPress={() => {alert('Profile updated!'); navigation.goBack();}}>
            <Text style={styles.saveBtnText}>Save Changes</Text>
          </Pressable>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Color.colorGainsboro },
  header: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingHorizontal: 20, paddingBottom: 16, backgroundColor: Color.colorGainsboro },
  backBtn: { width: 40, height: 40, justifyContent: "center" },
  headerTitle: { fontSize: 20, fontWeight: "800", color: Color.colorBlack, fontFamily: FontFamily.poppins },
  content: { padding: 20 },
  avatarSection: { alignItems: "center", marginBottom: 30 },
  avatarCircle: { width: 100, height: 100, borderRadius: 50, backgroundColor: "#ebf1fb", borderWidth: 2, borderColor: Color.colorRoyalblue, alignItems: "center", justifyContent: "center", marginBottom: 15 },
  changePhotoBtn: { paddingVertical: 8, paddingHorizontal: 16, backgroundColor: "#e2e8f0", borderRadius: 20 },
  changePhotoText: { fontSize: 14, fontWeight: "600", fontFamily: FontFamily.poppins, color: Color.colorBlack },
  formSection: { backgroundColor: Color.colorWhite, borderRadius: Border.br_16, padding: 20 },
  label: { fontSize: 14, fontFamily: FontFamily.inter, fontWeight: "600", color: "#555", marginBottom: 8 },
  inputContainer: { flexDirection: "row", alignItems: "center", borderWidth: 1, borderColor: "#e0e0e0", borderRadius: Border.br_12, paddingHorizontal: 15, marginBottom: 20, backgroundColor: "#fafafa" },
  inputIcon: { marginRight: 10 },
  input: { flex: 1, paddingVertical: 14, fontSize: 16, fontFamily: FontFamily.inter, color: Color.colorBlack },
  saveBtn: { backgroundColor: Color.colorRoyalblue, borderRadius: Border.br_12, paddingVertical: 15, alignItems: "center", marginTop: 10 },
  saveBtnText: { color: Color.colorWhite, fontSize: 16, fontWeight: "800", fontFamily: FontFamily.poppins },
});

export default PersonalInfoScreen;
