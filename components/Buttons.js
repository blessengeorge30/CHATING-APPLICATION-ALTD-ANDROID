import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

const Buttons = ({ onPress, title, style }) => (
  <TouchableOpacity style={[styles.button, style]} onPress={onPress}>
    <Text style={styles.buttonText}>{title}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#333",
    paddingVertical: 15,
    paddingHorizontal: 25, 
    borderRadius: 8,
    alignItems: "center",
    marginTop: 15,
    marginBottom: 10,
  },
  buttonText: {
    fontSize: 16,
    color: "#EDE63C",
    fontWeight: "bold",
  },
});

export default Buttons;
