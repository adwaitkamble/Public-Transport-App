import * as React from "react";
import { useMemo } from "react";
import { StyleSheet, View, Text, TextInput } from "react-native";
import { Image } from "expo-image";
import {
  Color,
  Border,
  BoxShadow,
  Gap,
  Height,
  Padding,
  FontFamily,
  FontSize,
  Width,
} from "../GlobalStyles";

export type EndLocationFieldsType = {
  from?: string;

  /** Style props */
  destinationFieldsWidth?: number | string;
  currentLocationButtonWidth?: number | string;
  currentLocationButtonTextAlign?: string;
};

const getStyleValue = (key: string, value: string | number | undefined) => {
  if (value === undefined) return;
  return { [key]: value === "unset" ? undefined : value };
};
const EndLocationFields = ({
  from,
  destinationFieldsWidth,
  currentLocationButtonWidth,
  currentLocationButtonTextAlign,
}: EndLocationFieldsType) => {
  const destinationFieldsStyle = useMemo(() => {
    return {
      ...getStyleValue("width", destinationFieldsWidth),
    };
  }, [destinationFieldsWidth]);

  const currentLocationButtonStyle = useMemo(() => {
    return {
      ...getStyleValue("width", currentLocationButtonWidth),
      ...getStyleValue("textAlign", currentLocationButtonTextAlign),
    };
  }, [currentLocationButtonWidth, currentLocationButtonTextAlign]);

  return (
    <View style={[styles.endLocationFields, styles.childBorder]}>
      <View style={[styles.endLocationFieldsChild, styles.childBorder]} />
      <View style={styles.endLocationDetails}>
        <View style={[styles.endLocationIcon, styles.endLocationIconFlexBox]}>
          <Image
            style={styles.image14Icon}
            contentFit="cover"
            source={require("../assets/image-17.png")}
          />
          <View style={[styles.endLocation, styles.locationSpaceBlock]}>
            <Text style={[styles.from, styles.fromTypo]}>{from}</Text>
          </View>
        </View>
        <View style={styles.endLocationDetailsInner}>
          <View style={[styles.frameChild, styles.childBorder]} />
        </View>
      </View>
      <View
        style={[
          styles.destinationFields,
          styles.endLocationIconFlexBox,
          destinationFieldsStyle,
        ]}
      >
        <Image
          style={styles.image14Icon}
          contentFit="cover"
          source={require("../assets/image-18.png")}
        />
        <View
          style={[
            styles.currentLocationButton,
            styles.locationSpaceBlock,
            currentLocationButtonStyle,
          ]}
        >
          <Text style={[styles.currentLocation, styles.fromTypo]}>
            Current location
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  childBorder: {
    borderWidth: 1,
    borderColor: Color.colorBlack,
    borderStyle: "solid",
    borderRadius: Border.br_16,
    elevation: 4,
    boxShadow: BoxShadow.shadow_drop,
  },
  endLocationIconFlexBox: {
    gap: Gap.gap_16,
    flexDirection: "row",
    zIndex: 1,
    height: Height.height_24,
  },
  locationSpaceBlock: {
    paddingTop: Padding.padding_1,
    height: Height.height_23,
  },
  fromTypo: {
    alignItems: "center",
    display: "flex",
    textAlign: "left",
    color: Color.colorBlack,
    fontFamily: FontFamily.poppins,
    fontSize: FontSize.fs_16,
    height: Height.height_22,
    zIndex: 1,
  },
  endLocationFields: {
    paddingLeft: Padding.padding_20,
    paddingTop: Padding.padding_13,
    paddingRight: Padding.padding_18,
    paddingBottom: Padding.padding_13,
    gap: Gap.gap_9,
    backgroundColor: Color.colorWhite,
    width: Width.width_328,
    height: 110,
    borderColor: Color.colorBlack,
    borderStyle: "solid",
    borderRadius: Border.br_16,
    elevation: 4,
    boxShadow: BoxShadow.shadow_drop,
  },
  endLocationFieldsChild: {
    display: "none",
    backgroundColor: Color.colorWhite,
    width: Width.width_328,
    height: 110,
    borderColor: Color.colorBlack,
    borderStyle: "solid",
    borderRadius: Border.br_16,
    elevation: 4,
    boxShadow: BoxShadow.shadow_drop,
  },
  endLocationDetails: {
    height: Height.height_36,
    zIndex: null,
    gap: Gap.gap_3,
    width: Width.width_287,
  },
  endLocationIcon: {
    width: Width.width_86,
  },
  image14Icon: {
    width: Width.width_24,
    zIndex: 1,
    height: Height.height_24,
  },
  endLocation: {
    width: Width.width_46,
  },
  from: {
    width: Width.width_49,
  },
  endLocationDetailsInner: {
    paddingLeft: Padding.padding_7,
    height: Height.height_7,
    flexDirection: "row",
    zIndex: 1,
    width: Width.width_287,
  },
  frameChild: {
    width: Width.width_280,
    backgroundColor: Color.colorAliceblue,
    height: Height.height_7,
    zIndex: 1,
    borderColor: Color.colorBlack,
    borderStyle: "solid",
    borderRadius: Border.br_16,
    elevation: 4,
    boxShadow: BoxShadow.shadow_drop,
  },
  destinationFields: {
    width: 174,
  },
  currentLocationButton: {
    width: Width.width_134,
  },
  currentLocation: {
    width: 137,
  },
});

export default EndLocationFields;
