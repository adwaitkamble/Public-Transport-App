import * as React from "react";
import { View, StyleSheet, Text, Pressable } from "react-native";
import { Image } from "expo-image";
import { useNavigation } from "@react-navigation/native";
import {
  Height,
  Color,
  FontFamily,
  FontSize,
  Width,
  Padding,
  Border,
  BoxShadow,
} from "../GlobalStyles";
import { useAppTheme } from "../context/ThemeContext";

const FrameComponent2 = () => {
  const navigation = useNavigation<any>();
  const { themeColors } = useAppTheme();

  return (
    <View style={[styles.navBar, { backgroundColor: themeColors.cardBackground, borderColor: themeColors.divider }]}>
      {/* Home */}
      <Pressable
        style={styles.navItem}
        onPress={() => navigation.navigate("Home")}
      >
        <View style={styles.iconWrap}>
          <Image
            style={[styles.navIcon, { tintColor: themeColors.icon }]}
            contentFit="cover"
            source={require("../assets/image-5.png")}
          />
        </View>
        <Text style={[styles.navLabel, { color: themeColors.subText }]}>Home</Text>
      </Pressable>

      {/* Route */}
      <Pressable
        style={styles.navItem}
        onPress={() => navigation.navigate("Route")}
      >
        <View style={styles.iconWrap}>
          <Image
            style={[styles.navIcon, { tintColor: themeColors.icon }]}
            contentFit="cover"
            source={require("../assets/image-6.png")}
          />
        </View>
        <Text style={[styles.navLabel, { color: themeColors.subText }]}>Route</Text>
      </Pressable>

      {/* Favorites */}
      <Pressable
        style={styles.navItem}
        onPress={() => navigation.navigate("Favorites")}
      >
        <View style={styles.iconWrap}>
          <Image
            style={[styles.navIcon, { tintColor: themeColors.icon }]}
            contentFit="cover"
            source={require("../assets/image-7.png")}
          />
        </View>
        <Text style={[styles.navLabel, { color: themeColors.subText }]}>Favorites</Text>
      </Pressable>

      {/* Profile */}
      <Pressable
        style={styles.navItem}
        onPress={() => navigation.navigate("Profile")}
      >
        <View style={styles.iconWrap}>
          <Image
            style={[styles.navIcon, { tintColor: themeColors.icon }]}
            contentFit="cover"
            source={require("../assets/image-8.png")}
          />
        </View>
        <Text style={[styles.navLabel, { color: themeColors.subText }]}>Profile</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  navBar: {
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-around",
    paddingTop: 14,
    paddingBottom: 12,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: Color.colorBlack,
    borderStyle: "solid",
    backgroundColor: Color.colorWhite,
    borderTopRightRadius: Border.br_16,
    borderTopLeftRadius: Border.br_16,
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  navItem: {
    alignItems: "center",
    justifyContent: "center",
    gap: 4,
  },
  iconWrap: {
    width: 32,
    height: 32,
    alignItems: "center",
    justifyContent: "center",
  },
  navIcon: {
    width: 32,
    height: 32,
  },
  navLabel: {
    fontSize: FontSize.fs_12,
    fontFamily: FontFamily.poppins,
    color: Color.colorBlack,
    textAlign: "center",
  },
});

export default FrameComponent2;

