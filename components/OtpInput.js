import React, { useRef } from "react";
import { View, TextInput, StyleSheet } from "react-native";

const OtpInput = ({ otp, setOtp }) => {
  const refs = useRef([]);

  const handleOtpChange = (value, index) => {
    const updatedOtp = [...otp];
    updatedOtp[index] = value;

    if (value && index < otp.length - 1) {
      refs.current[index + 1]?.focus();
    }

    setOtp(updatedOtp);
  };

  return (
    <View style={styles.otpInputContainer}>
      {otp.map((value, index) => (
        <TextInput
          key={index}
          style={[
            styles.otpInput,
            value ? styles.otpInputActive : styles.otpInputInactive,
          ]}
          keyboardType="numeric"
          maxLength={1}
          value={value}
          placeholder="0"
          onChangeText={(val) => handleOtpChange(val, index)}
          ref={(input) => (refs.current[index] = input)}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  otpInputContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "90%",
    marginHorizontal: 15,
    marginBottom: 30,
  },
  otpInput: {
    borderBottomWidth: 2,
    width: 65,
    // width: 45,
    fontSize: 25,
    height: 60,
    textAlign: "center",
    color: "#000",
    marginHorizontal: 5,
  },
  otpInputInactive: {
    borderColor: "#ccc",
  },
  otpInputActive: {
    borderColor: "#666",
  },
});

export default OtpInput;
