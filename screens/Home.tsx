import * as React from "react";
import { ScrollView, StyleSheet, View, Text, TextInput, Pressable, ActivityIndicator, Platform } from "react-native";
import { Image } from "expo-image";
import { WebView } from "react-native-webview";
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
import { getBuses } from "../services/api";
import { useTheme } from "../context/ThemeContext";

const CSSSearchIcon = () => (
  <View style={styles.cssSearchContainer}>
    <View style={styles.cssSearchCircle} />
    <View style={styles.cssSearchHandle} />
  </View>
);

const NearbyBusCard = ({ busNumber, routeText, crowdLevel, eta, onPress, themeColors }: any) => {
  return (
    <Pressable style={[styles.cardContainer, { backgroundColor: themeColors.cardBackground }]} onPress={onPress}>
      <View style={styles.cardLeft}>
        <View style={styles.busBadge}>
          <Text style={styles.busBadgeText}>{busNumber}</Text>
        </View>
        <Text style={[styles.routeText, { color: themeColors.text }]}>{routeText}</Text>
        <View style={styles.crowdRow}>
          <Text style={styles.crowdLabel}>Crowd</Text>
          <View
            style={[
              styles.crowdBadge,
              crowdLevel === "Medium" ? styles.crowdMedium : 
              crowdLevel === "Low" ? styles.crowdLow : styles.crowdHigh,
            ]}
          >
            <Text
              style={[
                styles.crowdBadgeText,
                (crowdLevel === "High" || crowdLevel === "Low") && styles.crowdTextWhite,
              ]}
            >
              {crowdLevel}
            </Text>
          </View>
        </View>
      </View>
      <View style={styles.cardRight}>
        <Text style={[styles.etaLabel, { color: themeColors.subText }]}>ETA</Text>
        <Text style={[styles.etaValue, { color: themeColors.text }]}>{eta}</Text>
      </View>
    </Pressable>
  );
};

const Home = () => {
  const navigation = useNavigation<any>();
  const insets = useSafeAreaInsets();
  const { themeColors } = useTheme();
  const [buses, setBuses] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState(true);

  const mapHtml = `
  <!DOCTYPE html>
  <html>
  <head>
      <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
      <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
      <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
      <style>
          body { padding: 0; margin: 0; background-color: #f0f0f0; }
          #map { height: 100vh; width: 100vw; }
          .bus-marker {
            background-color: #4285F4;
            border: 3px solid white;
            border-radius: 50%;
            box-shadow: 0 0 10px rgba(0,0,0,0.5);
          }
      </style>
  </head>
  <body>
      <div id="map"></div>
      <script>
          var map = L.map('map', { attributionControl: false }).setView([18.5204, 73.8567], 13);
          
          L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
              maxZoom: 20
          }).addTo(map);

          var busIcon = L.divIcon({ className: 'bus-marker', iconSize: [22, 22] });

          L.marker([18.5230, 73.8580], {icon: busIcon}).addTo(map).bindPopup('<b>Bus 21 A</b><br>Station -> City Center');
          L.marker([18.5100, 73.8500], {icon: busIcon}).addTo(map).bindPopup('<b>Bus 45 B</b><br>Suburb -> Downtown');
          L.marker([18.5300, 73.8700], {icon: busIcon}).addTo(map).bindPopup('<b>Bus 12 C</b><br>IT Park -> Station');
      </script>
  </body>
  </html>
  `;

  React.useEffect(() => {
    const fetchBuses = async () => {
      try {
        const data = await getBuses();
        setBuses(data);
      } catch (error) {
        // Fallback to hardcoded data if API fails
        setBuses([
          { _id: "1", busNumber: "21A", routeName: "Station → City Center", crowdLevel: "Medium", eta: "5 min" },
          { _id: "2", busNumber: "45B", routeName: "Suburb → Downtown", crowdLevel: "High", eta: "2 min" },
        ]);
      } finally {
        setLoading(false);
      }
    };
    fetchBuses();
  }, []);

  return (
    <View style={[styles.home, { backgroundColor: themeColors.background }]}>
      {/* Header */}
      <View style={[styles.header, { paddingTop: Math.max(insets.top, 16), backgroundColor: themeColors.headerBg }]}>
        <Pressable onPress={() => navigation.navigate("Menu")}>
          <Image
            style={[styles.headerIcon, { tintColor: themeColors.icon }]}
            contentFit="contain"
            source={require("../assets/image-21.png")}
          />
        </Pressable>
        <Text style={[styles.headerTitle, { color: themeColors.text }]}>Smart Bus</Text>
        <Pressable onPress={() => { }}>
          <Image
            style={[styles.headerIcon, { tintColor: themeColors.icon }]}
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
        <View style={[styles.searchBoxContainer, { backgroundColor: themeColors.cardBackground }]}>
          <CSSSearchIcon />
          <TextInput
            style={[styles.searchInput, { color: themeColors.text }]}
            placeholder="Where do you want to go?"
            placeholderTextColor={themeColors.subText}
          />
        </View>

        {/* Action Buttons */}
        <View style={styles.actionRow}>
          <View style={styles.actionItem}>
            <Text style={[styles.actionTitle, { color: themeColors.text }]}>Bus Ticket</Text>
            <Pressable style={[styles.actionBox, { backgroundColor: themeColors.cardBackground }]} onPress={() => navigation.navigate("Map")}>
              <Image
                style={styles.actionIcon}
                source={require("../assets/image-10.png")}
                contentFit="contain"
              />
            </Pressable>
          </View>
          <View style={styles.actionItem}>
            <Text style={[styles.actionTitle, { color: themeColors.text }]}>Daily Pass</Text>
            <Pressable style={[styles.actionBox, { backgroundColor: themeColors.cardBackground }]} onPress={() => navigation.navigate("TicketBooking")}>
              <Image
                style={styles.actionIcon}
                source={require("../assets/image-11.png")}
                contentFit="contain"
              />
            </Pressable>
          </View>
        </View>

        {/* Nearby Buses */}
        <Text style={[styles.sectionTitle, { marginTop: 4, color: themeColors.text }]}>Nearby Buses</Text>
        <View style={styles.busesContainer}>
          {loading ? (
            <ActivityIndicator size="large" color={Color.colorRoyalblue} style={{ padding: 20 }} />
          ) : (
            buses.slice(0, 4).map((bus: any, index: number) => (
              <NearbyBusCard
                key={bus._id || index}
                busNumber={bus.busNumber}
                routeText={bus.routeName}
                crowdLevel={bus.crowdLevel}
                eta={bus.eta}
                onPress={() => navigation.navigate("BusDetails", { busId: bus._id })}
                themeColors={themeColors}
              />
            ))
          )}
        </View>

        {/* Live Map */}
        <Text style={[styles.sectionTitle, { marginTop: 4, color: themeColors.text }]}>Live Map</Text>
        <View style={[styles.mapContainer, { backgroundColor: themeColors.cardBackground }]}>
          {Platform.OS === 'web' ? (
            <iframe
              srcDoc={mapHtml}
              style={{ width: "100%", height: "100%", border: 0 }}
            />
          ) : (
            <WebView
              originWhitelist={['*']}
              source={{ html: mapHtml }}
              style={{ flex: 1 }}
              nestedScrollEnabled={true}
            />
          )}
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
