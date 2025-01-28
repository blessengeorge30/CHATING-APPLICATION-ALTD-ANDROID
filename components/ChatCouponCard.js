import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Clipboard, Alert, Image } from "react-native";

const PromoCard = () => {
  const promoCode = "CODE123";

  const copyToClipboard = () => {
    Clipboard.setString(promoCode);
    Alert.alert("Copied to Clipboard", `Promo code ${promoCode} has been copied.`);
  };

  return (
    <View >
    
      <Image
        source={require("../assets/GroupViewIcons/coupon.png")}
        style={styles.image}
        resizeMode="cover"
      />

 
      {/* <Text style={styles.title}>Get a Combo Offer!</Text>
      <View style={styles.promoContainer}>
        <Text style={styles.promoCode}>{promoCode}</Text>
        <TouchableOpacity onPress={copyToClipboard} style={styles.copyButton}>
          <Text style={styles.copyText}>📋</Text>
        </TouchableOpacity>
      </View> */}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 15,
    borderWidth: 1,
    borderColor: "#E8E8E8",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
    margin: 10,
  },
  image: {
    width: "52.2%",
    height: 200, 
    borderRadius: 10,
    marginBottom: 10,
    margin: 3,
    marginTop: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
  },
  promoContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
    backgroundColor: "#F4F4F4",
    borderRadius: 5,
    padding: 10,
  },
  promoCode: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#333",
  },
  copyButton: {
    marginLeft: 10,
    padding: 5,
    backgroundColor: "#E8F7FF",
    borderRadius: 5,
  },
  copyText: {
    fontSize: 16,
    color: "#007BFF",
  },
});

export default PromoCard;
