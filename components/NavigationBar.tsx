import * as React from "react";
import { View, StyleSheet, Text, Pressable } from "react-native";
import { Image } from "expo-image";
import { useNavigation } from "@react-navigation/native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
  Color,
  FontFamily,
  FontSize,
  Border,
  BoxShadow,
} from "../GlobalStyles";

const NavigationBar = () => {
  const navigation = useNavigation<any>();
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.navigationBar, { paddingBottom: Math.max(insets.bottom, 16) }]}>
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
        <View style={styles.activeIndicator} />
      </Pressable>

      {/* Favorites Tab */}
      <Pressable
        style={styles.tabItem}
        onPress={() => navigation.navigate("Favorites")} 
      >
        <Image
          style={styles.icon}
          contentFit="cover"
          source={require("../assets/image-8.png")} 
        />
        <Text style={styles.label}>Favorites</Text>
      </Pressable>

      {/* Profile Tab */}
      <Pressable
        style={styles.tabItem}
        onPress={() => navigation.navigate("Profile")} 
      >
        <Image
          style={styles.icon}
          contentFit="cover"
          source={require("../assets/image-7.png")} 
        />
        <Text style={styles.label}>Profile</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  navigationBar: {
    flexDirection: "row",
    justifyContent: "space-between", 
    alignItems: "flex-start", // Changed so items align to top of nav bar space
    paddingHorizontal: 24, 
    paddingTop: 12,
    backgroundColor: Color.colorWhite,
    borderWidth: 1,
    borderColor: Color.colorBlack,
    borderTopRightRadius: Border.br_16,
    borderTopLeftRadius: Border.br_16,
    elevation: 8, // slightly higher elevation to stand out over map background
    boxShadow: BoxShadow.shadow_drop,
    width: "100%",
  },
  tabItem: {
    alignItems: "center",
    justifyContent: "flex-start",
    gap: 4, 
    minWidth: 60,
    height: 50, // Fixed height keeps the container stable when indicator renders
  },
  icon: {
    width: 28,
    height: 28,
  },
  label: {
    color: Color.colorBlack,
    fontFamily: FontFamily.poppins,
    fontSize: FontSize.fs_12,
    fontWeight: "600",
    textAlign: "center",
  },
  activeIndicator: {
    marginTop: 2, // Tucks it right under the label
    width: 24,
    height: 3,
    backgroundColor: Color.colorBlack,
    borderRadius: 2,
  },
});

export default NavigationBar;