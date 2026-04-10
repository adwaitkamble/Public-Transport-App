import * as React from "react";
import { ScrollView, StyleSheet, View, Text, TextInput, Pressable } from "react-native";
import { Image } from "expo-image";
import { useNavigation } from "@react-navigation/native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import FrameComponent2 from "../components/FrameComponent2";
import {
  Padding,
  Width,
  Color,
  Border,
  FontFamily,
  FontSize,
} from "../GlobalStyles";

const CSSSearchIcon = () => (
  <View style={styles.cssSearchContainer}>
    <View style={styles.cssSearchCircle} />
    <View style={styles.cssSearchHandle} />
  </View>
);

const NearbyBusCard = ({ busNumber, routeText, crowdLevel, eta }: any) => {
  return (
    <Pressable style={styles.cardContainer}>
      <View style={styles.cardLeft}>
        <View style={styles.busBadge}>
          <Text style={styles.busBadgeText}>{busNumber}</Text>
        </View>
        <Text style={styles.routeText}>{routeText}</Text>
        <View style={styles.crowdRow}>
          <Text style={styles.crowdLabel}>Crowd</Text>
          <View
            style={[
              styles.crowdBadge,
              crowdLevel === "Medium" ? styles.crowdMedium : styles.crowdHigh,
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
      <View style={styles.cardRight}>
        <Text style={styles.etaLabel}>ETA</Text>
        <Text style={styles.etaValue}>{eta}</Text>
      </View>
    </Pressable>
  );
};

const Home = () => {
  const navigation = useNavigation<any>();
  const insets = useSafeAreaInsets();

  return (
    <View style={styles.home}>
      {/* Header */}
      <View style={[styles.header, { paddingTop: Math.max(insets.top, 16) }]}>
        <Pressable onPress={() => { }}>
          <Image
            style={styles.headerIcon}
            contentFit="contain"
            source={require("../assets/image-21.png")}
          />
        </Pressable>
        <Text style={styles.headerTitle}>Smart Bus</Text>
        <Pressable onPress={() => { }}>
          <Image
            style={styles.headerIcon}
            contentFit="contain"
            source={require("../assets/image-3.png")}
          />
        </Pressable>
      </View>

      <KeyboardAwareScrollView
        style={{ flex: 1 }}
        contentContainerStyle={styles.homeScrollView}
        showsVerticalScrollIndicator={false}
      >
        {/* Search Bar */}
        <View style={styles.searchBoxContainer}>
          <CSSSearchIcon />
          <TextInput
            style={styles.searchInput}
            placeholder="Where do you want to go?"
            placeholderTextColor="#888"
          />
        </View>

        {/* Action Buttons */}
        <View style={styles.actionRow}>
          <View style={styles.actionItem}>
            <Text style={styles.actionTitle}>Bus Ticket</Text>
            <Pressable style={styles.actionBox} onPress={() => navigation.navigate("Map")}>
              <Image
                style={styles.actionIcon}
                source={require("../assets/image-10.png")}
                contentFit="contain"
              />
            </Pressable>
          </View>
          <View style={styles.actionItem}>
            <Text style={styles.actionTitle}>Daily Pass</Text>
            <Pressable style={styles.actionBox} onPress={() => { }}>
              <Image
                style={styles.actionIcon}
                source={require("../assets/image-11.png")}
                contentFit="contain"
              />
            </Pressable>
          </View>
        </View>

        {/* Nearby Buses */}
        <Text style={[styles.sectionTitle, { marginTop: 4 }]}>Nearby Buses</Text>
        <View style={styles.busesContainer}>
          <NearbyBusCard
            busNumber="21A"
            routeText="Station → City Center"
            crowdLevel="Medium"
            eta="5 min"
          />
          <NearbyBusCard
            busNumber="21A"
            routeText="Station → City Center"
            crowdLevel="High"
            eta="2 min"
          />
        </View>

        {/* Live Map */}
        <Text style={[styles.sectionTitle, { marginTop: 4 }]}>Live Map</Text>
        <View style={styles.mapContainer}>
          <Image
            source={require("../assets/map-preview.png")}
            style={styles.mapImage}
            contentFit="cover"
          />
        </View>
      </KeyboardAwareScrollView>

      {/* Bottom Navigation */}
      <FrameComponent2 />
    </View>
  );
};

const styles = StyleSheet.create({
  home: {
    flex: 1,
    backgroundColor: Color.colorGainsboro,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingBottom: 16,
    backgroundColor: Color.colorGainsboro,
  },
  headerIcon: {
    width: 28,
    height: 28,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "900",
    color: Color.colorBlack,
    fontFamily: FontFamily.poppins,
  },
  homeScrollView: {
    paddingHorizontal: 20,
    paddingTop: 4,
    paddingBottom: 24,
    gap: 16,
  },
  searchBoxContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Color.colorWhite,
    borderWidth: 1.5,
    borderColor: Color.colorBlack,
    borderRadius: Border.br_12,
    paddingHorizontal: 16,
    height: 52,
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  cssSearchContainer: {
    width: 24,
    height: 24,
    marginRight: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  cssSearchCircle: {
    width: 14,
    height: 14,
    borderRadius: 7,
    borderWidth: 2,
    borderColor: Color.colorBlack,
    position: "absolute",
    top: 2,
    left: 2,
  },
  cssSearchHandle: {
    width: 2,
    height: 8,
    backgroundColor: Color.colorBlack,
    position: "absolute",
    bottom: 0,
    right: 2,
    transform: [{ rotate: "-45deg" }],
  },
  searchInput: {
    flex: 1,
    fontFamily: FontFamily.poppins,
    fontSize: FontSize.fs_16,
    color: Color.colorBlack,
  },
  actionRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 20,
  },
  actionItem: {
    flex: 1,
    gap: 8,
    alignItems: "center",
  },
  actionTitle: {
    fontFamily: FontFamily.poppins,
    fontWeight: "900",
    fontSize: FontSize.fs_16,
    color: Color.colorBlack,
  },
  actionBox: {
    backgroundColor: Color.colorWhite,
    borderWidth: 1.5,
    borderColor: Color.colorBlack,
    borderRadius: Border.br_16,
    width: "100%",
    height: 72,
    justifyContent: "center",
    alignItems: "center",
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  actionIcon: {
    width: 32,
    height: 32,
  },
  sectionTitle: {
    fontFamily: FontFamily.poppins,
    fontSize: 22,
    fontWeight: "900",
    color: Color.colorBlack,
  },
  busesContainer: {
    gap: 12,
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
    gap: 6,
  },
  busBadge: {
    backgroundColor: Color.colorRoyalblue,
    borderRadius: Border.br_8,
    paddingVertical: 4,
    paddingHorizontal: 16,
    alignSelf: "flex-start",
  },
  busBadgeText: {
    color: Color.colorWhite,
    fontFamily: FontFamily.poppins,
    fontWeight: "700",
    fontSize: FontSize.fs_12,
  },
  routeText: {
    fontFamily: FontFamily.inter,
    fontSize: FontSize.fs_12,
    fontWeight: "400",
    color: Color.colorBlack,
  },
  crowdRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 36,
    marginTop: 2,
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
    paddingHorizontal: 16,
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
    paddingRight: 4,
    marginBottom: -8,
  },
  etaLabel: {
    fontFamily: FontFamily.poppins,
    fontSize: FontSize.fs_12,
    color: Color.colorBlack,
    fontWeight: "500",
    marginBottom: -2,
  },
  etaValue: {
    fontFamily: FontFamily.inter,
    fontWeight: "900",
    fontSize: FontSize.fs_16,
    color: Color.colorMediumseagreen,
  },
  mapContainer: {
    width: "100%",
    height: 140,
    borderRadius: Border.br_12,
    borderWidth: 1,
    borderColor: Color.colorBlack,
    overflow: "hidden",
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  mapImage: {
    width: "100%",
    height: "100%",
  },
});

export default Home;
