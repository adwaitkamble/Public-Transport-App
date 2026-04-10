import * as React from "react";
import { ScrollView, StyleSheet, View, Text, Pressable } from "react-native";
import { Image } from "expo-image";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import FrameComponent3 from "../components/FrameComponent3";
import FrameComponent4 from "../components/FrameComponent4";
import BottomNavigation from "../components/BottomNavigation";
import {
  FontFamily,
  Color,
  Border,
  BoxShadow,
  Height,
  Width,
  Padding,
  FontSize,
} from "../GlobalStyles";

const Route = () => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<any>();

  return (
    <SafeAreaView style={styles.route} edges={["top", "left", "right"]}>
      <View style={[styles.headerContainer, { paddingTop: insets.top }]}>
        <View style={styles.headerRow}>
          <Image
            style={styles.headerIcon}
            contentFit="cover"
            source={require("../assets/image-21.png")}
          />
          <Text style={styles.planYourRoute}>Plan your route</Text>
          <Image
            style={styles.headerIcon}
            contentFit="cover"
            source={require("../assets/image-3.png")}
          />
        </View>
      </View>

      <ScrollView
        style={styles.scrollArea}
        contentContainerStyle={styles.routeScrollViewContent}
        showsVerticalScrollIndicator={false}
      >
        <FrameComponent3 />

        <View style={styles.routeButtonWrapper}>
          <Pressable
            style={styles.routeButton}
            onPress={() => navigation.navigate("SearchResults")}
          >
            <Text style={styles.findRoute}>Find Route</Text>
          </Pressable>
        </View>

        <FrameComponent4 />
      </ScrollView>

      <BottomNavigation />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  route: {
    width: "100%",
    backgroundColor: Color.colorGainsboro,
    flex: 1,
    maxWidth: "100%",
  },
  headerContainer: {
    width: Width.width_344,
    paddingLeft: Padding.padding_16,
    paddingRight: Padding.padding_16,
    paddingBottom: 16,
    paddingTop: 12,
  },
  headerRow: {
    width: Width.width_328,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  headerIcon: {
    width: Width.width_24,
    height: Height.height_24,
  },
  planYourRoute: {
    fontSize: FontSize.fs_24,
    fontWeight: "800",
    color: Color.colorBlack,
    fontFamily: FontFamily.poppins,
    textAlign: "center",
  },
  scrollArea: {
    flex: 1,
  },
  routeScrollViewContent: {
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    gap: 14,
    paddingBottom: 20,
  },
  routeButtonWrapper: {
    width: Width.width_344,
    paddingLeft: Padding.padding_16,
    paddingRight: Padding.padding_16,
    marginTop: 4,
    flexDirection: "row",
  },
  routeButton: {
    width: Width.width_328,
    height: 70,
    borderWidth: 1,
    borderColor: Color.colorBlack,
    borderStyle: "solid",
    backgroundColor: Color.colorRoyalblue,
    borderRadius: Border.br_16,
    elevation: 4,
    boxShadow: BoxShadow.shadow_drop,
    alignItems: "center",
    justifyContent: "center",
  },
  findRoute: {
    color: Color.colorWhite,
    fontFamily: FontFamily.poppins,
    fontWeight: "700",
    fontSize: FontSize.fs_24,
    textAlign: "center",
  },
});

export default Route;
