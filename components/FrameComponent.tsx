import * as React from "react";
import { useMemo } from "react";
import { StyleSheet, View, Text } from "react-native";
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

export type FrameComponentType = {
  medium?: string;
  min?: string;

  /** Style props */
  stationCityHeight?: number | string;
  frameViewBackgroundColor?: string;
  frameViewPaddingHorizontal?: number | string;
  rectangleViewBackgroundColor?: string;
  mediumWidth?: number | string;
  mediumFontFamily?: string;
  mediumColor?: string;
  mediumFontWeight?: string;
  frameViewWidth?: number | string;
  frameViewWidth1?: number | string;
  minWidth?: number | string;
};

const getStyleValue = (key: string, value: string | number | undefined) => {
  if (value === undefined) return;
  return { [key]: value === "unset" ? undefined : value };
};
const FrameComponent = ({
  stationCityHeight,
  frameViewBackgroundColor,
  frameViewPaddingHorizontal,
  rectangleViewBackgroundColor,
  medium,
  mediumWidth,
  mediumFontFamily,
  mediumColor,
  mediumFontWeight,
  frameViewWidth,
  frameViewWidth1,
  min,
  minWidth,
}: FrameComponentType) => {
  const stationCityStyle = useMemo(() => {
    return {
      ...getStyleValue("height", stationCityHeight),
    };
  }, [stationCityHeight]);

  const frameViewStyle = useMemo(() => {
    return {
      ...getStyleValue("backgroundColor", frameViewBackgroundColor),
      ...getStyleValue("paddingHorizontal", frameViewPaddingHorizontal),
    };
  }, [frameViewBackgroundColor, frameViewPaddingHorizontal]);

  const rectangleViewStyle = useMemo(() => {
    return {
      ...getStyleValue("backgroundColor", rectangleViewBackgroundColor),
    };
  }, [rectangleViewBackgroundColor]);

  const mediumStyle = useMemo(() => {
    return {
      ...getStyleValue("width", mediumWidth),
      ...getStyleValue("fontFamily", mediumFontFamily),
      ...getStyleValue("color", mediumColor),
      ...getStyleValue("fontWeight", mediumFontWeight),
    };
  }, [mediumWidth, mediumFontFamily, mediumColor, mediumFontWeight]);

  const frameView1Style = useMemo(() => {
    return {
      ...getStyleValue("width", frameViewWidth),
    };
  }, [frameViewWidth]);

  const frameView2Style = useMemo(() => {
    return {
      ...getStyleValue("width", frameViewWidth1),
    };
  }, [frameViewWidth1]);

  const minStyle = useMemo(() => {
    return {
      ...getStyleValue("width", minWidth),
    };
  }, [minWidth]);

  return (
    <View style={[styles.rectangleParent, styles.frameChildLayout]}>
      <View style={[styles.frameChild, styles.frameChildLayout]} />
      <View style={styles.frameParent}>
        <View style={[styles.rectangleGroup, styles.frameItemLayout]}>
          <View style={[styles.frameItem, styles.frameItemLayout]} />
          <Text style={[styles.a, styles.aTypo]}>21A</Text>
        </View>
        <Text style={[styles.stationCity, styles.aTypo, stationCityStyle]}>
          Station → City Center
        </Text>
        <View style={[styles.frameWrapper, styles.crowdParentLayout]}>
          <View style={[styles.crowdParent, styles.crowdParentLayout]}>
            <Text style={[styles.crowd, styles.minTypo]}>Crowd</Text>
            <View
              style={[
                styles.rectangleContainer,
                styles.frameInnerLayout,
                frameViewStyle,
              ]}
            >
              <View
                style={[
                  styles.frameInner,
                  styles.frameInnerLayout,
                  rectangleViewStyle,
                ]}
              />
              <Text style={[styles.medium, styles.minTypo, mediumStyle]}>
                {medium}
              </Text>
            </View>
          </View>
        </View>
      </View>
      <View style={[styles.frameContainer, frameView1Style]}>
        <View style={[styles.frameGroup, frameView2Style]}>
          <View style={styles.etaWrapper}>
            <Text style={[styles.eta, styles.aTypo]}>ETA</Text>
          </View>
          <Text style={[styles.min, styles.minTypo, minStyle]}>{min}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  frameChildLayout: {
    borderWidth: 1,
    borderColor: Color.colorBlack,
    borderStyle: "solid",
    backgroundColor: Color.colorWhite,
    borderRadius: Border.br_16,
    elevation: 4,
    boxShadow: BoxShadow.shadow_drop,
    height: Height.height_90,
    width: Width.width_328,
  },
  frameItemLayout: {
    backgroundColor: Color.colorRoyalblue,
    borderRadius: Border.br_8,
    width: Width.width_68,
    height: Height.height_20,
  },
  aTypo: {
    alignItems: "center",
    display: "flex",
    textAlign: "left",
    fontFamily: FontFamily.poppins,
    fontSize: FontSize.fs_12,
  },
  crowdParentLayout: {
    height: Height.height_20,
    flexDirection: "row",
  },
  minTypo: {
    fontFamily: FontFamily.inter,
    height: Height.height_15,
    alignItems: "center",
    display: "flex",
    textAlign: "left",
    fontSize: FontSize.fs_12,
  },
  frameInnerLayout: {
    backgroundColor: Color.colorGoldenrod,
    borderRadius: Border.br_8,
    height: Height.height_20,
    width: Width.width_68,
    borderWidth: 1,
    borderColor: Color.colorBlack,
    borderStyle: "solid",
  },
  rectangleParent: {
    paddingHorizontal: Padding.padding_17,
    paddingVertical: Padding.padding_9,
    gap: 76,
    flexDirection: "row",
  },
  frameChild: {
    display: "none",
  },
  frameParent: {
    height: Height.height_72,
    gap: 6,
    zIndex: 1,
    width: Width.width_183,
  },
  rectangleGroup: {
    paddingHorizontal: Padding.padding_24,
    paddingVertical: Padding.padding_1,
    zIndex: 1,
    flexDirection: "row",
  },
  frameItem: {
    display: "none",
  },
  a: {
    width: 23,
    fontWeight: "600",
    color: Color.colorWhite,
    zIndex: 2,
    height: Height.height_18,
  },
  stationCity: {
    width: 131,
    height: Height.height_19,
    color: Color.colorBlack,
    zIndex: 1,
  },
  frameWrapper: {
    paddingLeft: Padding.padding_1,
    width: Width.width_183,
  },
  crowdParent: {
    width: 182,
    gap: 74,
    zIndex: 1,
  },
  crowd: {
    width: Width.width_40,
    fontWeight: "300",
    color: Color.colorBlack,
    zIndex: 1,
  },
  rectangleContainer: {
    paddingHorizontal: Padding.padding_11,
    paddingTop: Padding.padding_2,
    paddingBottom: Padding.padding_3,
    zIndex: 1,
    flexDirection: "row",
  },
  frameInner: {
    display: "none",
  },
  medium: {
    width: Width.width_49,
    color: Color.colorBlack,
    zIndex: 2,
    textAlign: "center",
  },
  frameContainer: {
    zIndex: null,
    height: 50,
    paddingTop: Padding.padding_15,
    width: Width.width_34,
  },
  frameGroup: {
    height: 35,
    gap: Gap.gap_2,
    width: Width.width_34,
    zIndex: 1,
  },
  etaWrapper: {
    width: 27,
    paddingLeft: Padding.padding_6,
    height: Height.height_18,
    flexDirection: "row",
  },
  eta: {
    width: Width.width_24,
    color: Color.colorBlack,
    height: Height.height_18,
    zIndex: 1,
  },
  min: {
    width: Width.width_37,
    fontWeight: "900",
    color: Color.colorMediumseagreen,
    zIndex: 1,
  },
});

export default FrameComponent;
