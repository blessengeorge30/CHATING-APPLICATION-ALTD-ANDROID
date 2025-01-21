import React, { useState } from "react";
import {
  View,
  Text,
  Alert,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import TextInputWithIcon from "../components/InputFeild";
import Button from "../components/Buttons";
import Header from "../components/Header"; 

const PhoneSignInScreen = ({ navigation }) => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [phoneValid, setPhoneValid] = useState(true);
  const [name, setName] = useState("");
  const [nameValid, setNameValid] = useState(true);

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
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
      >
       
        <Header />

        <Text style={styles.title}>Phone Number Sign-In</Text>
        <Text style={styles.subtitle}>
          Enter your phone number to receive a verification code.
        </Text>
        <View style={styles.inputSection}>
          <TextInputWithIcon
            imageSource={require("../assets/LoginIcons/profile.png")} // Replace with an appropriate icon for name
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
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#000",
    marginTop: 60, 
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
