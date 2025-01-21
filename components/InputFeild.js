import React from "react";
import { View, Text, TextInput, StyleSheet, Image } from "react-native";

const InputField = ({
  imageSource,
  placeholder,
  value,
  onChangeText,
  isValid,
  keyboardType,
  secureTextEntry,
  validIconSource,
  invalidIconSource,
}) => (
  <View style={styles.inputContainer}>
    <View style={styles.iconWrapper}>
      {imageSource && <Image source={imageSource} style={styles.icon} />}
    </View>

    {/* Text Input */}
    <TextInput
      style={[styles.input, !isValid && value ? styles.invalidInput : null]}
      placeholder={placeholder}
      value={value}
      onChangeText={onChangeText}
      keyboardType={keyboardType}
      secureTextEntry={secureTextEntry}
    />

    {/* Validation Icon (Custom Images for Checkmark or Error Icon) */}
    <View style={styles.validationIconWrapper}>
      {value && (
        isValid ? (
          validIconSource && (
            <Image source={validIconSource} style={styles.validationIcon} />
          )
        ) : (
          invalidIconSource && (
            <Image source={invalidIconSource} style={styles.validationIcon} />
          )
        )
      )}
    </View>
  </View>
);

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFF",
    borderRadius: 10,
    marginBottom: 15,
    borderWidth: 0.17,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 0.9,
    elevation: 3,
  },
  iconWrapper: {
    width: 50,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#EDE63C",
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
  },
  input: {
    flex: 1,
    height: 50,
    paddingHorizontal: 10,
    fontSize: 16,
    color: "#333",
  },
  icon: {
    width: 22,
    height: 22,
    resizeMode: "contain",
  },
  invalidInput: {
    borderColor: "red",
    borderWidth: 0.0,
    borderRadius: 10,
  },
  validationIconWrapper: {
    paddingHorizontal: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  validationIcon: {
    width: 18,
    height: 18,
    resizeMode: "contain",
  },
});

export default InputField;
