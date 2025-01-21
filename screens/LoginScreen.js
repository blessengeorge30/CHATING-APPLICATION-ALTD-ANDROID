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
  Dimensions,
} from "react-native";
import TextInputWithIcon from "../components/InputFeild";
import Button from "../components/Buttons";
import Header from "../components/Header";

const { height } = Dimensions.get("window");

const PhoneSignInScreen = ({ navigation }) => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [phoneValid, setPhoneValid] = useState(true);


  const headerHeight = useRef(new Animated.Value(height * 0.4)).current;
  const contentHeight = useRef(new Animated.Value(1)).current;


  const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);

  // Adjustments when the keyboard is shown or hidden
  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener("keyboardDidShow", () => {
      setIsKeyboardVisible(true);
      // Animate header and content resizing
      Animated.parallel([
        Animated.timing(headerHeight, {
          toValue: height * 0.3,
          duration: 300,
          useNativeDriver: false,
        }),
        Animated.timing(contentHeight, {
          toValue: 0.6,
          duration: 300,
          useNativeDriver: false,
        }),
      ]).start();
    });

    const keyboardDidHideListener = Keyboard.addListener("keyboardDidHide", () => {
      setIsKeyboardVisible(false);
      // Reset header and content to original size
      Animated.parallel([
        Animated.timing(headerHeight, {
          toValue: height * 0.4,
          duration: 300,
          useNativeDriver: false,
        }),
        Animated.timing(contentHeight, {
          toValue: 1,
          duration: 300,
          useNativeDriver: false,
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
        keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 20}
      >
        <ScrollView contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps="handled">
          {/* Animated Header */}
          <Animated.View style={[styles.headerContainer, { height: headerHeight }]}>
            <Header />
          </Animated.View>

          {/* Main Content */}
          <Animated.View style={[styles.inner, { flex: contentHeight }]}>
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
    marginTop: 20,
  },
  sendOtpButton: {
    backgroundColor: "#007BFF",
    marginTop: 20,
    paddingVertical: 15,
    borderRadius: 10,
  },
  footerText: {
    marginTop: 20,
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
