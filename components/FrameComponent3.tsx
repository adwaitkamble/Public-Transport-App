import * as React from "react";
import { StyleSheet, View } from "react-native";
import { Image } from "expo-image";
import EndLocationFields from "./EndLocationFields";
import {
  Height,
  Width,
  Color,
  Border,
  BoxShadow,
  Padding,
  Gap,
} from "../GlobalStyles";

const FrameComponent3 = () => {
  return (
    <View style={[styles.locationInputsWrapper, styles.locationLayout]}>
      <View style={[styles.locationInputs, styles.locationLayout]}>
        <View style={styles.frameParent}>
          <View style={[styles.rectangleParent, styles.frameChildLayout]}>
            <View style={[styles.frameChild, styles.frameChildLayout]} />
            <Image
              style={styles.image19Icon}
              contentFit="cover"
              source={require("../assets/image-19.png")}
            />
          </View>
          <EndLocationFields from="From" />
        </View>
        <EndLocationFields
          from="To"
          destinationFieldsWidth={196}
          currentLocationButtonWidth={156}
          currentLocationButtonTextAlign="left"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  locationLayout: {
    height: 240,
  },
  frameChildLayout: {
    height: Height.height_40,
    width: Width.width_40,
    borderWidth: 1,
    borderColor: Color.colorBlack,
    borderStyle: "solid",
    backgroundColor: Color.colorWhite,
    borderRadius: Border.br_16,
    elevation: 4,
    boxShadow: BoxShadow.shadow_drop,
    position: "absolute",
  },
  locationInputsWrapper: {
    width: Width.width_344,
    paddingLeft: Padding.padding_16,
    flexDirection: "row",
  },
  locationInputs: {
    gap: 20,
    width: Width.width_328,
  },
  frameParent: {
    zIndex: 1,
    height: 110,
    width: Width.width_328,
    flexDirection: "row",
  },
  rectangleParent: {
    right: 18,
    bottom: -22,
    zIndex: 1,
  },
  frameChild: {
    top: 0,
    left: 0,
    display: "none",
  },
  image19Icon: {
    top: 7,
    left: 7,
    width: Width.width_24,
    height: Height.height_24,
    zIndex: 2,
    position: "absolute",
  },
});

export default FrameComponent3;
