import * as React from "react";
import { StyleSheet, View, Text, Pressable, ScrollView, TextInput } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Color, Border, FontFamily } from "../GlobalStyles";
import { Ionicons, Feather } from "@expo/vector-icons";
import { useAuth } from "../context/AuthContext";
import { useAppTheme } from "../context/ThemeContext";

const PersonalInfoScreen = () => {
  const navigation = useNavigation<any>();
  const insets = useSafeAreaInsets();
  const { user } = useAuth();
  const { themeColors } = useAppTheme();

  const [name, setName] = React.useState(user?.fullName || "Adwait Kamble");
  const [email, setEmail] = React.useState(user?.email || "adwait@example.com");
  const [phone, setPhone] = React.useState(user?.phone || "+91 9876543210");

  return (
    <View style={[styles.container, { backgroundColor: themeColors.background }]}>
      <View style={[styles.header, { paddingTop: Math.max(insets.top, 16), backgroundColor: themeColors.headerBg }]}> 
        <Pressable onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={24} color={themeColors.text} />
        </Pressable>
        <Text style={[styles.headerTitle, { color: themeColors.text }]}>Personal Info</Text>
        <View style={styles.backBtn} />
      </View>

      <ScrollView style={{ flex: 1 }} contentContainerStyle={styles.content}>
        <View style={styles.avatarSection}>
          <View style={[styles.avatarCircle, { backgroundColor: themeColors.cardBackground, borderColor: themeColors.divider }]}>
            <Ionicons name="person" size={48} color={Color.colorRoyalblue} />
          </View>
          <Pressable style={[styles.changePhotoBtn, { backgroundColor: themeColors.elevatedBackground }]}>
            <Text style={[styles.changePhotoText, { color: themeColors.text }]}>Change Photo</Text>
          </Pressable>
        </View>

        <View style={[styles.formSection, { backgroundColor: themeColors.cardBackground, borderColor: themeColors.divider }] }>
          <Text style={[styles.label, { color: themeColors.subText }]}>Full Name</Text>
          <View style={[styles.inputContainer, { backgroundColor: themeColors.elevatedBackground, borderColor: themeColors.divider }] }>
            <Feather name="user" size={20} color={themeColors.subText} style={styles.inputIcon} />
            <TextInput
              style={[styles.input, { color: themeColors.text }]}
              value={name}
              onChangeText={setName}
              placeholder="Your full name"
              placeholderTextColor={themeColors.subText}
            />
          </View>

          <Text style={[styles.label, { color: themeColors.subText }]}>Email Address</Text>
          <View style={[styles.inputContainer, { backgroundColor: themeColors.elevatedBackground, borderColor: themeColors.divider }] }>
            <Feather name="mail" size={20} color={themeColors.subText} style={styles.inputIcon} />
            <TextInput
              style={[styles.input, { color: themeColors.text }]}
              value={email}
              onChangeText={setEmail}
              placeholder="Your email"
              placeholderTextColor={themeColors.subText}
              keyboardType="email-address"
            />
          </View>

          <Text style={[styles.label, { color: themeColors.subText }]}>Phone Number</Text>
          <View style={[styles.inputContainer, { backgroundColor: themeColors.elevatedBackground, borderColor: themeColors.divider }] }>
            <Feather name="phone" size={20} color={themeColors.subText} style={styles.inputIcon} />
            <TextInput
              style={[styles.input, { color: themeColors.text }]}
              value={phone}
              onChangeText={setPhone}
              placeholder="Your phone number"
              placeholderTextColor={themeColors.subText}
              keyboardType="phone-pad"
            />
          </View>

          <Pressable style={[styles.saveBtn, { borderColor: themeColors.divider }]} onPress={() => {alert('Profile updated!'); navigation.goBack();}}>
            <Text style={styles.saveBtnText}>Save Changes</Text>
          </Pressable>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingHorizontal: 20, paddingBottom: 16 },
  backBtn: { width: 40, height: 40, justifyContent: "center" },
  headerTitle: { fontSize: 20, fontWeight: "800", fontFamily: FontFamily.poppins },
  content: { padding: 20 },
  avatarSection: { alignItems: "center", marginBottom: 30 },
  avatarCircle: { width: 100, height: 100, borderRadius: 50, borderWidth: 2, borderColor: Color.colorRoyalblue, alignItems: "center", justifyContent: "center", marginBottom: 15 },
  changePhotoBtn: { paddingVertical: 8, paddingHorizontal: 16, borderRadius: 20 },
  changePhotoText: { fontSize: 14, fontWeight: "600", fontFamily: FontFamily.poppins },
  formSection: { borderRadius: Border.br_16, padding: 20, borderWidth: 1 },
  label: { fontSize: 14, fontFamily: FontFamily.inter, fontWeight: "600", marginBottom: 8 },
  inputContainer: { flexDirection: "row", alignItems: "center", borderWidth: 1, borderRadius: Border.br_12, paddingHorizontal: 15, marginBottom: 20 },
  inputIcon: { marginRight: 10 },
  input: { flex: 1, paddingVertical: 14, fontSize: 16, fontFamily: FontFamily.inter },
  saveBtn: { backgroundColor: Color.colorRoyalblue, borderRadius: Border.br_12, paddingVertical: 15, alignItems: "center", marginTop: 10 },
  saveBtnText: { color: Color.colorWhite, fontSize: 16, fontWeight: "800", fontFamily: FontFamily.poppins },
});

export default PersonalInfoScreen;
