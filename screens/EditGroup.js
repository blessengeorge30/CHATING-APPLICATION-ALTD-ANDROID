import React, { useState } from 'react';
import { View, Text, TextInput, Image, TouchableOpacity, StyleSheet, Dimensions, Platform } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import CameraPopup from "../components/CamaraPopup"; 
import { LinearGradient } from 'expo-linear-gradient'; // Optional for gradient background

const { width, height } = Dimensions.get("window");

const EditGroupScreen = () => {
    const navigation = useNavigation();
    const [groupName, setGroupName] = useState('Amazon Coupon Group');
    const [isCameraPopupVisible, setIsCameraPopupVisible] = useState(false);

    const handleCameraOptionSelect = (option) => {
        console.log("Selected Option:", option);
        setIsCameraPopupVisible(false);
        if (option === "camera") {
            console.log("Camera option selected");
        } else if (option === "gallery") {
            console.log("Gallery option selected");
        }
    };

    return (
        <View style={styles.safeArea}>
            <View style={styles.modalContainer}>
                {/* Top bar with Cancel and Done buttons */}
                <View style={styles.topBar}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={styles.topBarButton}>
                        <Text style={styles.topBarText}>Cancel</Text>
                    </TouchableOpacity>
                    <Text style={styles.editGroupText}>Edit Group</Text>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={styles.topBarButton}>
                        <Text style={styles.topBarText}>Save</Text>
                    </TouchableOpacity>
                </View>

                {/* Profile Picture */}
                <View style={styles.profileContainer}>
                    <Image
                        source={require("../assets/HomeScreenIcons/Logos/Amazon.png")}
                        style={styles.profileImage}
                    />
                    <TouchableOpacity 
                        style={styles.editIcon} 
                        onPress={() => setIsCameraPopupVisible(true)}
                    >
                        <View style={styles.editIconContainer}>
                            <Image
                                source={require("../assets/All_icons/edit.png")}
                                style={styles.editIconImage}
                            />
                        </View>
                    </TouchableOpacity>
                </View>

                {/* Group Name Input */}
                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.textInput}
                        value={groupName}
                        onChangeText={setGroupName}
                        placeholder="Group Name"
                        placeholderTextColor="#B0B0B0"
                    />
                </View>

                {/* CameraPopup Component */}
                <CameraPopup
                    visible={isCameraPopupVisible}
                    onClose={() => setIsCameraPopupVisible(false)}
                    onOptionSelect={handleCameraOptionSelect}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#E8E248', // Subtle background dim
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContainer: {
        width: width * 0.85,
        backgroundColor: 'white',
        borderRadius: 20, // More modern rounded corners
        padding: width * 0.05,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.12,
        shadowRadius: 8,
        elevation: 8, // Enhanced elevation for a floating effect
    },
    topBar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    topBarButton: {
        paddingVertical: 8,
        paddingHorizontal: 15,
        backgroundColor: 'transparent', // Flat button style
        borderRadius: 30,
    },
    topBarText: {
        fontSize: 16,
        color: '#333',
        fontWeight: 'bold',
    },
    editGroupText: {
        fontSize: 20,
        color: '#333',
        fontWeight: '600',
    },
    profileContainer: {
        alignItems: 'center',
        marginBottom: 30,
    },
    profileImage: {
        width: width * 0.3,
        height: width * 0.3,
        borderRadius: width * 0.15,
        backgroundColor: '#F0F0F0', // Light background for the profile image
        borderWidth: 2,
        borderColor: '#E0E0E0', // Lighter border color
    },
    editIcon: {
        position: 'absolute',
        bottom: -8,
        right: -8,
    },
    editIconContainer: {
        backgroundColor: '#575757',
        padding: 10,
        borderRadius: 100,
        borderWidth: 1,
        borderColor: 'white',
    },
    editIconImage: {
        width: 18,
        height: 18,
        tintColor: 'white',
    },
    inputContainer: {
        backgroundColor: '#F9F9F9', 
        borderColor:'grey',
        borderWidth:0.4,
        borderRadius: 15,
        paddingHorizontal: 15,
        paddingVertical: 12,
        marginBottom: 30,
    },
    textInput: {
        fontSize: 16,
        color: '#333',
        marginBottom: 10,
        height: 45,
        borderBottomWidth: 1,
        borderBottomColor: '#B0B0B0', 
    },
});

export default EditGroupScreen;
