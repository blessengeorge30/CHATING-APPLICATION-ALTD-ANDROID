import React from "react";
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

const ExitConfirmationPopup = ({ visible, onConfirm, onCancel }) => {
  return (
    <Modal
      transparent={true}
      visible={visible}
      animationType="fade"
      onRequestClose={onCancel}
    >
      <View style={styles.overlay}>
        <View style={styles.popupContainer}>
          <Text style={styles.popupText}>
            Are you sure you want to exit from this Group?
          </Text>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.yesButton} onPress={onConfirm}>
              <Text style={styles.yesButtonText}>Yes</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.noButton} onPress={onCancel}>
              <Text style={styles.noButtonText}>No</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  popupContainer: {
    width: "80%",
    backgroundColor: "#FFF",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
  },
  popupText: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  yesButton: {
    flex: 1,
    backgroundColor: "gray",
    padding: 10,
    marginRight: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  noButton: {
    flex: 1,
    backgroundColor: "#F2E71C", 
    padding: 10,
    marginLeft: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  yesButtonText: {
    color: "#FFF",
    fontWeight: "bold",
  },
  noButtonText: {
    color: "#333",
    fontWeight: "bold",
  },
});

export default ExitConfirmationPopup;
