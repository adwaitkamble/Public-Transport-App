import * as React from "react";
import { ScrollView, StyleSheet, View, Text, Pressable } from "react-native";
import { Image } from "expo-image";
import { useNavigation } from "@react-navigation/native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import BottomNavigation from "../components/BottomNavigation";
import {
  Padding,
  Width,
  Color,
  Border,
  FontFamily,
  FontSize,
} from "../GlobalStyles";
import { useTheme } from "../context/ThemeContext";

const RouteCard = ({ bus1, bus2, time, transfers, crowdLevel, eta }: any) => {
  const navigation = useNavigation<any>();
  const { themeColors } = useTheme();
  return (
    <Pressable style={[styles.cardContainer, { backgroundColor: themeColors.cardBackground, borderColor: themeColors.divider }]} onPress={() => navigation.navigate("Map")}>
      <View style={styles.cardLeft}>
        <View style={styles.busNumberRow}>
          <View style={styles.busBadge}>
            <Text style={styles.busBadgeText}>{bus1}</Text>
          </View>
          {bus2 && (
            <>
              <Text style={[styles.arrowText, { color: themeColors.text }]}>→</Text>
              <View style={styles.busBadge}>
                <Text style={styles.busBadgeText}>{bus2}</Text>
              </View>
            </>
          )}
        </View>

        <View style={styles.detailsColumn}>
          <Text style={[styles.timeText, { color: themeColors.text }]}>{time}</Text>
          <Text style={[styles.transferText, { color: themeColors.subText }]}>{transfers}</Text>
          <View style={styles.crowdRow}>
            <Text style={[styles.crowdLabel, { color: themeColors.subText }]}>Crowd</Text>
            <View
              style={[
                styles.crowdBadge,
                crowdLevel === "Medium" ? styles.crowdMedium :
                crowdLevel === "High" ? styles.crowdHigh :
                styles.crowdLow,
              ]}
            >
              <Text
                style={[
                  styles.crowdBadgeText,
                  crowdLevel === "High" && styles.crowdTextWhite,
                ]}
              >
                {crowdLevel}
              </Text>
            </View>
          </View>
        </View>
      </View>

      <View style={styles.cardRight}>
        <Image
          style={styles.starIcon}
          source={require("../assets/image-44.png")}
          contentFit="contain"
        />
        <View style={styles.etaContainer}>
          <Text style={[styles.etaLabel, { color: themeColors.subText }]}>ETA</Text>
          <Text style={[styles.etaValue, { color: themeColors.primary }]}>{eta}</Text>
        </View>
      </View>
    </Pressable>
  );
};

type SearchResultsProps = {
  embedded?: boolean;
};

