import React, { useState } from "react";
import {
  View,
  Text,
  Alert,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableOpacity,
  Image,
} from "react-native";
import TextInputWithIcon from "../components/InputFeild";
import Button from "../components/Buttons";
import Header from "../components/Header";

const EmailSignInScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailValid, setEmailValid] = useState(true);
  const [showPassword, setShowPassword] = useState(false); // State for password visibility

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setEmailValid(emailRegex.test(email));
    setEmail(email);
  };

  const handleSignIn = () => {
    // if (!emailValid || email.length === 0 || password.length === 0) {
    //   Alert.alert("Invalid Input", "Please enter a valid email and password.");
    //   return;
    // }

    // Alert.alert("Sign In Successful", "You have successfully signed in.");
    navigation.navigate("Home");
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState); // Toggle password visibility
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
        <Text style={styles.title}>Login</Text>
        <Text style={styles.subtitle}>
          Enter your email and password to continue.
        </Text>
        <View style={styles.inputSection}>
          <TextInputWithIcon
            imageSource={require("../assets/All_icons/email.png")}
            placeholder="Enter Your Email"
            value={email}
            onChangeText={validateEmail}
            keyboardType="email-address"
            isValid={emailValid}
            validIconSource={require("../assets/All_icons/tick1.png")}
            invalidIconSource={require("../assets/All_icons/cross1.png")}
            
          />
          <View style={styles.passwordContainer}>
            <TextInputWithIcon
              imageSource={require("../assets/All_icons/pass.png")}
              placeholder="Enter Your Password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPassword} // Conditionally toggle password visibility
            />
            <TouchableOpacity onPress={togglePasswordVisibility} style={styles.eyeIcon}>
              <Image
                source={
                  showPassword
                    ? require("../assets/All_icons/show_password.png")
                    : require("../assets/All_icons/hide_password.png")
                }
                style={styles.eyeImage}
              />
            </TouchableOpacity>
          </View>
          <Button
            title="Sign In"
            onPress={handleSignIn}
            customStyle={styles.signInButton}
          />
          <Text style={styles.footerText}>
            Don’t have an account?{" "}
            <Text
              style={styles.registerText}
              onPress={() => navigation.navigate("SignUp")}
            >
              Register Now
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
  passwordContainer: {
    position: "relative",
  },
  eyeIcon: {
    position: "absolute",
    right: 10,
    top: 10,
    padding: 5,
  },
  eyeImage: {
    width: 20,
    height: 20,
  },
  signInButton: {
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
  registerText: {
    color: "#FFD700",
    fontWeight: "bold",
  },
});

export default EmailSignInScreen;
