import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  Keyboard,
  Dimensions,
  TouchableWithoutFeedback,
  Platform
} from "react-native";
import Header from "../components/Header";
import Buttons from "../components/Buttons";
import OtpInput from "../components/OtpInput";

const { height } = Dimensions.get("window");

const OtpScreen = ({ navigation, route }) => {
  const { email, phoneNumber } = route.params || {};
  const [otp, setOtp] = useState(["", "", "", ""]);

  const [keyboardHeight, setKeyboardHeight] = useState(0);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener("keyboardDidShow", (event) => {
      const { height: keyboardHeight } = event.endCoordinates;
      setKeyboardHeight(keyboardHeight);
    });

    const keyboardDidHideListener = Keyboard.addListener("keyboardDidHide", () => {
      setKeyboardHeight(0);
    });

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  const handleSubmitOtp = () => {
    if (otp.join("").length < 4) {
      Alert.alert("Invalid OTP", "Please enter the 4-digit OTP.");
      return;
    }

    Alert.alert("Success", `OTP verified for ${email || phoneNumber}!`);
    navigation.navigate("Home");
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 20}
      >
        {/* Static Header */}
        <View style={styles.headerContainer}>
          <Header />
        </View>

        {/* OTP Section */}
        <View style={[styles.otpSection, { paddingBottom: keyboardHeight }]}>
          <Text style={styles.title}>Enter OTP</Text>
          <Text style={styles.subtitle}>
            You will receive an OTP verification to {phoneNumber || email}.
          </Text>

          <View style={styles.OtpInputWrapper}>
            <OtpInput otp={otp} setOtp={setOtp} />
          </View>

          <Buttons title="SUBMIT OTP" onPress={handleSubmitOtp} />

          <Text style={styles.footerText}>
            Not a Member?{" "}
            <Text
              style={styles.registerText}
              onPress={() => navigation.navigate("SignUp")}
            >
              Register Now
            </Text>
          </Text>
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  headerContainer: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#EDE63C",
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
    paddingBottom: 20, 
  },
  otpSection: {
    marginTop: 40,
    paddingHorizontal: 20,
  },
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
  OtpInputWrapper: { 
    alignItems: "center", marginTop: 25 
  },
});

export default OtpScreen;
