import React, {useState} from "react";
import {
    Text,
    View,
    Image,
    StyleSheet,
    TouchableOpacity,
    ImageBackground,
    Dimensions,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import FloatingButton from "../components/FloatingButton";
import MemberList from "../components/MembersList"; 
import GroupActions from "../components/GroupActions"; 
import GROUPMEMBERS from "../components/DummyData/GroupMembersData";
import CameraPopup from "../components/CamaraPopup"; 

const { width, height } = Dimensions.get("window");

const GroupInfo = () => {
    const navigation = useNavigation();
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
            <View style={styles.container}>
                <ImageBackground
                    source={require("../assets/HeaderIcons/splashbg.png")}
                    style={styles.backgroundImage}
                >
                    <View style={styles.headerContainer}>
                        <TouchableOpacity onPress={() => navigation.goBack()}>
                             <View style={{padding:8}}>
                                 <Image
                                source={require("../assets/All_icons/back.png")}
                                style={styles.backIcon}
                                resizeMode="contain"
                            />
                             </View>
                           
                        </TouchableOpacity>
                        <Text style={styles.headerText}></Text>
                    </View>

                    <View style={styles.detailsSection}>
                        {/* Profile Section */}
                        <View style={styles.profileSection}>
                            <View style={styles.profileImageContainer}>
                                <Image
                                    source={require("../assets/HomeScreenIcons/Logos/Amazon.png")}
                                    style={styles.profileImage}
                                />
                                <TouchableOpacity style={styles.editIcon} 
                                //  onPress={() => setIsCameraPopupVisible(true)}
                                 onPress={() => navigation.navigate("EditGroup")}
                                 >
                                    <View style={styles.editoption}>
                                        <Image
                                            source={require("../assets/All_icons/edit.png")}
                                            style={styles.smallIcon}
                                        />
                                    </View>
                                </TouchableOpacity>
                            </View>
                            <Text style={styles.groupName}>Amazon Coupons Corner</Text>
                            <Text style={styles.groupInfo}>Group | 5 Members</Text>
                            <Text style={styles.createdBy}>Created By : Anitha Thomas</Text>
                        </View>

                        {/* Group Actions */}
                        <GroupActions />

                        {/* Member List */}
                        <MemberList members={GROUPMEMBERS} />
                    </View>

                    <FloatingButton
                        onPress={() => navigation.navigate("AddNewMembers")}
                        imageSource={require("../assets/HomeScreenIcons/AddButton.png")}
                        size={100}
                    />

            {/* CameraPopup Component */}
            <CameraPopup
                visible={isCameraPopupVisible}
                onClose={() => setIsCameraPopupVisible(false)}
                onOptionSelect={handleCameraOptionSelect}
            />
                </ImageBackground>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
    },
    container: {
        flex: 1,
    },
    headerContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 20,
        paddingVertical: height * 0.02,
        paddingHorizontal: width * 0.05,
        marginBottom: 100,
    },
    headerText: {
        marginLeft: width * 0.03,
        fontSize: height * 0.022,
        fontWeight: "bold",
    },
    profileSection: {
        alignItems: "center",
        marginTop: -80,
        marginBottom: 50,
    },
    profileImageContainer: {
        position: "relative",
    },
    profileImage: {
        width: width * 0.3,
        height: width * 0.3,
        borderRadius: width * 0.15,
        borderWidth: 3,
        borderColor: "#fff",
    },
    editIcon: {
        position: "absolute",
        bottom: 5,
        right: 5,
    },
    detailsSection: {
        backgroundColor: "#fff",
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        padding: width * 0.05,
        marginTop: -height * 0.04,
        elevation: 5,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        height: 700,
    },
    backIcon: {
        height: 20,
        width: 20,
        marginRight: 2,
    },
    groupName: {
        fontSize: 20,
        fontWeight: "bold",
        marginTop: 10,
        color: "#333",
    },
    groupInfo: {
        fontSize: 14,
        color: "#666",
    },
    createdBy: {
        fontSize: 12,
        color: "#999",
    },
    smallIcon: {
        width: 14,
        height: 12,
        tintColor: "white",
    },
    editoption:{ backgroundColor: '#575757', padding: 8, borderRadius: 100 }
});

export default GroupInfo;
