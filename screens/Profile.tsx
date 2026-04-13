import * as React from "react";
import { StyleSheet, View, Text, Pressable, ScrollView, ActivityIndicator } from "react-native";
import { Image } from "expo-image";
import { useNavigation } from "@react-navigation/native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import FrameComponent2 from "../components/FrameComponent2";
import {
  Color,
  Border,
  FontFamily,
  FontSize,
} from "../GlobalStyles";
import { Feather, MaterialIcons, Ionicons } from "@expo/vector-icons";
import { useAuth } from "../context/AuthContext";
import { getProfile } from "../services/api";

const ProfileMenuItem = ({ icon, title, subtitle, onPress }: any) => (
  <Pressable style={styles.menuItem} onPress={onPress}>
    <View style={styles.menuIconBox}>
      {icon}
    </View>
    <View style={styles.menuTextArea}>
      <Text style={styles.menuTitle}>{title}</Text>
      {subtitle && <Text style={styles.menuSubtitle}>{subtitle}</Text>}
    </View>
    <MaterialIcons name="chevron-right" size={24} color="#888" />
  </Pressable>
);

const Profile = () => {
  const navigation = useNavigation<any>();
  const insets = useSafeAreaInsets();
  const { user, logout } = useAuth();
  const [profileData, setProfileData] = React.useState<any>(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await getProfile();
        setProfileData(data);
      } catch (error) {
        // If API fails, use local user data
        setProfileData(user);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
    } catch (e) {
      // ignore errors during logout
    }
    navigation.reset({
      index: 0,
      routes: [{ name: "Login" }],
    });
  };

  const displayUser = profileData || user;

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

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.pageTitle}>Profile</Text>

        {/* Avatar & Info */}
        {loading ? (
          <View style={[styles.profileCard, { justifyContent: "center" }]}>
            <ActivityIndicator size="large" color={Color.colorRoyalblue} />
          </View>
        ) : (
          <View style={styles.profileCard}>
            <View style={styles.avatarCircle}>
              <Ionicons name="person" size={48} color={Color.colorRoyalblue} />
            </View>
            <View style={styles.profileInfo}>
              <Text style={styles.profileName}>
                {displayUser?.fullName || "User"}
              </Text>
              <Text style={styles.profileEmail}>
                {displayUser?.email || "email@example.com"}
              </Text>
              <Text style={styles.profilePhone}>
                {displayUser?.phone || "+1 000-0000"}
              </Text>
            </View>
            <Pressable style={styles.editProfileBtn} onPress={() => navigation.navigate("PersonalInfo")}>
              <Feather name="edit-2" size={18} color={Color.colorRoyalblue} />
            </Pressable>
          </View>
        )}

        {/* Menu Items */}
        <View style={styles.menuCard}>
          <ProfileMenuItem
            icon={<Feather name="user" size={20} color={Color.colorRoyalblue} />}
            title="Personal Information"
            subtitle="Name, email, phone"
            onPress={() => navigation.navigate("PersonalInfo")}
          />
          <View style={styles.menuDivider} />
          <ProfileMenuItem
            icon={<Feather name="credit-card" size={20} color={Color.colorRoyalblue} />}
            title="Payment Methods"
            subtitle="UPI, cards, netbanking"
            onPress={() => navigation.navigate("TicketBooking")}
          />
          <View style={styles.menuDivider} />
          <ProfileMenuItem
            icon={<Feather name="clock" size={20} color={Color.colorRoyalblue} />}
            title="Travel History"
            subtitle="Past rides & tickets"
            onPress={() => navigation.navigate("TravelHistory")}
          />
          <View style={styles.menuDivider} />
          <ProfileMenuItem
            icon={<Ionicons name="notifications-outline" size={20} color={Color.colorRoyalblue} />}
            title="Notifications"
            subtitle="Alerts & updates"
            onPress={() => navigation.navigate("Notifications")}
          />
        </View>

        <View style={styles.menuCard}>
          <ProfileMenuItem
            icon={<Feather name="settings" size={20} color={Color.colorRoyalblue} />}
            title="Settings"
            subtitle="Preferences, language"
            onPress={() => navigation.navigate("Settings")}
          />
          <View style={styles.menuDivider} />
          <ProfileMenuItem
            icon={<Feather name="help-circle" size={20} color={Color.colorRoyalblue} />}
            title="Help & Support"
            subtitle="FAQs, contact us"
            onPress={() => navigation.navigate("HelpSupport")}
          />
        </View>

        {/* Logout Button */}
        <Pressable style={styles.logoutButton} onPress={handleLogout}>
          <Feather name="log-out" size={20} color="#ef4242" />
          <Text style={styles.logoutText}>Log Out</Text>
        </Pressable>
      </ScrollView>

      {/* Bottom Navigation */}
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
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 30,
  },
  pageTitle: {
    fontSize: 28,
    fontWeight: "900",
    fontFamily: FontFamily.poppins,
    color: Color.colorBlack,
    marginBottom: 20,
  },
  profileCard: {
    backgroundColor: Color.colorWhite,
    borderRadius: Border.br_16,
    borderWidth: 1.5,
    borderColor: Color.colorBlack,
    padding: 20,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 24,
    minHeight: 100,
  },
  avatarCircle: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: "#ebf1fb",
    borderWidth: 2,
    borderColor: Color.colorRoyalblue,
    alignItems: "center",
    justifyContent: "center",
  },
  profileInfo: {
    flex: 1,
    marginLeft: 16,
    gap: 2,
  },
  profileName: {
    fontSize: 20,
    fontWeight: "900",
    fontFamily: FontFamily.poppins,
    color: Color.colorBlack,
  },
  profileEmail: {
    fontSize: 13,
    fontFamily: FontFamily.inter,
    color: "#555",
  },
  profilePhone: {
    fontSize: 13,
    fontFamily: FontFamily.inter,
    color: "#555",
  },
  editProfileBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#ebf1fb",
    alignItems: "center",
    justifyContent: "center",
  },
  menuCard: {
    backgroundColor: Color.colorWhite,
    borderRadius: Border.br_16,
    borderWidth: 1.5,
    borderColor: Color.colorBlack,
    paddingVertical: 4,
    marginBottom: 20,
    overflow: "hidden",
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 14,
    paddingHorizontal: 18,
  },
  menuIconBox: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: "#ebf1fb",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 14,
  },
  menuTextArea: {
    flex: 1,
  },
  menuTitle: {
    fontSize: 15,
    fontWeight: "700",
    fontFamily: FontFamily.poppins,
    color: Color.colorBlack,
  },
  menuSubtitle: {
    fontSize: 12,
    fontFamily: FontFamily.inter,
    color: "#888",
    marginTop: 1,
  },
  menuDivider: {
    height: 1,
    backgroundColor: "#e0e0e0",
    marginHorizontal: 18,
  },
  logoutButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Color.colorWhite,
    borderRadius: Border.br_12,
    borderWidth: 1.5,
    borderColor: "#ef4242",
    paddingVertical: 14,
    gap: 10,
  },
  logoutText: {
    fontSize: 16,
    fontFamily: FontFamily.poppins,
    fontWeight: "900",
    color: "#ef4242",
  },
});

export default Profile;
