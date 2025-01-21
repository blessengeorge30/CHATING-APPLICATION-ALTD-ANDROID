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
import OtpInput from "../components/OtpInput";

const { width, height } = Dimensions.get("window");
const OtpScreen = ({ navigation, route }) => {
  const { email, phoneNumber } = route.params || {};
  const [otp, setOtp] = useState(["", "", "", ""]);

  const handleSubmitOtp = () => {
    if (otp.join("").length < 4) {
      Alert.alert("Invalid OTP", "Please enter the 4-digit OTP.");
      return;
    }

    Alert.alert("Success", `OTP verified for ${email || phoneNumber}!`);
    navigation.navigate("Home");
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
            <Text style={styles.headerText}>Change Phone Number</Text>
          </View>

          <View style={styles.detailsSection}>

            <View style={styles.otpSection}>
              <Text style={styles.title}>Enter OTP</Text>
              <Text style={styles.subtitle}>
                You will receive an OTP verification to {phoneNumber || email}.
              </Text>

              <View style={styles.OtpInputWrapper}>
                {/* Using the OtpInput component */}
                <OtpInput otp={otp} setOtp={setOtp} />
              </View>

              <Buttons title="SUBMIT OTP" onPress={handleSubmitOtp} />


            </View>


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
    fontSize: height * 0.020,
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
    height: 800,
  },
  otpSection: { marginTop: 40, paddingHorizontal: 20 },
  title: { fontSize: 24, fontWeight: "bold", color: "#000", textAlign: "center" },
  subtitle: { fontSize: 14, color: "#666", textAlign: "center", marginVertical: 20 },
  footerText: {
    marginTop: 30,
    fontSize: 14,
    color: "#666",
    textAlign: "center",
  },
  registerText: {
    color: "#FFD700",
    fontWeight: "bold",
  },
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
  },
  backIcon: {
    height: 20,
    width: 20,
    marginRight: 2
  }, OtpInputWrapper: {
    alignItems: "center", marginTop: 25
  },
  OtpInputWrapper: {
    alignItems: "center", marginTop: 25
  },
});

export default OtpScreen;
