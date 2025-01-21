import React, { useState } from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import ExitConfirmationPopup from "./ExitConfirmationPopup";

const GroupActions = () => {
    const navigation = useNavigation();
    const [isExitPopupVisible, setExitPopupVisible] = useState(false);

    const handleExitPress = () => {
        setExitPopupVisible(true);
    };

    const handleConfirmExit = () => {
        setExitPopupVisible(false);
        console.log("Exiting group...");
    };

    const handleCancelExit = () => {
        setExitPopupVisible(false);
    };

    return (
        <View style={styles.buttonsContainer}>
            <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate("AddNewMembers")}
            >
                <View style={[styles.iconContainer, styles.addButton]}>
                    <Image
                        source={require("../assets/All_icons/useradd.png")}
                        style={styles.buttonIcon}
                    />
                </View>
                <Text style={styles.buttonText}>Add</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button}>
                <View style={[styles.iconContainer, styles.requestButton]}>
                    <Image
                        source={require("../assets/All_icons/bell1.png")}
                        style={styles.buttonIcon}
                    />
                </View>
                <Text style={styles.buttonText}>Requests</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button} onPress={handleExitPress}>
                <View style={[styles.iconContainer, styles.exitButton]}>
                    <Image
                        source={require("../assets/All_icons/exit.png")}
                        style={[styles.buttonIcon1, { tintColor: "white" }]}
                    />
                </View>
                <Text style={styles.buttonText}>Exit</Text>
            </TouchableOpacity>

            {/* Exit Confirmation Popup */}
            <ExitConfirmationPopup
                visible={isExitPopupVisible}
                onConfirm={handleConfirmExit}
                onCancel={handleCancelExit}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    buttonsContainer: {
        flexDirection: "row",
        justifyContent: "space-around",
        marginTop: -10,
    },
    button: {
        alignItems: "center",
    },
    iconContainer: {
        width: 64,
        height: 64,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 32, // Ensures circular background
    },
    addButton: {
        backgroundColor: "#E8E248",
    },
    requestButton: {
        backgroundColor: "#E8E248",
    },
    exitButton: {
        backgroundColor: "#323232",
    },
    buttonIcon: {
        width: 24,
        height: 24,
        resizeMode: "contain",
    },
    buttonIcon1:{
        width: 22,
        height: 22,
        resizeMode: "contain",
    },
    buttonText: {
        fontSize: 12,
        color: "#333",
        marginTop: 5,
    },
});

export default GroupActions;
