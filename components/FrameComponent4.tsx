import * as React from "react";
import { useState } from "react";
import { Text, StyleSheet, View } from "react-native";
import LocationRows from "./LocationRows";
import {
  Width,
  Padding,
  Gap,
  Height,
  FontSize,
  FontFamily,
  Color,
} from "../GlobalStyles";

const FrameComponent4 = () => {
  const [locationRowsItems] = useState([
    {
      locationLabelsWidth: 100,
      locationLabelsPaddingRight: 10,
      cityCenter: "City Center",
      cityCenterWidth: 93,
      kM: "12KM",
      kMWidth: 41,
    },
    {
      locationLabelsWidth: 104,
      locationLabelsPaddingRight: 25,
      cityCenter: "Mall Road",
      cityCenterWidth: 82,
      kM: "8KM",
      kMWidth: 37,
    },
    {
      locationLabelsWidth: 102,
      locationLabelsPaddingRight: 21,
      cityCenter: "Bus Depot",
      cityCenterWidth: 84,
      kM: "5KM",
      kMWidth: 37,
    },
  ]);

  return (
    <View style={styles.nearbyLocationsDataWrapper}>
      <View style={styles.nearbyLocationsData}>
        <Text style={styles.recentSearches}>Recent Searches</Text>
        {locationRowsItems.map((item, index) => (
          <LocationRows
            key={index}
            locationLabelsWidth={item.locationLabelsWidth}
            locationLabelsPaddingRight={item.locationLabelsPaddingRight}
            cityCenter={item.cityCenter}
            cityCenterWidth={item.cityCenterWidth}
            kM={item.kM}
            kMWidth={item.kMWidth}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  nearbyLocationsDataWrapper: {
    width: Width.width_344,
    height: 340,
    flexDirection: "row",
    paddingLeft: Padding.padding_16,
    paddingBottom: Padding.padding_9,
  },
  nearbyLocationsData: {
    height: 330,
    width: Width.width_328,
    gap: Gap.gap_15,
  },
  recentSearches: {
    width: Width.width_328,
    height: 32,
    fontSize: FontSize.fs_20,
    fontWeight: "700",
    fontFamily: FontFamily.poppins,
    color: Color.colorBlack,
    textAlign: "left",
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "flex-start",
  },
});

export default FrameComponent4;
