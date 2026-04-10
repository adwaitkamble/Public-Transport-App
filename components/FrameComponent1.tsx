import * as React from "react";
import { Text, StyleSheet, View, Pressable } from "react-native";
import { Image } from "expo-image";
import {
  Height,
  Color,
  FontFamily,
  FontSize,
  Border,
  BoxShadow,
  Width,
  Padding,
  Gap,
} from "../GlobalStyles";

type FrameComponent1Props = {
  onBusTicketPress?: () => void;
};

const FrameComponent1 = ({ onBusTicketPress }: FrameComponent1Props) => {
  return (
    <View style={styles.frameWrapper}>
      <View style={styles.frameParent}>
        <View style={[styles.frameContainer, styles.frameContainerLayout]}>
          <View style={[styles.busTicketParent, styles.frameContainerLayout]}>
            <Text style={[styles.busTicket, styles.busTicketTypo]}>
              Bus Ticket
            </Text>
            <Text style={[styles.dailyPass, styles.busTicketTypo]}>
              Daily Pass
            </Text>
          </View>
        </View>
        <View style={styles.frameGroup}>
          <Pressable
            style={[styles.rectangleParent, styles.frameChildLayout]}
            onPress={onBusTicketPress}
          >
            <View style={[styles.frameChild, styles.frameChildLayout]} />
            <Image
              style={styles.image10Icon}
              contentFit="cover"
              source={require("../assets/image-10.png")}
            />
          </Pressable>
          <View style={[styles.rectangleParent, styles.frameChildLayout]}>
            <View style={[styles.frameChild, styles.frameChildLayout]} />
            <Image
              style={styles.image10Icon}
              contentFit="cover"
              source={require("../assets/image-11.png")}
            />
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  frameContainerLayout: {
    height: Height.height_30,
    flexDirection: "row",
    zIndex: null,
  },
  busTicketTypo: {
    justifyContent: "center",
    alignItems: "center",
    display: "flex",
    textAlign: "center",
    color: Color.colorBlack,
    fontFamily: FontFamily.poppins,
    fontWeight: "700",
    fontSize: FontSize.fs_20,
    height: Height.height_30,
  },
  frameChildLayout: {
    borderWidth: 1,
    borderColor: Color.colorBlack,
    borderStyle: "solid",
    backgroundColor: Color.colorWhite,
    borderRadius: Border.br_16,
    elevation: 4,
    boxShadow: BoxShadow.shadow_drop,
    width: Width.width_140,
    height: Height.height_60,
  },
  frameWrapper: {
    width: 320,
    paddingLeft: Padding.padding_8,
    flexDirection: "row",
    height: Height.height_90,
    zIndex: null,
  },
  frameParent: {
    width: 312,
    height: Height.height_90,
    zIndex: null,
  },
  frameContainer: {
    width: 295,
    paddingLeft: Padding.padding_17,
  },
  busTicketParent: {
    width: 278,
    gap: Gap.gap_64,
  },
  busTicket: {
    width: 108,
  },
  dailyPass: {
    width: 109,
  },
  frameGroup: {
    gap: Gap.gap_32,
    height: Height.height_60,
    width: 312,
    flexDirection: "row",
    zIndex: null,
  },
  rectangleParent: {
    paddingHorizontal: 52,
    paddingVertical: Padding.padding_12,
    flexDirection: "row",
  },
  frameChild: {
    display: "none",
  },
  image10Icon: {
    height: Height.height_36,
    width: Width.width_36,
    zIndex: 1,
  },
});

export default FrameComponent1;
