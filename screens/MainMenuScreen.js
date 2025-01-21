import React, { useState } from "react";
import {
    Text,
    View,
    ImageBackground,
    StyleSheet,
    TouchableOpacity,
    Dimensions,
    Image,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import MenuCard from "../components/MenuCard";
import { MENU_BUTTONS } from "../components/DummyData/MenuButtonsData";
import FloatingButton from "../components/FloatingButton";

const { width, height } = Dimensions.get("window");

const Menu = () => {
    const navigation = useNavigation();
    const [key, setKey] = useState("initial");

    const handlePress = () => {
        console.log("Floating Button Pressed!");
    };

    return (
        <View style={styles.safeArea}>
            <View style={styles.container}>
                <ImageBackground
                    source={require("../assets/HeaderIcons/splashbg.png")}
                    style={styles.backgroundImage}
                >
                    {/* Header Section */}
                    <View style={styles.headerContainer}>
                        <TouchableOpacity onPress={() => navigation.goBack()}>
                            <Image
                                source={require("../assets/All_icons/back.png")}
                                style={styles.backIcon}
                                resizeMode="contain"
                            />
                        </TouchableOpacity>
                        <Text style={styles.headerText}>Main Menu</Text>
                    </View>

                    {/* Details Section */}
                    <View style={styles.detailsSection}>
                        <View style={styles.row}>
                            {/* My Profile Button */}
                            <MenuCard
                                item={MENU_BUTTONS[0]}
                                onPress={() => navigation.navigate("Profile")} // Navigate to Profile screen
                            />
                            {/* Groups Button */}
                            <MenuCard
                                item={MENU_BUTTONS[1]}
                                onPress={() => navigation.navigate("AddNewMembers")} // Navigate to Groups screen
                            />
                        </View>
                        <View style={styles.row}>
                            {/* My Coupons Button */}
                            <MenuCard
                                item={MENU_BUTTONS[2]}
                                onPress={() => navigation.navigate("AddCoupon")} // Navigate to Coupons screen
                            />
                            {/* Notifications Button */}
                            <MenuCard
                                item={MENU_BUTTONS[3]}
                                // onPress={() => navigation.navigate("TestScreen")} 
                                onPress={() => navigation.navigate("NotificationsScreen")} 
                                // Navigate to Notifications screen
                            />
                        </View>
                        <View style={styles.row}>
                            {/* Settings Button */}
                            <MenuCard
                                item={MENU_BUTTONS[4]}
                                onPress={() => navigation.navigate("Settings")} // Navigate to Settings screen
                            />
                              <MenuCard
                                item={MENU_BUTTONS[5]}
                                onPress={() => navigation.navigate("PendingApprovals")} // Navigate to Pending Approvals screen
                            />
                        </View>
                       
                    </View>

                    {/* Floating Button */}
                    <FloatingButton
                        onPress={handlePress}
                        imageSource={require("../assets/HomeScreenIcons/AddButton.png")}
                        size={100}
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
        marginTop: 30,
        paddingVertical: height * 0.02,
        paddingHorizontal: width * 0.05,
        marginBottom: 40,
    },
    headerText: {
        marginLeft: width * 0.03,
        fontSize: height * 0.025,
        fontWeight: "bold",
    },
    detailsSection: {
        backgroundColor: "#fff",
        borderRadius: 30,
        padding: width * 0.05,
        marginTop: -height * 0.04,
        elevation: 5,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        height: 820,
    },
    row: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 5,  
    },
    backgroundImage: {
        flex: 1,
        resizeMode: "cover",
    },
    backIcon: {
        height: 20,
        width: 20,
        marginRight: 5,
    },
});

export default Menu;
