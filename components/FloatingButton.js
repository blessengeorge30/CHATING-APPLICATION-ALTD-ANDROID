import React from "react";
import { TouchableOpacity, Image, StyleSheet } from "react-native";

const FloatingButton = ({ onPress, imageSource, size  }) => {
  return (
    <TouchableOpacity style={[styles.floatingButton, { width: size, height: size }]} onPress={onPress}>
      <Image 
        source={imageSource} 
        style={{ width: size, height: size }} 
        resizeMode="contain" 
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  floatingButton: {
    position: "absolute", 
    bottom: 30,           
    right: 20,            
  },
});

export default FloatingButton;
