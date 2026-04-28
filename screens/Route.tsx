import * as React from "react";
import { ScrollView, StyleSheet, View, Text, Pressable, TextInput } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import { MaterialCommunityIcons, Ionicons, Feather } from "@expo/vector-icons";
import BottomNavigation from "../components/BottomNavigation";
import {
  FontFamily,
  Color,
  Border,
  BoxShadow,
  Padding,
} from "../GlobalStyles";
import { useAppTheme } from "../context/ThemeContext";

const Route = () => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<any>();
  const { themeColors } = useAppTheme();

  // Interactive State
  const [fromLocation, setFromLocation] = React.useState("");
  const [toLocation, setToLocation] = React.useState("");

  const handleSwap = () => {
    const temp = fromLocation;
    setFromLocation(toLocation);
    setToLocation(temp);
  };

  return (
    <SafeAreaView style={[styles.route, { backgroundColor: themeColors.background }]} edges={["top", "left", "right"]}>
      {/* Header */}
      <View style={[styles.headerContainer, { paddingTop: Math.max(insets.top, 16) }]}>
        <View style={styles.headerRow}>
          <Pressable onPress={() => navigation.navigate("Menu")}>
            <Feather name="menu" size={32} color={themeColors.text} />
          </Pressable>
          <Text style={[styles.planYourRoute, { color: themeColors.text }]}>Plan your route</Text>
          <Pressable onPress={() => {}}>
            <MaterialCommunityIcons name="bell" size={28} color={themeColors.text} />
          </Pressable>
        </View>
      </View>

      <ScrollView
        style={styles.scrollArea}
        contentContainerStyle={styles.routeScrollViewContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {/* Input Forms Group */}
        <View style={styles.formGroup}>
          
          {/* FROM Card */}
          <View style={[styles.inputCard, { backgroundColor: themeColors.cardBackground, borderColor: themeColors.divider }]}> 
            <View style={styles.inputRow}>
              <View style={styles.iconWrapper}>
                <Ionicons name="ellipse-outline" size={24} color={themeColors.text} style={{ fontWeight: '900' }} />
              </View>
              <TextInput 
                style={[styles.textInputLabel, { color: themeColors.text }]}
                value="From"
                editable={false}
              />
            </View>
            
            <View style={styles.dividerWrapper}>
              <View style={[styles.hollowDivider, { borderColor: themeColors.divider }]} />
            </View>
            
            <View style={styles.inputRow}>
              <View style={styles.iconWrapper}>
                <Ionicons name="radio-button-on" size={24} color={themeColors.text} />
              </View>
              <TextInput 
                style={[styles.textInputActive, { color: fromLocation ? themeColors.text : themeColors.subText }]}
                value={fromLocation}
                onChangeText={setFromLocation}
                placeholder="Current location"
                placeholderTextColor={themeColors.subText}
              />
            </View>
          </View>

          {/* Swap Button overlay */}
          <View style={styles.swapButtonWrapper} pointerEvents="box-none">
            <Pressable style={[styles.swapButton, { backgroundColor: themeColors.cardBackground, borderColor: themeColors.divider }]} onPress={handleSwap}>
              <Ionicons name="swap-vertical" size={24} color={themeColors.text} style={styles.swapIcon} />
            </Pressable>
          </View>

          {/* TO Card */}
          <View style={[styles.inputCard, { marginTop: 12, backgroundColor: themeColors.cardBackground, borderColor: themeColors.divider }]}> 
            <View style={styles.inputRow}>
              <View style={styles.iconWrapper}>
                <Ionicons name="ellipse-outline" size={24} color={themeColors.text} style={{ fontWeight: '900' }} />
              </View>
              <TextInput 
                style={[styles.textInputLabel, { color: themeColors.text }]}
                value="To"
                editable={false}
              />
            </View>

            <View style={styles.dividerWrapper}>
              <View style={[styles.hollowDivider, { borderColor: themeColors.divider }]} />
            </View>

            <View style={styles.inputRow}>
              <View style={styles.iconWrapper}>
                <Ionicons name="radio-button-on" size={24} color={themeColors.text} />
              </View>
              <TextInput 
                style={[styles.textInputActive, { color: toLocation ? themeColors.text : themeColors.subText }]}
                value={toLocation}
                onChangeText={setToLocation}
                placeholder="Enter destination"
                placeholderTextColor={themeColors.subText}
              />
            </View>
          </View>

        </View>

        {/* Find Route Button */}
        <View style={styles.routeButtonWrapper}>
          <Pressable
            style={[styles.routeButton, { borderColor: themeColors.divider }]}
            onPress={() => navigation.navigate("SearchResults")}
          >
            <Text style={styles.findRoute}>Find Route</Text>
          </Pressable>
        </View>

        {/* Recent Searches Title */}
        <Text style={[styles.sectionTitle, { color: themeColors.text }]}>Recent Searches</Text>

        {/* Recent Search Cards */}
        <View style={styles.recentSearchesContainer}>
          {[
            { name: "City Center", dist: "12KM" },
            { name: "Mall Road", dist: "8KM" },
            { name: "Bus Depot", dist: "5KM" }
          ].map((item, index) => (
            <Pressable key={index} style={[styles.recentSearchCard, { backgroundColor: themeColors.cardBackground, borderColor: themeColors.divider }]} onPress={() => setToLocation(item.name)}>
              <View style={styles.recentIconWrapper}>
                <MaterialCommunityIcons name="map-marker-radius-outline" size={26} color={themeColors.text} style={{ fontWeight: '900' }} />
              </View>
              <Text style={[styles.recentSearchName, { color: themeColors.text }]}>{item.name}</Text>
              <Text style={[styles.recentSearchDist, { color: themeColors.subText }]}>{item.dist}</Text>
            </Pressable>
          ))}
        </View>

      </ScrollView>

      <BottomNavigation />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  route: {
    width: "100%",
    backgroundColor: Color.colorGainsboro || "#DDE3EB",
    flex: 1,
  },
  headerContainer: {
    width: "100%",
    paddingBottom: 20,
  },
  headerRow: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 24,
  },
  planYourRoute: {
    fontSize: 24,
    fontWeight: "900",
    color: Color.colorBlack,
    fontFamily: FontFamily.poppins,
    textAlign: "center",
  },
  scrollArea: {
    flex: 1,
  },
  routeScrollViewContent: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-start",
    gap: 16,
    paddingBottom: 40,
  },

  /* Input Group */
  formGroup: {
    width: "100%",
    paddingHorizontal: 20,
    position: 'relative',
    marginTop: 4,
  },
  inputCard: {
    backgroundColor: Color.colorWhite,
    borderRadius: Border.br_16,
    borderWidth: 1.5,
    borderColor: Color.colorBlack,
    paddingVertical: 14,
    paddingHorizontal: 16,
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconWrapper: {
    width: 32,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 8,
  },
  textInputLabel: {
    flex: 1,
    fontFamily: FontFamily.poppins,
    fontSize: 18,
    color: Color.colorBlack,
    paddingVertical: 4,
  },
  textInputActive: {
    flex: 1,
    fontFamily: FontFamily.poppins,
    fontSize: 18,
    color: Color.colorBlack,
    paddingVertical: 4,
  },
  dividerWrapper: {
    width: "100%",
    paddingLeft: 40,
    paddingRight: 10,
    marginVertical: 4,
  },
  hollowDivider: {
    height: 6,
    width: "100%",
    borderRadius: 3,
    borderWidth: 1.5,
    borderColor: Color.colorBlack,
  },

  /* Swap Overlay */
  swapButtonWrapper: {
    position: "absolute",
    right: 48,
    top: "50%",
    marginTop: -22, // roughly half the heights to center it directly over the 12px gap
    zIndex: 10,
    elevation: 10,
  },
  swapButton: {
    width: 44,
    height: 44,
    backgroundColor: Color.colorWhite,
    borderRadius: 22,
    borderWidth: 1.5,
    borderColor: Color.colorBlack,
    justifyContent: "center",
    alignItems: "center",
    elevation: 6,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  swapIcon: {
    marginTop: 2, // Slight optical alignment inside circle
  },

  /* Find Route */
  routeButtonWrapper: {
    width: "100%",
    paddingHorizontal: 20,
    marginTop: 8,
  },
  routeButton: {
    width: "100%",
    height: 64,
    borderWidth: 1.5,
    borderColor: Color.colorBlack,
    backgroundColor: "#2563EB", // Bright blue to match design
    borderRadius: Border.br_16,
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    alignItems: "center",
    justifyContent: "center",
  },
  findRoute: {
    color: Color.colorWhite,
    fontFamily: FontFamily.poppins,
    fontWeight: "800",
    fontSize: 24,
    textAlign: "center",
  },

  /* Recent Searches */
  sectionTitle: {
    fontFamily: FontFamily.poppins,
    fontWeight: "900",
    fontSize: 20,
    alignSelf: "flex-start",
    marginLeft: 24,
    color: Color.colorBlack,
    marginTop: 12,
    marginBottom: -4,
  },
  recentSearchesContainer: {
    width: "100%",
    paddingHorizontal: 20,
    gap: 12,
  },
  recentSearchCard: {
    width: "100%",
    backgroundColor: Color.colorWhite,
    borderRadius: Border.br_16,
    borderWidth: 1.5,
    borderColor: Color.colorBlack,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 18,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 3,
  },
  recentIconWrapper: {
    width: 32,
    justifyContent: "center",
    alignItems: "flex-start",
  },
  recentSearchName: {
    flex: 1,
    fontFamily: FontFamily.poppins,
    fontSize: 16,
    fontWeight: "600",
    color: Color.colorBlack,
    marginLeft: 8,
  },
  recentSearchDist: {
    fontFamily: FontFamily.poppins,
    fontSize: 16,
    fontWeight: "600",
    color: Color.colorBlack,
  }
});

export default Route;
