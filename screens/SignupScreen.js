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
  const [name, setName] = useState("");
  const [nameValid, setNameValid] = useState(true);
  
  const headerHeight = useRef(new Animated.Value(height * 0.4)).current; 

  // Keyboard event listeners to animate header height
  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener("keyboardDidShow", () => {
      Animated.timing(headerHeight, {
        toValue: height * 0.3,
        duration: 300,
        useNativeDriver: false,
      }).start();
    });

    const keyboardDidHideListener = Keyboard.addListener("keyboardDidHide", () => {
      Animated.timing(headerHeight, {
        toValue: height * 0.4,
        duration: 300,
        useNativeDriver: false,
      }).start();
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

  const validateName = (name) => {
    const nameRegex = /^[a-zA-Z\s]{3,}$/;
    setNameValid(nameRegex.test(name));
    setName(name);
  };

  const handleSendOtp = () => {
    if (!nameValid || name.length < 3) {
      Alert.alert("Invalid Input", "Please enter a valid name.");
      return;
    }
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
          <Animated.View style={[styles.headerContainer, { height: headerHeight }]}>
            <Header />
          </Animated.View>

          {/* Main Content */}
          <View style={styles.inner}>
            <Text style={styles.title}>Register Now!</Text>
            <Text style={styles.subtitle}>
              Enter your phone number to receive a verification code.
            </Text>
            <View style={styles.inputSection}>
              <TextInputWithIcon
                imageSource={require("../assets/LoginIcons/profile.png")}
                placeholder="Enter Your Name"
                value={name}
                onChangeText={validateName}
                isValid={nameValid}
              />
              <TextInputWithIcon
                imageSource={require("../assets/LoginIcons/phone.png")}
                placeholder="Enter Your Phone Number"
                value={phoneNumber}
                onChangeText={validatePhoneNumber}
                keyboardType="phone-pad"
                isValid={phoneValid}
              />

              <Button
                title="Send OTP"
                onPress={handleSendOtp}
                customStyle={styles.sendOtpButton}
              />

              <Text style={styles.footerText}>
                Already have an account?{" "}
                <Text
                  style={styles.loginText}
                  onPress={() => navigation.navigate("Login")}
                >
                  Log In
                </Text>
              </Text>
            </View>
          </View>
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
    flex: 1,
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
    paddingHorizontal: 20,
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
