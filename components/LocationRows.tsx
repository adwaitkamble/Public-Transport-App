import * as React from "react";
import { useMemo } from "react";
import { StyleSheet, View, Text } from "react-native";
import { Image } from "expo-image";
import {
  Color,
  Border,
  BoxShadow,
  Height,
  Width,
  FontFamily,
  FontSize,
  Padding,
  Gap,
} from "../GlobalStyles";

export type LocationRowsType = {
  cityCenter?: string;
  kM?: string;

  /** Style props */
  locationLabelsWidth?: number | string;
  locationLabelsPaddingRight?: number | string;
  cityCenterWidth?: number | string;
  kMWidth?: number | string;
};

const getStyleValue = (key: string, value: string | number | undefined) => {
  if (value === undefined) return;
  return { [key]: value === "unset" ? undefined : value };
};
const LocationRows = ({
  locationLabelsWidth,
  locationLabelsPaddingRight,
  cityCenter,
  cityCenterWidth,
  kM,
  kMWidth,
}: LocationRowsType) => {
  const locationLabelsStyle = useMemo(() => {
    return {
      ...getStyleValue("width", locationLabelsWidth),
      ...getStyleValue("paddingRight", locationLabelsPaddingRight),
    };
  }, [locationLabelsWidth, locationLabelsPaddingRight]);

  const cityCenterStyle = useMemo(() => {
    return {
      ...getStyleValue("width", cityCenterWidth),
    };
  }, [cityCenterWidth]);

  const kMStyle = useMemo(() => {
    return {
      ...getStyleValue("width", kMWidth),
    };
  }, [kMWidth]);

  return (
    <View style={[styles.locationRows, styles.locationLayout]}>
      <View style={[styles.locationRowsChild, styles.locationLayout]} />
      <Image
        style={styles.image20Icon}
        contentFit="cover"
        source={require("../assets/image-211.png")}
      />
      <View style={[styles.locationLabels, locationLabelsStyle]}>
        <Text style={[styles.cityCenter, styles.kmFlexBox, cityCenterStyle]}>
          {cityCenter}
        </Text>
      </View>
      <Text style={[styles.km, styles.kmFlexBox, kMStyle]}>{kM}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  locationLayout: {
    borderWidth: 1,
    borderColor: Color.colorBlack,
    borderStyle: "solid",
    backgroundColor: Color.colorWhite,
    borderRadius: Border.br_16,
    elevation: 4,
    boxShadow: BoxShadow.shadow_drop,
    height: 80,
    width: Width.width_328,
  },
  kmFlexBox: {
    justifyContent: "center",
    alignItems: "center",
    display: "flex",
    textAlign: "center",
    color: Color.colorBlack,
    fontFamily: FontFamily.poppins,
    fontSize: FontSize.fs_16,
    zIndex: 1,
    height: Height.height_24,
  },
  locationRows: {
    flexDirection: "row",
    paddingHorizontal: Padding.padding_24,
    paddingVertical: 22,
    gap: 48,
  },
  locationRowsChild: {
    display: "none",
  },
  image20Icon: {
    width: Width.width_24,
    zIndex: 1,
    height: Height.height_24,
  },
  locationLabels: {
    width: Width.width_100,
    paddingRight: Padding.padding_10,
    height: Height.height_24,
  },
  cityCenter: {
    width: 93,
  },
  km: {
    width: Width.width_41,
  },
});

export default LocationRows;
