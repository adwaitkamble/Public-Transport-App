import * as React from "react";
import { View, StyleSheet, Text, Pressable } from "react-native";
import { Image } from "expo-image";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
  Color,
  FontFamily,
  FontSize,
  Border,
  BoxShadow,
  Height,
  Width,
} from "../GlobalStyles";

const BottomNavigation = () => {
  const navigation = useNavigation<any>();
  const route = useRoute();
  const currentRoute = route.name;
  
  // Basic safe area for bottom devices like iOS
  const insets = useSafeAreaInsets();
  const bottomPadding = Math.max(insets.bottom, 12);

  return (
    <View style={[styles.navigationBar, { paddingBottom: bottomPadding }]}>
      
      {/* Home Tab */}
      <Pressable
        style={styles.tabItem}
        onPress={() => navigation.navigate("Home")}
      >
        <Image
          style={styles.icon}
          contentFit="cover"
          source={require("../assets/image-5.png")}
        />
        <Text style={styles.label}>Home</Text>
      </Pressable>

      {/* Route Tab */}
      <Pressable
        style={styles.tabItem}
        onPress={() => navigation.navigate("Route")}
      >
        <Image
          style={styles.icon}
          contentFit="cover"
          source={require("../assets/image-6.png")}
        />
        <Text style={styles.label}>Route</Text>
        {currentRoute === "Route" && <View style={styles.activeIndicator} />}
      </Pressable>

      {/* Favorites Tab */}
      <Pressable
        style={styles.tabItem}
        onPress={() => navigation.navigate("Favorites")}
      >
        <Image
          style={styles.icon}
          contentFit="contain" // Fix icon clipping
          source={require("../assets/image-7.png")}
        />
        <Text style={styles.label}>Favorites</Text>
        {currentRoute === "Favorites" && <View style={styles.activeIndicator} />}
      </Pressable>

      {/* Profile Tab */}
      <Pressable
        style={styles.tabItem}
        onPress={() => navigation.navigate("Profile")}
      >
        <Image
          style={styles.icon}
          contentFit="contain" // Fix icon clipping
          source={require("../assets/image-8.png")}
        />
        <Text style={styles.label}>Profile</Text>
        {currentRoute === "Profile" && <View style={styles.activeIndicator} />}
      </Pressable>
      
    </View>
  );
};

const styles = StyleSheet.create({
  navigationBar: {
    flexDirection: "row",
    justifyContent: "space-between", 
    alignItems: "flex-start",
    paddingHorizontal: 32, 
    paddingTop: 16,
    backgroundColor: Color.colorWhite,
    borderWidth: 1,
    borderColor: Color.colorBlack,
    borderTopRightRadius: Border.br_16,
    borderTopLeftRadius: Border.br_16,
    elevation: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    width: "100%",
  },
  tabItem: {
    alignItems: "center",
    justifyContent: "flex-start",
    minWidth: 50,
    height: 60, // Fixed height provides stable bounding box regardless of indicator rendering
  },
  icon: {
    width: 32,
    height: 32,
    marginBottom: 4,
  },
  label: {
    color: Color.colorBlack,
    fontFamily: FontFamily.poppins,
    fontSize: 12,
    fontWeight: "600",
    textAlign: "center",
  },
  activeIndicator: {
    marginTop: 4, 
    width: 24,
    height: 3,
    backgroundColor: Color.colorBlack,
    borderRadius: 2,
  },
});

export default BottomNavigation;
