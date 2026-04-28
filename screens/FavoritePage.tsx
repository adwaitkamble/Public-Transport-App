import * as React from "react";
import { ScrollView, StyleSheet, View, Text, Pressable } from "react-native";
import { Image } from "expo-image";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import BottomNavigation from "../components/BottomNavigation";
import { MaterialCommunityIcons, FontAwesome, Feather } from "@expo/vector-icons";
import {
  FontFamily,
  Color,
  Border,
} from "../GlobalStyles";
import { useTheme } from "../context/ThemeContext";

const RouteCard = ({
  iconType,
  iconContent,
  title,
  subtitle,
  time,
  isFilledStar,
}: any) => {
  return (
    <Pressable style={[styles.cardContainer, { backgroundColor: themeColors.cardBackground, borderColor: themeColors.divider }] }>
      {iconType === "boxIcon" ? (
        <View style={[styles.iconBox, { backgroundColor: themeColors.elevatedBackground, borderColor: themeColors.divider }] }>
          <MaterialCommunityIcons name={iconContent} size={42} color={themeColors.text} />
        </View>
      ) : (
        <View style={[styles.iconBox, { backgroundColor: Color.colorRoyalblue }]}>
          <Text style={styles.busBadgeText}>{iconContent}</Text>
        </View>
      )}

      <View style={styles.cardContent}>
        <Text style={[styles.cardTitle, { color: themeColors.text }]}>{title}</Text>
        <Text style={[styles.cardSubtitle, { color: themeColors.subText }]}>{subtitle}</Text>
      </View>

      <View style={styles.cardTimeContainer}>
        {isFilledStar ? (
          <View style={styles.starWrapper}>
             <FontAwesome name="star" size={24} color="#FFD700" />
             <View style={styles.starOutline}>
               <FontAwesome name="star-o" size={24} color={themeColors.text} />
             </View>
          </View>
        ) : (
          <View style={styles.starWrapper}>
             <FontAwesome name="star-o" size={24} color={themeColors.text} />
          </View>
        )}
        <Text style={[styles.etaText, { color: themeColors.text }]}>ETA</Text>
        <Text style={[styles.cardTime, { color: themeColors.primary }]}>{time}</Text>
      </View>
    </Pressable>
  );
};

const FavoritePage = () => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<any>();
  const { themeColors } = useTheme();

  return (
    <SafeAreaView style={[styles.favoritePage, { backgroundColor: themeColors.background }]} edges={["top", "left", "right"]}>
      <View style={[styles.headerContainer, { paddingTop: Math.max(insets.top, 16), backgroundColor: themeColors.headerBg }]}> 
        <View style={styles.headerRow}>
          <Pressable onPress={() => navigation.navigate("Menu")}>
            <Feather name="menu" size={32} color={themeColors.text} />
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
        <View style={styles.headerDivider} />
      </View>

      <ScrollView
        style={styles.scrollArea}
        contentContainerStyle={styles.favoritePageScrollViewContent}
        showsVerticalScrollIndicator={false}
      >
        <Text style={[styles.sectionTitle, { color: themeColors.text }]}>Saved Routes</Text>
        
        <RouteCard 
          iconType="boxIcon"
          iconContent="home"
          title="Home → College"
          subtitle="Bus 21A"
          time="20 min"
          isFilledStar={true}
          themeColors={themeColors}
        />
        <RouteCard 
          iconType="boxIcon"
          iconContent="briefcase-outline"
          title="Home → Work"
          subtitle="Bus 45 B"
          time="44 min"
          isFilledStar={true}
          themeColors={themeColors}
        />

        <View style={styles.spacer} />
        
        <Text style={[styles.sectionTitle, { color: themeColors.text }]}>Recent Trips</Text>
        
        <RouteCard 
          iconType="busBadge"
          iconContent="33 D"
          title="Mall"
          subtitle="Station → Mall"
          time="24 min"
          isFilledStar={false}
          themeColors={themeColors}
        />
        <RouteCard 
          iconType="busBadge"
          iconContent="12 C"
          title="Airport"
          subtitle="Airport → City Center"
          time="58 min"
          isFilledStar={false}
          themeColors={themeColors}
        />
        
      </ScrollView>

      <BottomNavigation />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  favoritePage: {
    width: "100%",
    flex: 1,
  },
  headerContainer: {
    width: "100%",
    position: "relative",
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
    fontFamily: FontFamily.poppins,
    textAlign: "center",
  },
  scrollArea: {
    flex: 1,
  },
  favoritePageScrollViewContent: {
    flexDirection: "column",
    paddingHorizontal: 20,
    paddingBottom: 32,
    gap: 12,
  },
  sectionTitle: {
    fontSize: 22,
    fontFamily: FontFamily.poppins,
    fontWeight: "900",
    marginBottom: 4,
    marginTop: 16,
  },
  cardContainer: {
    borderRadius: Border.br_16,
    borderWidth: 1.5,
    paddingHorizontal: 16,
    paddingVertical: 16,
    flexDirection: "row",
    alignItems: "center",
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  iconBox: {
    width: 72,
    height: 72,
    borderRadius: 16,
    borderWidth: 1.5,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  busBadgeText: {
    fontFamily: FontFamily.poppins,
    fontSize: 18,
    fontWeight: "900",
    color: Color.colorWhite,
  },
  cardContent: {
    flex: 1,
    justifyContent: "center",
    gap: 14,
  },
  cardTitle: {
    fontFamily: FontFamily.poppins,
    fontSize: 16,
    fontWeight: "800",
  },
  cardSubtitle: {
    fontFamily: FontFamily.poppins,
    fontSize: 14,
    fontWeight: "600",
  },
  cardTimeContainer: {
    justifyContent: "space-between",
    alignItems: "center",
    height: 72,
  },
  starWrapper: {
    width: 24,
    height: 24,
    position: "relative",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 4,
  },
  starOutline: {
    position: "absolute",
    top: 0,
    left: 0,
  },
  etaText: {
    fontFamily: FontFamily.poppins,
    fontSize: 14,
    fontWeight: "800",
  },
  cardTime: {
    fontFamily: FontFamily.poppins,
    fontSize: 16,
    fontWeight: "800",
    color: Color.colorMediumseagreen || "#2ECC71",
  },
  spacer: {
    height: 4,
  }
});

export default FavoritePage;
