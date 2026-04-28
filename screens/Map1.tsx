import * as React from "react";
import { StyleSheet, View, Text, ScrollView, useWindowDimensions, Pressable, Platform } from "react-native";
import { Image } from "expo-image";
import { WebView } from "react-native-webview";
import BottomNavigation from "../components/BottomNavigation";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import {
  Padding,
  Height,
  FontSize,
  Color,
  FontFamily,
  Border,
  BoxShadow,
  Width,
} from "../GlobalStyles";
import { useTheme } from "../context/ThemeContext";

type Map1Props = {
  embedded?: boolean;
};

const Map1 = ({ embedded = false }: Map1Props) => {
  const { height } = useWindowDimensions();
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<any>();
  const { themeColors } = useTheme();
  const mapHeight = embedded
    ? 230
    : height * 0.60; // 60% of the screen height

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
          .stop-marker {
            background-color: #EA4335;
            border: 2px solid white;
            border-radius: 50%;
          }
      </style>
  </head>
  <body>
      <div id="map"></div>
      <script>
          var map = L.map('map', { attributionControl: false }).setView([18.5204, 73.8567], 13);
          
          // Modern minimal map tiles
          L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
              maxZoom: 20
          }).addTo(map);

          var busIcon = L.divIcon({ className: 'bus-marker', iconSize: [22, 22] });
          var stopIcon = L.divIcon({ className: 'stop-marker', iconSize: [14, 14] });

          // Mock Bus Stops
          L.marker([18.5204, 73.8567], {icon: stopIcon}).addTo(map).bindPopup('Station');
          L.marker([18.5254, 73.8600], {icon: stopIcon}).addTo(map).bindPopup('MG Road');
          L.marker([18.5300, 73.8650], {icon: stopIcon}).addTo(map).bindPopup('City Center');

          // Live Bus Location
          L.marker([18.5230, 73.8580], {icon: busIcon}).addTo(map).bindPopup('<b>Bus 21 A</b><br>Arriving in 3 min').openPopup();

          var route = [[18.5204, 73.8567], [18.5230, 73.8580], [18.5254, 73.8600], [18.5300, 73.8650]];
          var polyline = L.polyline(route, {color: '#4285F4', weight: 4}).addTo(map);
          map.fitBounds(polyline.getBounds(), { padding: [20, 20] });
      </script>
  </body>
  </html>
  `;

  const content = (
    <View style={[styles.content, { backgroundColor: themeColors.background }]}> 
      <View style={styles.topSection}>
        <View style={styles.headerRow}>
          <Pressable style={styles.backIconWrapper}>
            <Image
              style={styles.backIcon}
              contentFit="contain"
              source={require("../assets/image-12.png")}
            />
          </Pressable>
          <Text style={[styles.title, { color: themeColors.text }]}>Bus 21 A</Text>
          <View style={styles.backIconWrapper} />
        </View>
        <Text style={[styles.subtitle, { color: themeColors.subText }]}>Station → City Center</Text>

        <View style={[styles.cardContainer, { backgroundColor: themeColors.cardBackground, borderColor: themeColors.divider }]}> 
          {Platform.OS === 'web' ? (
            <iframe
              srcDoc={mapHtml}
              style={{ width: "100%", height: mapHeight, border: 0, borderTopLeftRadius: 12, borderTopRightRadius: 12 }}
            />
          ) : (
            <View style={{ height: mapHeight, width: "100%", overflow: "hidden", borderTopLeftRadius: 12, borderTopRightRadius: 12 }}>
              <WebView
                originWhitelist={['*']}
                source={{ html: mapHtml }}
                style={{ flex: 1 }}
                nestedScrollEnabled={true}
              />
            </View>
          )}

          <View style={styles.etaCard}>
            <View style={styles.etaColumn}>
              <Text style={styles.etaLabel}>ETA</Text>
              <Text style={styles.etaValue}>3 min</Text>
            </View>
            <View style={styles.nextStopColumn}>
              <Text style={styles.nextStopLabel}>Next stop</Text>
              <Text style={styles.nextStopValue}>MG Road</Text>
            </View>
          </View>

          <View style={styles.crowdCard}>
            <Text style={styles.crowdTitle}>Crowd Level</Text>
            <View style={styles.crowdRow}>
              <Image
                style={styles.crowdIcon}
                contentFit="contain"
                source={require("../assets/image-13.png")}
              />
              <View style={styles.crowdBadge}>
                <Text style={styles.crowdBadgeText}>Medium</Text>
              </View>
            </View>
            <Pressable 
              style={styles.bookTicketButton}
              onPress={() => navigation.navigate("BusDetails")}
            >
              <Text style={styles.bookTicketText}>Book ticket</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </View>
  );

  if (embedded) {
    return (
      <View style={[styles.mapEmbedded, { paddingTop: Math.max(insets.top, Padding.padding_16) }]}>
        {content}
      </View>
    );
  }

  return (
    <View style={styles.map}>
      <ScrollView
        style={styles.mainContent}
        contentContainerStyle={[
          styles.mainContentContainer,
          { paddingTop: Math.max(insets.top, 16) },
        ]}
        showsVerticalScrollIndicator={false}
      >
        {content}
      </ScrollView>
      <BottomNavigation />
    </View>
  );
};

const styles = StyleSheet.create({
  map: {
    width: "100%",
    flex: 1,
  },
  mainContent: {
    flex: 1,
  },
  mainContentContainer: {
    alignItems: "center",
    justifyContent: "flex-start",
    paddingBottom: 24,
    flexGrow: 1,
  },
  mapEmbedded: {
    width: "100%",
    alignItems: "center",
    paddingBottom: 20,
  },
  content: {
    width: "100%",
    paddingHorizontal: 0,
    alignItems: "center",
    justifyContent: "flex-start",
    flex: 1,
  },
  topSection: {
    width: "100%",
    alignItems: "center",
    flex: 1,
  },
  headerRow: {
    width: "100%",
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 4,
  },
  backIconWrapper: {
    width: 32,
    height: 32,
    justifyContent: "center",
    alignItems: "center",
  },
  backIcon: {
    width: 24,
    height: 24,
  },
  title: {
    fontSize: 22,
    fontFamily: FontFamily.poppins,
    fontWeight: "900",
  },
  subtitle: {
    fontSize: 16,
    fontFamily: FontFamily.inter,
    fontWeight: "500",
    marginBottom: 16,
  },
  cardContainer: {
    width: "100%",
    flex: 1,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderRadius: Border.br_12, // Giving it standard border radius
    marginHorizontal: 0,
  },
  mapImage: {
    width: "100%",
    borderTopLeftRadius: Border.br_12,
    borderTopRightRadius: Border.br_12,
    borderBottomWidth: 1,
    borderColor: Color.colorBlack,
  },
  etaCard: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderColor: Color.colorBlack,
  },
  etaColumn: {
    gap: 4,
    width: "50%", // Keep spacing fixed
  },
  etaLabel: {
    color: Color.colorBlack,
    fontFamily: FontFamily.poppins,
    fontWeight: "900",
    fontSize: FontSize.fs_20,
  },
  etaValue: {
    color: "#03a124",
    fontFamily: FontFamily.poppins,
    fontWeight: "800",
    fontSize: 20,
  },
  nextStopColumn: {
    gap: 4,
    alignItems: "center", // Centering text slightly
  },
  nextStopLabel: {
    color: Color.colorBlack,
    fontFamily: FontFamily.poppins,
    fontWeight: "500",
    fontSize: 20,
  },
  nextStopValue: {
    color: Color.colorBlack,
    fontFamily: FontFamily.poppins,
    fontWeight: "700",
    fontSize: 18,
  },
  crowdCard: {
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 24,
    gap: 16,
  },
  crowdTitle: {
    color: Color.colorBlack,
    fontFamily: FontFamily.poppins,
    fontWeight: "900",
    fontSize: 20,
  },
  crowdRow: {
    alignItems: "center",
    justifyContent: "center",
    gap: 16,
    flexDirection: "row",
    marginBottom: 8,
  },
  crowdIcon: {
    width: 36,
    height: 36,
  },
  crowdBadge: {
    backgroundColor: Color.colorGoldenrod,
    borderRadius: Border.br_8,
    paddingHorizontal: 16,
    paddingVertical: 4,
    borderWidth: 1.5,
    borderColor: Color.colorBlack,
    alignItems: "center",
    justifyContent: "center",
  },
  crowdBadgeText: {
    color: Color.colorBlack,
    fontFamily: FontFamily.inter,
    fontWeight: "700",
    fontSize: 14, // Matches smaller size relative to other things
  },
  bookTicketButton: {
    width: "100%",
    height: 60,
    borderWidth: 1.5,
    borderColor: Color.colorBlack,
    backgroundColor: Color.colorRoyalblue,
    borderRadius: Border.br_16,
    alignItems: "center",
    justifyContent: "center",
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  bookTicketText: {
    color: Color.colorWhite,
    fontFamily: FontFamily.poppins,
    fontWeight: "800",
    fontSize: 22,
    textAlign: "center",
  },
});

export default Map1;