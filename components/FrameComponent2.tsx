import * as React from "react";
import { View, StyleSheet, Text, Pressable } from "react-native";
import { Image } from "expo-image";
import { useNavigation } from "@react-navigation/native";
import {
  Height,
  Color,
  FontFamily,
  FontSize,
  Gap,
  Width,
  Padding,
  Border,
  BoxShadow,
} from "../GlobalStyles";

const FrameComponent2 = () => {
  const navigation = useNavigation<any>();

  return (
    <View style={styles.rectangleParent}>
      <View style={styles.frameChild} />
      <Pressable
        style={styles.frameParent}
        onPress={() => navigation.navigate("Home")}
      >
        <View style={[styles.image5Wrapper, styles.wrapperLayout]}>
          <Image
            style={styles.iconLayout}
            contentFit="cover"
            source={require("../assets/image-5.png")}
          />
        </View>
        <Text style={[styles.home, styles.homeTypo]}>Home</Text>
      </Pressable>
      <Pressable
        style={[styles.frameGroup, styles.frameLayout]}
        onPress={() => navigation.navigate("Route")}
      >
        <View style={[styles.image6Wrapper, styles.wrapperLayout]}>
          <Image
            style={styles.iconLayout}
            contentFit="cover"
            source={require("../assets/image-6.png")}
          />
        </View>
        <Text style={[styles.route, styles.homeTypo]}>Route</Text>
      </Pressable>
      <Pressable
        style={styles.image8Parent}
        onPress={() => navigation.navigate("Map")}
      >
        <Image
          style={[styles.image8Icon, styles.iconLayout]}
          contentFit="cover"
          source={require("../assets/image-8.png")}
        />
        <View style={[styles.frameContainer, styles.frameLayout]}>
          <View style={[styles.image7Wrapper, styles.wrapperLayout]}>
            <Image
              style={styles.iconLayout}
              contentFit="cover"
              source={require("../assets/image-7.png")}
            />
          </View>
          <View style={styles.favoritesParent}>
            <Text style={[styles.favorites, styles.homeTypo]}>Favorites</Text>
            <Text style={[styles.profile, styles.homeTypo]}>Profile</Text>
          </View>
        </View>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapperLayout: {
    height: Height.height_32,
    flexDirection: "row",
  },
  homeTypo: {
    alignItems: "center",
    display: "flex",
    textAlign: "left",
    color: Color.colorBlack,
    fontFamily: FontFamily.poppins,
    fontSize: FontSize.fs_12,
    height: Height.height_18,
    zIndex: 1,
  },
  frameLayout: {
    gap: Gap.gap_10,
    height: Height.height_60,
  },
  iconLayout: {
    zIndex: 1,
    width: Width.width_32,
    height: Height.height_32,
  },
  rectangleParent: {
    alignItems: "flex-end",
    paddingLeft: Padding.padding_33,
    paddingTop: Padding.padding_18,
    paddingRight: Padding.padding_31,
    paddingBottom: Padding.padding_10,
    gap: Gap.gap_42,
    flexDirection: "row",
    borderWidth: 1,
    borderColor: Color.colorBlack,
    borderStyle: "solid",
    backgroundColor: Color.colorWhite,
    borderTopRightRadius: Border.br_16,
    borderTopLeftRadius: Border.br_16,
    elevation: 4,
    boxShadow: BoxShadow.shadow_drop,
    height: Height.height_90,
    width: Width.width_360,
  },
  frameChild: {
    display: "none",
    borderWidth: 1,
    borderColor: Color.colorBlack,
    borderStyle: "solid",
    backgroundColor: Color.colorWhite,
    borderTopRightRadius: Border.br_16,
    borderTopLeftRadius: Border.br_16,
    elevation: 4,
    boxShadow: BoxShadow.shadow_drop,
    height: Height.height_90,
    width: Width.width_360,
  },
  frameParent: {
    height: Height.height_62,
    width: Width.width_43,
    paddingRight: Padding.padding_7,
    gap: Gap.gap_12,
    zIndex: 1,
  },
  image5Wrapper: {
    width: Width.width_33,
    paddingLeft: Padding.padding_1,
  },
  home: {
    width: Width.width_39,
  },
  frameGroup: {
    width: Width.width_35,
    zIndex: 1,
  },
  image6Wrapper: {
    width: Width.width_34,
    paddingLeft: Padding.padding_2,
  },
  route: {
    width: Width.width_38,
  },
  image8Parent: {
    width: Width.width_134,
    height: Height.height_60,
    zIndex: 1,
    flexDirection: "row",
  },
  image8Icon: {
    position: "absolute",
    top: -2,
    right: 4,
  },
  frameContainer: {
    width: Width.width_134,
  },
  image7Wrapper: {
    width: Width.width_44,
    paddingLeft: Padding.padding_12,
    zIndex: 1,
  },
  favoritesParent: {
    gap: Gap.gap_39,
    width: Width.width_134,
    height: Height.height_18,
    zIndex: 1,
    flexDirection: "row",
  },
  favorites: {
    width: Width.width_58,
  },
  profile: {
    width: Width.width_40,
  },
});

export default FrameComponent2;
