import React, { useState } from "react";
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    StyleSheet,
    ImageBackground,
    TextInput,
    FlatList,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import MenuPopup from "../components/MenuPopup";
import FloatingButton from "../components/FloatingButton";
import ADDGROUPMEMBERS from "../components/DummyData/AddMembersData";
import CameraPopup from "../components/CamaraPopup"; 

const NewGroup = () => {
    const navigation = useNavigation();
    const [isMenuVisible, setIsMenuVisible] = useState(false);
    const [isCameraPopupVisible, setIsCameraPopupVisible] = useState(false); 
    const [selectedMembers, setSelectedMembers] = useState([]);
    const [groupName, setGroupName] = useState("");

    const handlePress = () => {
        console.log("Floating Button Pressed!");
    };

    const handleMenuOptionSelect = (option) => {
        console.log("Selected Option:", option);
        setIsMenuVisible(false);
    };

    const toggleMemberSelection = (id) => {
        setSelectedMembers((prev) =>
            prev.includes(id)
                ? prev.filter((memberId) => memberId !== id)
                : [...prev, id]
        );
    };

    const handleCameraOptionSelect = (option) => {
        console.log("Selected Option:", option);
        setIsCameraPopupVisible(false);
        if (option === "camera") {
            console.log("Camera option selected");
        } else if (option === "gallery") {
            console.log("Gallery option selected");
        }
    };

    const renderMember = ({ item }) => {
        const isSelected = selectedMembers.includes(item.id);
        return (
            <TouchableOpacity
                style={styles.memberContainer}
                onPress={() => toggleMemberSelection(item.id)}
            >
                <Image source={item.image} style={styles.memberImage} />
                <View style={styles.memberInfo}>
                    <Text style={styles.memberName}>{item.name}</Text>
                    <Text style={styles.memberPhone}>{item.phone}</Text>
                </View>
                <Image
                    source={
                        isSelected
                            ? require("../assets/All_icons/tick1.png")
                            : require("../assets/All_icons/cross1.png")
                    }
                    style={styles.checkboxIcon}
                />
            </TouchableOpacity>
        );
    };

    return (
        <View style={styles.container}>
            <ImageBackground
                source={require("../assets/HeaderIcons/splashbg.png")}
                style={styles.backgroundImage}
            >
                {/* Header */}
                <View style={styles.headerContainer}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Image
                            source={require("../assets/All_icons/back.png")}
                            style={styles.backIcon}
                        />
                    </TouchableOpacity>
                    <View style={styles.groupLogo}>
                        <View>
                            <Text style={styles.headerTitle}>New Group</Text>
                            <Text style={styles.headerSubtitle}>2 of 1004 Contacts</Text>
                        </View>
                    </View>
                </View>

                {/* Form */}
                <View style={styles.formContainer}>
                    <View style={styles.groupNameInputPlaceholder}>
                        <TouchableOpacity
                            style={styles.groupImagePlaceholder}
                            onPress={() => setIsCameraPopupVisible(true)} 
                        >
                            <Image
                                source={require("../assets/All_icons/camera.png")}
                                style={styles.cameraIcon}
                            />
                        </TouchableOpacity>
                        <TextInput
                            placeholder="Group Name"
                            value={groupName}
                            onChangeText={setGroupName}
                            style={styles.groupNameInput}
                        />
                    </View>

                    <Text style={styles.contactsTitle}>Contacts in your Phone</Text>
                    <FlatList
                        data={ADDGROUPMEMBERS}
                        renderItem={renderMember}
                        keyExtractor={(item) => item.id}
                    />
                </View>

                {/* Floating Button */}
                <FloatingButton
                    onPress={() => navigation.navigate("Home")}
                    imageSource={require("../assets/All_icons/floatingbuttontick.png")}
                    size={100}
                />
            </ImageBackground>

            {/* MenuPopup Component */}
            <MenuPopup
                visible={isMenuVisible}
                onClose={() => setIsMenuVisible(false)}
                onOptionSelect={handleMenuOptionSelect}
            />

            {/* CameraPopup Component */}
            <CameraPopup
                visible={isCameraPopupVisible}
                onClose={() => setIsCameraPopupVisible(false)}
                onOptionSelect={handleCameraOptionSelect}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    backgroundImage: {
        flex: 1,
        width: "100%",
        height: "100%",
    },
    headerContainer: {
        flexDirection: "row",
        alignItems: "center",
        padding: 20,
        marginTop: 20,
    },
    backIcon: {
        width: 22,
        height: 18,
    },
    groupLogo: {
        flexDirection: "row",
        // alignItems: "center",
        marginLeft: 20,
    },
    groupIcon: {
        width: 40,
        height: 40,
        marginRight: 10,
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#333",
    },
    headerSubtitle: {
        fontSize: 12,
        color: "#333",
    },
    menuIcon: {
        width: 22,
        height: 40,
    },
    formContainer: {
        marginTop: 10,
        backgroundColor: "white",
        flex: 1,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        padding: 25,
    },
    contactsTitle: {
        fontSize: 16,
        fontWeight: "bold",
        marginBottom: 20,
        marginTop: 10,
        margin: 5
    },
    memberContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 15,
    },
    memberImage: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginRight: 15,
        marginLeft: 8
    },
    memberInfo: {
        flex: 1,
    },
    memberName: {
        fontSize: 16,
        fontWeight: "bold",
    },
    memberPhone: {
        fontSize: 14,
        color: "#666",
    },
    checkboxIcon: {
        width: 24,
        height: 24,
    },
    floatingButton: {
        position: "absolute",
        bottom: 30,
        right: 30,
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: "#FFD700",
        justifyContent: "center",
        alignItems: "center",
    },
    floatingButtonIcon: {
        width: 24,
        height: 24,
    },
    groupImagePlaceholder: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: "#F0F0F0",
        justifyContent: "center",
        alignItems: "center",
        marginRight: 15,
    },
    cameraIcon: {
        width: 24,
        height: 22,
    },
    groupNameInput: {
        flex: 1,
        borderBottomWidth: 1,
        borderBottomColor: "#ccc",
        fontSize: 16,

    },
    groupNameInputPlaceholder: {
        flexDirection: "row",
        alignItems: "center",
        margin: 5,
        marginVertical: 20
    },
});

export default NewGroup;
