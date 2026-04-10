import * as React from "react";
import { ScrollView, Text, StyleSheet, View, Pressable } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Image } from "expo-image";
import { useNavigation } from "@react-navigation/native";
import BottomNavigation from "../components/BottomNavigation";
import { MaterialCommunityIcons, FontAwesome } from "@expo/vector-icons";
import { Color, FontFamily, Border, BoxShadow } from "../GlobalStyles";

const StopItem = ({ title, time, isActive }: any) => {
  return (
    <View style={[styles.stopRow, isActive && styles.activeStopRow]}>
      {/* Node */}
      <View style={styles.nodeWrapper}>
        <View style={styles.nodeCircle}>
          {isActive && <View style={styles.nodeInnerCircle} />}
        </View>
      </View>

      {/* Pill */}
      {isActive ? (
        <View style={[styles.stopPill, styles.stopPillActive]}>
          <View style={styles.stopPillActiveInner}>
            <MaterialCommunityIcons name="radiobox-marked" size={24} color="black" style={{ marginRight: 8, display: 'none' }} />
            <Text style={[styles.stopPillTitle, { color: "white", flex: 1 }]}>{title}</Text>
          </View>
          <View style={styles.nextStopBadge}>
            <Text style={styles.nextTimeText}>{time}</Text>
            <Text style={styles.nextStopText}>Next Stop</Text>
          </View>
        </View>
      ) : (
        <View style={styles.stopPill}>
          <Text style={styles.stopPillTitle}>{title}</Text>
          <Text style={styles.stopPillTime}>{time}</Text>
        </View>
      )}
    </View>
  );
};

