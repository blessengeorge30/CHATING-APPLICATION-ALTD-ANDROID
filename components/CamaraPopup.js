import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    TouchableOpacity,
    Modal,
    StyleSheet,
    Image,
    Animated,
} from "react-native";

const CameraPopup = ({ visible, onClose, onOptionSelect }) => {
    const [fadeAnim] = useState(new Animated.Value(0)); 
    const [slideAnim] = useState(new Animated.Value(200)); 
    const [buttonScaleAnim] = useState(new Animated.Value(0)); 

    useEffect(() => {
        if (visible) {
            // Animate modal
            Animated.sequence([
                Animated.timing(fadeAnim, {
                    toValue: 1,
                    duration: 300,
                    useNativeDriver: true,
                }),
                Animated.timing(slideAnim, {
                    toValue: 0,
                    duration: 300,
                    useNativeDriver: true,
                }),
            ]).start();

            // Animate buttons with a delay for a staggered effect
            Animated.stagger(200, [
                Animated.timing(buttonScaleAnim, {
                    toValue: 1,
                    duration: 300,
                    useNativeDriver: true,
                }),
            ]).start();
        } else {
            // Reset the animations when modal is closed
            Animated.sequence([
                Animated.timing(fadeAnim, {
                    toValue: 0,
                    duration: 300,
                    useNativeDriver: true,
                }),
                Animated.timing(slideAnim, {
                    toValue: 200,
                    duration: 300,
                    useNativeDriver: true,
                }),
            ]).start();

            Animated.timing(buttonScaleAnim, {
                toValue: 0,
                duration: 300,
                useNativeDriver: true,
            }).start();
        }
    }, [visible]);

    return (
        <Modal
            visible={visible}
            transparent
            animationType="none"
            onRequestClose={onClose}
        >
            <TouchableOpacity
                style={styles.overlay}
                activeOpacity={1}
                onPress={onClose}
            >
                <Animated.View
                    style={[
                        styles.popupContainer,
                        {
                            opacity: fadeAnim,
                            transform: [{ translateY: slideAnim }],
                        },
                    ]}
                >
                    {/* Camera Option */}
                    <TouchableOpacity
                        style={styles.optionButton}
                        onPress={() => onOptionSelect("camera")}
                    >
                        <Animated.View
                            style={[
                                styles.circle,
                                {
                                    transform: [
                                        { scale: buttonScaleAnim },
                                    ],
                                },
                            ]}
                        >
                            <Image
                                source={require("../assets/All_icons/CamaraFrame.png")}
                                style={styles.iconImage}
                                resizeMode="contain"
                            />
                        </Animated.View>
                    </TouchableOpacity>

                    {/* Gallery Option */}
                    <TouchableOpacity
                        style={styles.optionButton}
                        onPress={() => onOptionSelect("gallery")}
                    >
                        <Animated.View
                            style={[
                                styles.circle,
                                {
                                    transform: [
                                        { scale: buttonScaleAnim },
                                    ],
                                },
                            ]}
                        >
                            <Image
                                source={require("../assets/All_icons/GalleryFrame.png")}
                                style={styles.iconImage}
                                resizeMode="contain"
                            />
                        </Animated.View>
                    </TouchableOpacity>
                </Animated.View>
            </TouchableOpacity>
        </Modal>
    );
};

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        justifyContent: "flex-end",
    },
    popupContainer: {
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        backgroundColor: "#4A4A4A",
        paddingVertical: 20,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
    optionButton: {
        alignItems: "center",
        justifyContent: "center",
    },
  
    iconImage: {
        width: 70,
        height: 70,
        marginVertical: 10,
    },
});

export default CameraPopup;
