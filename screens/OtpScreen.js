import React, { useState, useEffect, useRef } from "react";
import { View, Text, Alert, StyleSheet, Keyboard, Animated, Platform, ScrollView, TouchableWithoutFeedback, Easing, Dimensions } from "react-native";
import Header from "../components/Header";
import Buttons from "../components/Buttons";
import OtpInput from "../components/OtpInput"; 

const { height } = Dimensions.get("window");

const OtpScreen = ({ navigation, route }) => {
  const { email, phoneNumber } = route.params || {};
  const [otp, setOtp] = useState(["", "", "", ""]);

  // Animated values for header and content (OTP elements)
  const headerSlideAnim = useRef(new Animated.Value(0)).current; 
  const contentSlideAnim = useRef(new Animated.Value(0)).current;

  // Keyboard listeners for animation
  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener("keyboardDidShow", () => {
      Animated.parallel([
        Animated.timing(headerSlideAnim, {
          toValue: -50, // Slide up header
          duration: 300,
          easing: Easing.ease,
          useNativeDriver: true,
        }),
        Animated.timing(contentSlideAnim, {
          toValue: -50, // Slide up content
          duration: 300,
          easing: Easing.ease,
          useNativeDriver: true,
        }),
      ]).start();
    });

    const keyboardDidHideListener = Keyboard.addListener("keyboardDidHide", () => {
      Animated.parallel([
        Animated.timing(headerSlideAnim, {
          toValue: 0,
          duration: 300,
          easing: Easing.ease,
          useNativeDriver: true,
        }),
        Animated.timing(contentSlideAnim, {
          toValue: 0,
          duration: 300,
          easing: Easing.ease,
          useNativeDriver: true,
        }),
      ]).start();
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
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps="handled">
        <View style={styles.container}>
          {/* Animated Header */}
          <Animated.View style={[styles.headerContainer, { transform: [{ translateY: headerSlideAnim }] }]}>
            <Header />
          </Animated.View>

          {/* Animated Content */}
          <Animated.View style={[styles.otpSection, { transform: [{ translateY: contentSlideAnim }] }]}>
            <Text style={styles.title}>Enter OTP</Text>
            <Text style={styles.subtitle}>
              You will receive an OTP verification to {phoneNumber || email}.
            </Text>

            <View style={styles.OtpInputWrapper}>
              <OtpInput otp={otp} setOtp={setOtp} />
            </View>

            <Buttons title="SUBMIT OTP" onPress={handleSubmitOtp} customStyle={styles.sendOtpButton} />

            <Text style={styles.footerText}>
              Not a Member?{" "}
              <Text style={styles.registerText} onPress={() => navigation.navigate("SignUp")}>
                Register Now
              </Text>
            </Text>
          </Animated.View>
        </View>
      </ScrollView>
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
  },
  otpSection: {
    padding: 20,
    justifyContent: "center",
    marginTop: 35,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#000",
    textAlign: "center",
  },
  subtitle: {
    fontSize: 14,
    color: "#666",
    marginVertical: 20,
    textAlign: "center",
  },
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
    alignItems: "center",
    marginTop: 25,
  },
  sendOtpButton: {
    backgroundColor: "#007BFF",
    marginTop: 15,
    paddingVertical: 15,
    borderRadius: 10,
  },
});

export default OtpScreen;
