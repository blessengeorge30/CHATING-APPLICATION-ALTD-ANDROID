import React, { useState } from "react";
import {
  Text,
  View,
  ImageBackground,
  StyleSheet,
  Dimensions,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import TextInputWithIcon from "../components/InputFeild";
import Buttons from "../components/Buttons";
import FloatingButton from "../components/FloatingButton";

const { width, height } = Dimensions.get("window");

const Editphone = () => {
  const navigation = useNavigation();
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isPhoneValid, setIsPhoneValid] = useState(true);

  const validatePhone = (text) => {
    const phoneRegex = /^[0-9]{10}$/;
    setPhoneNumber(text);
    setIsPhoneValid(phoneRegex.test(text));
  };

  const handleOTPVerification = () => {
    if (!phoneNumber) {
      Alert.alert("Error", "Please enter your phone number.");
      return;
    }

    if (!isPhoneValid) {
      Alert.alert("Error", "Please enter a valid 10-digit phone number.");
      return;
    }

    navigation.navigate("PhOtpScreen", { phoneNumber });
  };

  const handlePress = () => {
    console.log("Floating Button Pressed!");
  };

  return (
    <View style={styles.safeArea}>
      <View style={styles.container}>
        <ImageBackground
          source={require("../assets/HeaderIcons/splashbg.png")}
          style={styles.backgroundImage}
        >
          <View style={styles.headerContainer}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Image
                source={require("../assets/All_icons/back.png")}
                style={styles.backIcon}
                resizeMode="contain"
              />
            </TouchableOpacity>
            <Text style={styles.headerText}>Edit Phone</Text>
          </View>

          <View style={styles.detailsSection}>
            <View style={{ marginTop: 25 }}>
              <TextInputWithIcon
                imageSource={require("../assets/LoginIcons/phone.png")}
                placeholder="Enter Your Phone Number"
                value={phoneNumber}
                onChangeText={validatePhone}
                keyboardType="phone-pad"
                isValid={isPhoneValid}
                validIconSource={require("../assets/All_icons/tick1.png")}
                invalidIconSource={require("../assets/All_icons/cross1.png")}
              />
            </View>

            <Buttons title="Send OTP" onPress={handleOTPVerification} />
            <FloatingButton
              onPress={handlePress}
              imageSource={require("../assets/HomeScreenIcons/AddButton.png")}
              size={100}
            />
          </View>
        </ImageBackground>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 25,
    paddingVertical: height * 0.02,
    paddingHorizontal: width * 0.05,
    marginBottom: 60,
  },
  headerText: {
    marginLeft: width * 0.03,
    fontSize: height * 0.022,
    fontWeight: "bold",
  },
  detailsSection: {
    backgroundColor: "#fff",
    borderRadius: 30,
    padding: width * 0.05,
    marginTop: -height * 0.04,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    height: 730,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
  },
  backIcon: {
    height: 20,
    width: 20,
    marginRight: 2
  }
});

export default Editphone;