const SearchResults = ({ embedded = false }: SearchResultsProps) => {
  const insets = useSafeAreaInsets();
  const { themeColors } = useTheme();
  return (
    <View style={[styles.searchResults, { backgroundColor: themeColors.background }, embedded && styles.searchResultsEmbedded]}>
      {/* Header */}
      {!embedded && (
        <View style={[styles.headerContainer, { paddingTop: Math.max(insets.top, 16), backgroundColor: themeColors.headerBg }]}> 
          <View style={styles.headerRow}>
            <Pressable onPress={() => {}}>
              <Image
                style={styles.headerIcon}
                contentFit="contain"
                source={require("../assets/image-21.png")}
              />
            </Pressable>
            <Text style={[styles.headerTitle, { color: themeColors.text }]}>Route Results</Text>
            <Pressable onPress={() => {}}>
              <Image
                style={styles.headerIcon}
                contentFit="contain"
                source={require("../assets/image-3.png")}
              />
            </Pressable>
          </View>
        </View>
      )}
      {!embedded && <View style={[styles.headerDivider, { backgroundColor: themeColors.divider }]} />}

      <ScrollView
        style={[{ flex: 1 }, embedded && styles.searchResultsEmbedded]}
        contentContainerStyle={[
          styles.searchResultsScrollViewContent,
          embedded && styles.searchResultsScrollViewContentEmbedded,
        ]}
        showsVerticalScrollIndicator={false}
        scrollEnabled={!embedded}
      >
        <Text style={[styles.sectionTitle, { color: themeColors.text }]}>Recommended</Text>
        <RouteCard
          bus1="21 A"
          bus2="45 B"
          time="10 : 25 AM - 11 : 00 AM"
          transfers="1 Transfers"
          crowdLevel="Medium"
          eta="35 min"
        />

        <Text style={[styles.sectionTitle, { marginTop: 4, color: themeColors.text }]}>All Routes Found</Text>

        <RouteCard
          bus1="21 A"
          bus2="45 B"
          time="10 : 25 AM - 11 : 00 AM"
          transfers="1 Transfers"
          crowdLevel="Medium"
          eta="35 min"
        />

        <RouteCard
          bus1="12 C"
          time="10 : 30 AM - 11 : 00 AM"
          transfers="0 Transfers"
          crowdLevel="High"
          eta="30 min"
        />

        <RouteCard
          bus1="21 A"
          bus2="19 A"
          time="10 : 25 AM - 11 : 05 AM"
          transfers="1 Transfers"
          crowdLevel="Low"
          eta="40 min"
        />
      </ScrollView>
      {!embedded ? <BottomNavigation /> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  searchResults: {
    width: "100%",
    backgroundColor: Color.colorGainsboro,
    flex: 1,
  },
  searchResultsEmbedded: {
    flex: 0,
  },
  headerContainer: {
    width: "100%",
    paddingHorizontal: 20,
    paddingBottom: 16,
    backgroundColor: Color.colorGainsboro,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  headerIcon: {
    width: 26,
    height: 26,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: "900",
    color: Color.colorBlack,
    fontFamily: FontFamily.poppins,
  },
  headerDivider: {
    width: "100%",
    height: 1,
    backgroundColor: Color.colorBlack,
  },
  searchResultsScrollViewContent: {
    flexDirection: "column",
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 24,
    gap: 12,
  },
  searchResultsScrollViewContentEmbedded: {
    paddingTop: 16,
    paddingBottom: 8,
  },
  sectionTitle: {
    fontFamily: FontFamily.poppins,
    fontSize: FontSize.fs_20,
    fontWeight: "900",
    color: Color.colorBlack,
    alignSelf: "flex-start",
    marginBottom: -2,
    marginLeft: 4,
  },
  cardContainer: {
    width: "100%",
    backgroundColor: Color.colorWhite,
    borderRadius: Border.br_16,
    paddingVertical: 14,
    paddingHorizontal: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 1,
    borderColor: Color.colorBlack,
    borderStyle: "solid",
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  cardLeft: {
    flex: 1,
    justifyContent: "flex-start",
    gap: 8,
  },
  busNumberRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  busBadge: {
    backgroundColor: Color.colorRoyalblue,
    borderRadius: Border.br_8,
    paddingVertical: 4,
    paddingHorizontal: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  busBadgeText: {
    color: Color.colorWhite,
    fontFamily: FontFamily.poppins,
    fontWeight: "700",
    fontSize: FontSize.fs_12,
  },
  arrowText: {
    fontSize: FontSize.fs_16,
    color: Color.colorBlack,
    fontFamily: FontFamily.poppins,
    fontWeight: "600",
  },
  detailsColumn: {
    gap: 4,
  },
  timeText: {
    fontFamily: FontFamily.inter,
    fontSize: FontSize.fs_12,
    fontWeight: "400",
    color: Color.colorBlack,
  },
  transferText: {
    fontFamily: FontFamily.inter,
    fontSize: FontSize.fs_12,
    fontWeight: "400",
    color: Color.colorBlack,
  },
  crowdRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 36,
  },
  crowdLabel: {
    fontFamily: FontFamily.inter,
    fontSize: FontSize.fs_12,
    fontWeight: "400",
    color: Color.colorBlack,
  },
  crowdBadge: {
    borderRadius: Border.br_8,
    paddingVertical: 2,
    paddingHorizontal: 14,
    borderWidth: 1,
    borderColor: Color.colorBlack,
    borderStyle: "solid",
    alignItems: "center",
    justifyContent: "center",
    minWidth: 70,
  },
  crowdMedium: {
    backgroundColor: Color.colorGoldenrod,
  },
  crowdLow: {
    backgroundColor: "#169e46",
  },
  crowdHigh: {
    backgroundColor: "#ef4242",
  },
  crowdBadgeText: {
    fontFamily: FontFamily.inter,
    fontSize: FontSize.fs_12,
    fontWeight: "500",
    color: Color.colorBlack,
  },
  crowdTextWhite: {
    color: Color.colorWhite,
  },
  cardRight: {
    alignItems: "center",
    justifyContent: "center",
  },
  starIcon: {
    width: 26,
    height: 26,
  },
  etaContainer: {
    alignItems: "center",
    marginTop: 2,
  },
  etaLabel: {
    fontFamily: FontFamily.poppins,
    fontSize: FontSize.fs_16,
    color: Color.colorBlack,
    fontWeight: "500",
  },
  etaValue: {
    fontFamily: FontFamily.inter,
    fontWeight: "900",
    fontSize: FontSize.fs_20,
    color: Color.colorMediumseagreen,
    marginTop: -4,
  },
});

export default SearchResults;
