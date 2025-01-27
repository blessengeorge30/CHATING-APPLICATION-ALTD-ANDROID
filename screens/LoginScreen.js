import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  Alert,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
  Animated,
} from "react-native";
import TextInputWithIcon from "../components/InputFeild";
import Button from "../components/Buttons";
import Header from "../components/Header";

const PhoneSignInScreen = ({ navigation }) => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [phoneValid, setPhoneValid] = useState(true);

  // Animated values for header and content (login elements)
  const headerSlideAnim = useRef(new Animated.Value(0)).current; 
  const contentSlideAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener("keyboardDidShow", () => {
      // Slide the header and content up slightly when the keyboard appears
      Animated.parallel([
        Animated.timing(headerSlideAnim, {
          toValue: -50, // Adjust to slide up the header
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(contentSlideAnim, {
          toValue: -50, // Adjust to slide up the login content
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();
    });

    const keyboardDidHideListener = Keyboard.addListener("keyboardDidHide", () => {
      // Reset header and content to original position when the keyboard disappears
      Animated.parallel([
        Animated.timing(headerSlideAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(contentSlideAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();
    });

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  const validatePhoneNumber = (phone) => {
    const phoneRegex = /^\d{10}$/;
    setPhoneValid(phoneRegex.test(phone));
    setPhoneNumber(phone);
  };

  const handleSendOtp = () => {
    if (!phoneValid || phoneNumber.length !== 10) {
      Alert.alert("Invalid Input", "Please enter a valid 10-digit phone number.");
      return;
    }

    Alert.alert("OTP Sent", "Please check your phone for the OTP.");
    navigation.navigate("OtpScreen", { phoneNumber });
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 70 : 15}
      >
        <ScrollView contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps="handled">
          {/* Animated Header */}
          <Animated.View style={[styles.headerContainer, { transform: [{ translateY: headerSlideAnim }] }]}>
            <Header />
          </Animated.View>

          {/* Main Content (Login elements) */}
          <Animated.View style={[styles.inner, { transform: [{ translateY: contentSlideAnim }] }]}>
            <Text style={styles.title}>Login</Text>
            <Text style={styles.subtitle}>Enter your phone number for verification.</Text>
            <View style={styles.inputSection}>
              <TextInputWithIcon
                imageSource={require("../assets/LoginIcons/phone.png")}
                placeholder="Enter Your Phone Number"
                value={phoneNumber}
                onChangeText={validatePhoneNumber}
                keyboardType="phone-pad"
                isValid={phoneValid}
                validIconSource={require("../assets/All_icons/tick1.png")}
                invalidIconSource={require("../assets/All_icons/cross1.png")}
              />
              <Button title="Send OTP" onPress={handleSendOtp} customStyle={styles.sendOtpButton} />
              <Text style={styles.footerText}>
                Already have an account?{" "}
                <Text style={styles.loginText} onPress={() => navigation.navigate("SignUp")}>
                  Register Now
                </Text>
              </Text>
            </View>
          </Animated.View>
        </ScrollView>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  headerContainer: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#EDE63C",
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
  },
  inner: {
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
    marginVertical: 10,
    textAlign: "center",
  },
  inputSection: {
    marginTop: 15, 
  },
  sendOtpButton: {
    backgroundColor: "#007BFF",
    marginTop: 15, 
    paddingVertical: 15,
    borderRadius: 10,
  },
  footerText: {
    marginTop: 15, 
    fontSize: 14,
    color: "#666",
    textAlign: "center",
  },
  loginText: {
    color: "#FFD700",
    fontWeight: "bold",
  },
});

export default PhoneSignInScreen;
