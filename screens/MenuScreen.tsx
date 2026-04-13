import * as React from "react";
import { View, Text, StyleSheet, Pressable, ScrollView } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { MaterialCommunityIcons, Feather, Ionicons } from "@expo/vector-icons";
import { Color, FontFamily, Border } from "../GlobalStyles";
import { useAuth } from "../context/AuthContext";

const MenuItem = ({ icon, label, onPress }: any) => (
  <Pressable style={styles.menuItem} onPress={onPress}>
    <View style={styles.menuIconWrapper}>
      <MaterialCommunityIcons name={icon} size={28} color={Color.colorBlack} />
    </View>
    <Text style={styles.menuLabel}>{label}</Text>
    <Feather name="chevron-right" size={24} color={Color.colorDimgray} />
  </Pressable>
);

const MenuScreen = () => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<any>();
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout(); // Wipe secure local keys and contexts
    } catch (e) {
      console.log("Error logging out", e);
    }
    // Deep wipe of history so logged out users can't 'back button' into the app
    navigation.reset({
      index: 0,
      routes: [{ name: "Login" }],
    });
  };

  return (
    <View style={[styles.container, { paddingTop: Math.max(insets.top, 16) }]}>
      
      {/* Header with Close Button */}
      <View style={styles.header}>
        <Pressable onPress={() => navigation.goBack()} style={styles.closeButton}>
          <Feather name="x" size={32} color={Color.colorBlack} />
        </Pressable>
        <Text style={styles.headerTitle}>Menu</Text>
        <View style={{ width: 32 }} />
      </View>

      <ScrollView style={styles.scrollArea} contentContainerStyle={styles.scrollContent}>
        
        {/* Profile Card Section */}
        <Pressable style={styles.profileSection} onPress={() => navigation.navigate('PersonalInfo')}>
          <View style={styles.avatarContainer}>
            <MaterialCommunityIcons name="account" size={48} color={Color.colorWhite} />
          </View>
          <View style={styles.profileInfo}>
            <Text style={styles.profileName}>{user?.fullName || "Adwait Kamble"}</Text>
            <Text style={styles.profilePhone}>{user?.phone || "+91 98765 43210"}</Text>
          </View>
        </Pressable>

        <View style={styles.divider} />

        {/* Menu Items */}
        <View style={styles.menuList}>
          <MenuItem 
            icon="ticket-percent-outline" 
            label="My Tickets" 
            onPress={() => navigation.navigate("TravelHistory")} 
          />
          <MenuItem 
            icon="card-account-details-outline" 
            label="Active Passes" 
            onPress={() => alert("You currently have no active passes.")} 
          />
          <MenuItem 
            icon="wallet-outline" 
            label="Payment Methods" 
            onPress={() => navigation.navigate("TicketBooking")} 
          />
          <MenuItem 
            icon="history" 
            label="Ride History" 
            onPress={() => navigation.navigate("TravelHistory")} 
          />
        </View>

        <View style={styles.divider} />

        <View style={styles.menuList}>
          <MenuItem 
            icon="cog-outline" 
            label="Settings" 
            onPress={() => navigation.navigate("Settings")} 
          />
          <MenuItem 
            icon="help-circle-outline" 
            label="Help & Support" 
            onPress={() => navigation.navigate("HelpSupport")} 
          />
        </View>

      </ScrollView>

      {/* Logout Button */}
      <Pressable 
        style={[styles.logoutButton, { marginBottom: Math.max(insets.bottom, 24) }]} 
        onPress={handleLogout}
      >
        <MaterialCommunityIcons name="logout" size={24} color="#DC2626" />
        <Text style={styles.logoutText}>Log Out</Text>
      </Pressable>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.colorGainsboro || "#DDE3EB",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  closeButton: {
    width: 32,
    height: 32,
    justifyContent: "center",
    alignItems: "center",
  },
  headerTitle: {
    fontFamily: FontFamily.poppins,
    fontSize: 24,
    fontWeight: "900",
    color: Color.colorBlack,
  },
  scrollArea: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  profileSection: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Color.colorWhite,
    padding: 20,
    borderRadius: Border.br_16,
    borderWidth: 1.5,
    borderColor: Color.colorBlack,
    marginBottom: 24,
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  avatarContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: "#2563EB",
    borderWidth: 1.5,
    borderColor: Color.colorBlack,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    fontFamily: FontFamily.poppins,
    fontSize: 20,
    fontWeight: "800",
    color: Color.colorBlack,
  },
  profilePhone: {
    fontFamily: FontFamily.poppins,
    fontSize: 14,
    fontWeight: "500",
    color: Color.colorDimgray,
    marginTop: 2,
  },
  divider: {
    height: 1.5,
    backgroundColor: Color.colorBlack,
    opacity: 0.2,
    marginBottom: 24,
    marginHorizontal: 10,
  },
  menuList: {
    backgroundColor: Color.colorWhite,
    borderRadius: Border.br_16,
    borderWidth: 1.5,
    borderColor: Color.colorBlack,
    paddingVertical: 8,
    marginBottom: 24,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 3,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  menuIconWrapper: {
    width: 32,
    marginRight: 12,
    alignItems: "center",
  },
  menuLabel: {
    flex: 1,
    fontFamily: FontFamily.poppins,
    fontSize: 16,
    fontWeight: "600",
    color: Color.colorBlack,
  },
  logoutButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 20,
    height: 60,
    backgroundColor: Color.colorWhite,
    borderRadius: Border.br_16,
    borderWidth: 1.5,
    borderColor: Color.colorBlack,
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  logoutText: {
    fontFamily: FontFamily.poppins,
    fontSize: 18,
    fontWeight: "800",
    color: "#DC2626", // Red for destructive action
    marginLeft: 8,
  }
});

export default MenuScreen;
