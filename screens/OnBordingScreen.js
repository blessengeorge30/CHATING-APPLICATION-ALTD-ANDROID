import React, { useEffect } from "react";
import { View, Image, StyleSheet, Dimensions } from "react-native";
import { useNavigation } from "@react-navigation/native";

const { width, height } = Dimensions.get("window");

const Splash = () => {
  const navigation = useNavigation();

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      navigation.navigate("Login");
    }, 3000);

    return () => clearTimeout(timeoutId);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Image style={styles.backgroundImage} source={require("../assets/HeaderIcons/splashbg.png")} blurRadius={30}/>
      <Image style={styles.logoImage} source={require("../assets/HeaderIcons/logo.png")} />
      <Image style={styles.giftBoxImage} source={require("../assets/HeaderIcons/GiftBox.png")} />
      <Image style={styles.splashTextImage} source={require("../assets/OnBoardingIcons/WelcomeText.png")} />
      <Image style={styles.bottomImage} source={require("../assets/OnBoardingIcons/bg.png")} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  backgroundImage: {
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    height: "48%",
    width: "100%",
    position: "absolute",
  },
  logoImage: {
    height: "30%",
    width: "40%",
    position: "absolute",
    top: "10%",
    alignSelf: "center",
    resizeMode: "contain",
  },
  giftBoxImage: {
    height: "30%",
    width: "30%",
    position: "absolute",
    top: "18%",
    marginTop: 5,
    alignSelf: "center",
    resizeMode: "contain",
  },
  splashTextImage: {
    height: "30%",
    width: "70%",
    position: "absolute",
    top: "40%",
    marginTop: 5,
    alignSelf: "center",
    resizeMode: "contain",
  },
  bottomImage: {
    position: "absolute",
    bottom: -50,
    width: "100%",
    alignSelf: "center",
    resizeMode: "contain",
  },
});

export default Splash;