const BusDetails = () => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<any>();

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={[styles.headerContainer, { paddingTop: Math.max(insets.top, 16) }]}>
        <View style={styles.headerRow}>
          <Pressable onPress={() => navigation.goBack()}>
            <Image
              style={styles.headerIcon}
              contentFit="contain"
              source={require("../assets/image-21.png")}
            />
          </Pressable>
          <Text style={styles.headerTitle}>Bus 21 A</Text>
          <View style={styles.headerStarWrapper}>
            <FontAwesome name="star" size={28} color="#FFC107" />
            <View style={styles.starOutline}>
              <FontAwesome name="star-o" size={28} color="black" />
            </View>
          </View>
        </View>
        <View style={styles.headerDivider} />
      </View>

      <ScrollView
        style={styles.scrollArea}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Status Pill */}
        <View style={styles.statusBox}>
          <View style={styles.statusGreenBox}>
            <Text style={styles.statusGreenText}>On Time</Text>
          </View>
          <View style={styles.statusRightBox}>
            <Text style={styles.statusText}>
              Next arrival in <Text style={styles.statusGreenAlt}>3 min</Text>
            </Text>
          </View>
        </View>

        {/* Route Pill */}
        <View style={styles.routeBox}>
          <MaterialCommunityIcons name="bus-stop" size={28} color="black" />
          <Text style={styles.routeText}>Station → City Center</Text>
        </View>

        {/* Stats Row */}
        <View style={styles.statsRow}>
          <View style={styles.statBox}>
            <Text style={styles.statLabel}>Distance</Text>
            <Text style={styles.statValue}>7.2 KM</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statLabel}>Stops</Text>
            <Text style={styles.statValue}>8</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statLabel}>Duration</Text>
            <Text style={styles.statValue}>25 min</Text>
          </View>
        </View>

        {/* Stops Title */}
        <Text style={styles.sectionTitle}>Stops</Text>

        {/* Stops Container */}
        <View style={styles.stopsContainerWrapper}>
          <View style={styles.stopsContainer}>
            <View style={styles.verticalLineLine} />

            <StopItem title="Station" time="10 : 00 AM" />
            <StopItem title="Park Street" time="10 : 07 AM" />
            <StopItem title="MG Road" time="10 : 12 AM" isActive={true} />
            <StopItem title="City Hospital" time="10 : 18 AM" />
            <StopItem title="City Center" time="10 : 25 AM" />
          </View>
        </View>
      </ScrollView>

      <BottomNavigation />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.colorGainsboro || "#DDE3EB",
  },
  headerContainer: {
    width: "100%",
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingBottom: 16,
  },
  headerDivider: {
    width: "100%",
    height: 1.5,
    backgroundColor: Color.colorBlack,
  },
  headerIcon: {
    width: 32,
    height: 32,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: "900",
    color: Color.colorBlack,
    fontFamily: FontFamily.poppins,
    textAlign: "center",
  },
  headerStarWrapper: {
    width: 32,
    height: 32,
    position: "relative",
    justifyContent: "center",
    alignItems: "center",
  },
  starOutline: {
    position: "absolute",
    top: 0,
    left: 0,
  },
  scrollArea: {
    flex: 1,
  },
  scrollContent: {
    flexDirection: "column",
    paddingHorizontal: 20,
    paddingTop: 24,
    paddingBottom: 32,
    gap: 16,
  },

  /* Components */
  statusBox: {
    flexDirection: "row",
    alignItems: "center",
    height: 52,
    backgroundColor: Color.colorWhite,
    borderRadius: 26,
    borderWidth: 1.5,
    borderColor: Color.colorBlack,
    width: "100%",
  },
  statusGreenBox: {
    backgroundColor: "#2ECC71",
    height: "100%",
    borderTopLeftRadius: 24,
    borderBottomLeftRadius: 24,
    justifyContent: "center",
    paddingHorizontal: 24,
    borderRightWidth: 1.5,
    borderColor: Color.colorBlack,
  },
  statusGreenText: {
    color: Color.colorWhite,
    fontFamily: FontFamily.poppins,
    fontWeight: "800",
    fontSize: 14,
  },
  statusRightBox: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  statusText: {
    fontFamily: FontFamily.poppins,
    fontWeight: "800",
    fontSize: 14,
    color: Color.colorBlack,
  },
  statusGreenAlt: {
    color: "#2ECC71", // Matches "3 min" color
  },

  routeBox: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 16,
    height: 56,
    backgroundColor: Color.colorWhite,
    borderRadius: 16,
    borderWidth: 1.5,
    borderColor: Color.colorBlack,
    width: "100%",
  },
  routeText: {
    fontFamily: FontFamily.poppins,
    fontWeight: "900",
    fontSize: 18,
    color: Color.colorBlack,
  },

  statsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12,
    width: "100%",
  },
  statBox: {
    flex: 1,
    backgroundColor: Color.colorWhite,
    borderRadius: 16,
    borderWidth: 1.5,
    borderColor: Color.colorBlack,
    paddingVertical: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  statLabel: {
    fontFamily: FontFamily.poppins,
    fontWeight: "500",
    fontSize: 13,
    color: Color.colorBlack,
    marginBottom: 4,
  },
  statValue: {
    fontFamily: FontFamily.poppins,
    fontWeight: "800",
    fontSize: 15,
    color: Color.colorBlack,
  },

  sectionTitle: {
    fontFamily: FontFamily.poppins,
    fontWeight: "900",
    fontSize: 22,
    color: Color.colorBlack,
    alignSelf: "flex-start",
    marginTop: 4,
    marginBottom: 4,
  },

  stopsContainerWrapper: {
    width: "100%",
    backgroundColor: Color.colorWhite,
    borderRadius: 16,
    borderWidth: 1.5,
    borderColor: Color.colorBlack,
    overflow: "hidden",
    paddingBottom: 20,
    paddingTop: 20,
  },
  stopsContainer: {
    width: "100%",
    position: "relative",
  },
  verticalLineLine: {
    position: "absolute",
    top: 24,
    bottom: 24,
    left: 45, // 16px row padding + 16px to center of 32px node wrapper
    width: 4,
    backgroundColor: "#3B82F6",
    zIndex: 0,
  },
  stopRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    marginBottom: 16,
    zIndex: 1,
  },
  activeStopRow: {
    marginBottom: 16, // Ensure valid spacing remains equal
  },
  nodeWrapper: {
    width: 60,
    justifyContent: "center",
    alignItems: "center",
  },
  nodeCircle: {
    width: 26,
    height: 26,
    borderRadius: 13,
    borderWidth: 2.5,
    borderColor: Color.colorBlack,
    backgroundColor: Color.colorWhite,
    justifyContent: "center",
    alignItems: "center",
  },
  nodeInnerCircle: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: Color.colorBlack,
  },
  stopPill: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: Color.colorWhite,
    borderRadius: 20,
    borderWidth: 1.5,
    borderColor: Color.colorBlack,
    paddingHorizontal: 16,
    height: 44,
  },
  stopPillActive: {
    backgroundColor: "#2563EB",
    height: 52,
    paddingRight: 0, // specific padding to hug edge tightly for nested label
    borderWidth: 1.5,
  },
  stopPillActiveInner: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  stopPillTitle: {
    fontFamily: FontFamily.poppins,
    fontWeight: "900",
    fontSize: 16,
    color: Color.colorBlack,
  },
  stopPillTime: {
    fontFamily: FontFamily.poppins,
    fontWeight: "600",
    fontSize: 12,
    color: Color.colorBlack,
  },
  nextStopBadge: {
    backgroundColor: Color.colorWhite,
    height: "100%",
    borderTopRightRadius: 18,
    borderBottomRightRadius: 18,
    borderLeftWidth: 1.5,
    borderColor: Color.colorBlack,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 14,
    borderTopLeftRadius: 14,
    borderBottomLeftRadius: 14,
    marginLeft: -4,
  },
  nextTimeText: {
    fontFamily: FontFamily.poppins,
    fontWeight: "800",
    fontSize: 12,
    color: Color.colorBlack,
  },
  nextStopText: {
    fontFamily: FontFamily.poppins,
    fontWeight: "900",
    fontSize: 10,
    color: Color.colorBlack,
  }
});

export default BusDetails;
