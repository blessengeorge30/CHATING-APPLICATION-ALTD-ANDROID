import React from "react";
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  StyleSheet,
  TouchableWithoutFeedback,
} from "react-native";

const MenuPopup = ({ visible, onClose, onOptionSelect }) => {
  return (
    <Modal
      transparent={true}
      visible={visible}
      animationType="fade"
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.overlay}>
          <View style={styles.menuContainer}>
            <TouchableOpacity onPress={() => onOptionSelect("Group Info")}>
              <Text style={styles.menuItem}>Group Info</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => onOptionSelect("Group Members")}>
              <Text style={styles.menuItem}>Group Members</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => onOptionSelect("Mute Notification")}>
              <Text style={styles.menuItem}>Mute Notification</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => onOptionSelect("Exit Group")}>
              <Text style={[styles.menuItem, styles.exitItem]}>Exit Group</Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
  },
  menuContainer: {
    position: "absolute",
    top: 60, 
    right: 30, 
    backgroundColor: "#FFFFFF", 
    // backgroundColor: "#E8E248",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 15,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  menuItem: {
    fontSize: 16,
    paddingVertical: 10,
    color: "#333",
  },
  exitItem: {
    color: "red",
  },
});

export default MenuPopup;
