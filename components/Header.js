import React from "react";
import { View, Image, StyleSheet } from "react-native";

const Header = () => {
  return (
    <View style={styles.header}>
      <Image source={require("../assets/HeaderIcons/logo.png")} style={styles.logo} />
      <Image
        style={styles.giftBoxImage}
        source={require("../assets/HeaderIcons/GiftBox.png")}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    paddingTop: 40,
  
  
    alignItems: "center",
    justifyContent: "center",
  },
  giftBoxImage: {
    height: 120,
    width: 120,
    marginTop: 5,
    alignSelf: "center",
    resizeMode: "contain",
  },
  logo: {
    marginTop: 70,
    width: 140,
    height: 120,
    marginBottom: -50,
  },
});

export default Header;
