import * as React from "react";
import { StyleSheet, View } from "react-native";
import { Image } from "expo-image";
import { useNavigation } from "@react-navigation/native";

const SplashScreen = () => {
  const navigation = useNavigation<any>();

  React.useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace("Login");
    }, 2500); // Wait 2.5 seconds before navigating to Login

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Image
        style={styles.backgroundImage}
        contentFit="cover"
        source={require("../assets/image-45.png")}
        transition={500}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#206CEB", // Royal Blue background to match the top of image-45
  },
  backgroundImage: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
});

export default SplashScreen;
