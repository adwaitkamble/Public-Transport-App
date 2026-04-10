import * as React from "react";
import { StyleSheet, View, Text } from "react-native";
import { Image } from "expo-image";
import {
  Color,
  BoxShadow,
  Width,
  FontFamily,
  Border,
  Height,
  Padding,
  Gap,
  FontSize,
} from "../GlobalStyles";

type AdditionalInfoProps = {
  compact?: boolean;
  showBookTicket?: boolean;
};

const AdditionalInfo = ({
  compact = false,
  showBookTicket = true,
}: AdditionalInfoProps) => {
  return (
    <View
      style={[
        styles.additionalInfo,
        compact && styles.additionalInfoCompact,
        !showBookTicket && styles.additionalInfoNoBook,
      ]}
    >
      <View
        style={[
          styles.rideConditions,
          styles.rideLayout,
          compact && styles.rideLayoutCompact,
          compact && styles.rideConditionsCompact,
          !showBookTicket && styles.rideLayoutNoBook,
          !showBookTicket && styles.rideConditionsNoBook,
        ]}
      >
        <View style={[styles.rideConditionsChild, styles.rideLayout]} />
        <View style={[styles.currentState, compact && styles.currentStateCompact]}>
          <View
            style={[
              styles.crowdStatus,
              compact && styles.crowdStatusCompact,
              !showBookTicket && styles.crowdStatusNoBook,
            ]}
          >
            <View style={styles.statusInfo}>
              <Text
                style={[
                  styles.crowdLevel,
                  styles.crowdLevelFlexBox,
                  compact && styles.crowdLevelCompact,
                  !showBookTicket && styles.crowdLevelNoBook,
                ]}
              >
                Crowd Level
              </Text>
            </View>
            <View style={styles.levelIndicator}>
              <View style={styles.crowdIcon}>
                <Image
                  style={styles.image13Icon}
                  contentFit="cover"
                  source={require("../assets/image-13.png")}
                />
              </View>
              <View style={[styles.densityLabel, styles.densityLayout]}>
                <View
                  style={[styles.densityLabelChild, styles.densityLayout]}
                />
                <Text style={[styles.medium, styles.mediumPosition]}>
                  Medium
                </Text>
              </View>
            </View>
          </View>
        </View>
        {showBookTicket ? (
          <View
            style={[
              styles.bookingAction,
              styles.bookingLayout,
              compact && styles.bookingLayoutCompact,
              compact && styles.bookingActionCompact,
            ]}
          >
            <View style={[styles.bookingActionChild, styles.bookingLayout]} />
            <Text
              style={[
                styles.bookTicket,
                styles.mediumPosition,
                compact && styles.bookTicketCompact,
              ]}
            >
              Book ticket
            </Text>
          </View>
        ) : null}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  rideLayout: {
    borderWidth: 1,
    borderColor: Color.colorBlack,
    borderStyle: "solid",
    backgroundColor: Color.colorWhite,
    elevation: 4,
    boxShadow: BoxShadow.shadow_drop,
    height: 153,
    width: "100%",
  },
  crowdLevelFlexBox: {
    justifyContent: "center",
    textAlign: "center",
    fontFamily: FontFamily.poppins,
  },
  densityLayout: {
    backgroundColor: Color.colorGoldenrod,
    borderRadius: Border.br_8,
    width: Width.width_80,
    height: Height.height_32,
    borderWidth: 1,
    borderColor: Color.colorBlack,
    borderStyle: "solid",
  },
  mediumPosition: {
    zIndex: 4,
    alignItems: "center",
    display: "flex",
  },
  bookingLayout: {
    backgroundColor: Color.colorRoyalblue,
    borderRadius: Border.br_16,
    height: Height.height_60,
    width: Width.width_328,
    borderWidth: 1,
    borderColor: Color.colorBlack,
    borderStyle: "solid",
    elevation: 4,
    boxShadow: BoxShadow.shadow_drop,
  },
  additionalInfo: {
    height: 159,
    paddingBottom: Padding.padding_6,
    flexDirection: "row",
    width: "100%",
  },
  additionalInfoCompact: {
    height: 136,
    paddingBottom: Padding.padding_2,
  },
  additionalInfoNoBook: {
    height: 104,
    paddingBottom: 0,
  },
  rideConditions: {
    paddingHorizontal: Padding.padding_16,
    paddingTop: Padding.padding_5,
    paddingBottom: Padding.padding_10,
    gap: 13,
    zIndex: 2,
  },
  rideLayoutCompact: {
    height: 132,
  },
  rideLayoutNoBook: {
    height: 102,
  },
  rideConditionsCompact: {
    gap: Gap.gap_9,
    paddingTop: Padding.padding_3,
    paddingBottom: Padding.padding_6,
  },
  rideConditionsNoBook: {
    gap: 10,
    paddingTop: Padding.padding_8,
    paddingBottom: Padding.padding_8,
  },
  rideConditionsChild: {
    display: "none",
  },
  currentState: {
    width: 221,
    paddingLeft: Padding.padding_1,
    height: 65,
    flexDirection: "row",
  },
  currentStateCompact: {
    height: 52,
  },
  crowdStatus: {
    zIndex: null,
    alignItems: "flex-end",
    gap: Gap.gap_3,
    width: 220,
    height: 65,
  },
  crowdStatusCompact: {
    height: 52,
  },
  crowdStatusNoBook: {
    height: 72,
  },
  statusInfo: {
    justifyContent: "flex-end",
    paddingRight: 97,
    height: Height.height_30,
    zIndex: 3,
    width: 220,
    flexDirection: "row",
  },
  crowdLevel: {
    width: 126,
    fontSize: FontSize.fs_20,
    zIndex: 3,
    alignItems: "center",
    display: "flex",
    justifyContent: "center",
    textAlign: "center",
    color: Color.colorBlack,
    fontFamily: FontFamily.poppins,
    fontWeight: "600",
    height: Height.height_30,
  },
  crowdLevelCompact: {
    fontSize: FontSize.fs_16,
  },
  crowdLevelNoBook: {
    fontSize: FontSize.fs_20,
  },
  levelIndicator: {
    width: 115,
    gap: Gap.gap_11,
    height: Height.height_32,
    zIndex: 3,
    flexDirection: "row",
  },
  crowdIcon: {
    height: Height.height_28,
    paddingTop: Padding.padding_4,
    width: Width.width_24,
  },
  image13Icon: {
    height: Height.height_24,
    width: Width.width_24,
    zIndex: 3,
  },
  densityLabel: {
    paddingLeft: Padding.padding_17,
    paddingTop: Padding.padding_8,
    paddingRight: Padding.padding_16,
    paddingBottom: Padding.padding_9,
    zIndex: 3,
    flexDirection: "row",
  },
  densityLabelChild: {
    display: "none",
  },
  medium: {
    height: Height.height_15,
    width: 50,
    fontSize: FontSize.fs_12,
    fontFamily: FontFamily.inter,
    textAlign: "left",
    zIndex: 4,
    color: Color.colorBlack,
    fontWeight: "600",
  },
  bookingAction: {
    paddingLeft: 95,
    paddingTop: Padding.padding_12,
    paddingRight: 91,
    paddingBottom: Padding.padding_12,
    zIndex: 3,
    flexDirection: "row",
  },
  bookingActionCompact: {
    paddingTop: Padding.padding_10,
    paddingBottom: Padding.padding_10,
  },
  bookingActionChild: {
    display: "none",
  },
  bookingLayoutCompact: {
    height: 56,
  },
  bookTicket: {
    height: Height.height_36,
    width: 141,
    fontSize: FontSize.fs_24,
    fontWeight: "700",
    color: Color.colorWhite,
    justifyContent: "center",
    textAlign: "center",
    fontFamily: FontFamily.poppins,
    zIndex: 4,
  },
  bookTicketCompact: {
    fontSize: FontSize.fs_20,
  },
});

export default AdditionalInfo;
