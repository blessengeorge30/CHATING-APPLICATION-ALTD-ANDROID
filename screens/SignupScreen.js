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
import firestore from "@react-native-firebase/firestore";

const SignUpScreen = ({ navigation }) => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [phoneValid, setPhoneValid] = useState(true);
  const [name, setName] = useState("");
  const [nameValid, setNameValid] = useState(true);

  const headerSlideAnim = useRef(new Animated.Value(0)).current;
  const contentSlideAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener("keyboardDidShow", () => {
      Animated.parallel([
        Animated.timing(headerSlideAnim, {
          toValue: -90,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(contentSlideAnim, {
          toValue: -110,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();
    });

    const keyboardDidHideListener = Keyboard.addListener("keyboardDidHide", () => {
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

  const validateName = (name) => {
    const nameRegex = /^[a-zA-Z\s]{3,}$/;
    setNameValid(nameRegex.test(name));
    setName(name);
  };

  const handleSignUp = async () => {
    if (!nameValid || name.length < 3) {
      Alert.alert("Invalid Input", "Please enter a valid name.");
      return;
    }
    if (!phoneValid || phoneNumber.length !== 10) {
      Alert.alert("Invalid Input", "Please enter a valid 10-digit phone number.");
      return;
    }

    try {
      await firestore().collection("users").doc(phoneNumber).set({
        name: name,
        phoneNumber: phoneNumber,
        createdAt: firestore.FieldValue.serverTimestamp(),
      });

      Alert.alert("Sign Up Successful", "User registered successfully.");
      navigation.navigate("Login");
    } catch (error) {
      console.error("Error saving user:", error);
      Alert.alert("Sign Up Failed", "Something went wrong. Please try again.");
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 70 : 15}
      >
        <ScrollView contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps="handled">
          <Animated.View style={[styles.headerContainer, { transform: [{ translateY: headerSlideAnim }] }]}>
            <Header />
          </Animated.View>

          <Animated.View style={[styles.inner, { transform: [{ translateY: contentSlideAnim }] }]}>
            <Text style={styles.title}>Register Now!</Text>
            <Text style={styles.subtitle}>Enter your phone number for verification.</Text>
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
              <Button title="Sign Up" onPress={handleSignUp} customStyle={styles.sendOtpButton} />
              <Text style={styles.footerText}>
                Already have an account?{" "}
                <Text style={styles.loginText} onPress={() => navigation.navigate("Login")}>
                  Log In
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

export default SignUpScreen;
