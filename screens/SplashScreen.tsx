import * as React from "react";
import { ScrollView, StyleSheet } from "react-native";
import { Image } from "expo-image";
import { useNavigation } from "@react-navigation/native";
import { Color } from "../GlobalStyles";

const SplashScreen = () => {
  const navigation = useNavigation<any>();

  React.useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace("Home");
    }, 1800);

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <ScrollView
      style={styles.splashScreen}
      contentContainerStyle={styles.splashScreenScrollViewContent}
    >
      <Image
        style={styles.image45Icon}
        contentFit="cover"
        source={require("../assets/image-45.png")}
      />
      <Image
        style={styles.image46Icon}
        contentFit="cover"
        source={require("../assets/image-46.png")}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  splashScreenScrollViewContent: {
    flexDirection: "column",
    paddingTop: 61,
    alignItems: "flex-start",
    justifyContent: "flex-end",
    height: 800,
    flex: 1,
  },
  splashScreen: {
    width: "100%",
    backgroundColor: Color.colorGainsboro,
    flex: 1,
    maxWidth: "100%",
  },
  image45Icon: {
    height: 739,
    width: 361,
  },
  image46Icon: {
    height: 61,
    position: "absolute",
    top: 0,
    right: -1,
    width: 361,
  },
});

export default SplashScreen;
