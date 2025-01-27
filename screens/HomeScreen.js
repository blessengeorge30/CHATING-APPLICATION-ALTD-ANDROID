import React, { useEffect, useState, useRef } from "react";
import { 
  View, ImageBackground, Animated, Image, TouchableOpacity, Text, StyleSheet, Alert 
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import SwipeableFlatList from "rn-gesture-swipeable-flatlist";
import CreateNewGroup from "../components/CreateNewGroup";
import GroupItem from "../components/GroupItem";
import ExitConfirmationPopup from "../components/ExitConfirmationPopup";
import { GROUP_DATA } from "../components/DummyData/GroupData";

const Homescreen = () => {
  const navigation = useNavigation();
  const flatListRef = useRef(null);

  // Animations
  const [headerAnimation] = useState(new Animated.Value(0)); 
  const [listAnimation] = useState(new Animated.Value(0));

  // Exit Confirmation Modal State
  const [isExitPopupVisible, setExitPopupVisible] = useState(false);
  const [selectedGroupId, setSelectedGroupId] = useState(null);

  useEffect(() => {
    Animated.timing(headerAnimation, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();

    Animated.timing(listAnimation, {
      toValue: 1,
      duration: 1000,
      delay: 200,
      useNativeDriver: true,
    }).start();
  }, []);

  // Handle Edit with Alert Confirmation
  const handleEdit = (item) => {
    Alert.alert(
      "Edit Group",
      `Are you sure you want to edit \"${item.name}\"?`,
      [
        { text: "Cancel", style: "cancel" },
        { text: "OK", onPress: () => navigation.navigate("EditGroupScreen", { group: item }) }
      ]
    );
  };

  // Handle Delete (Show Confirmation Popup)
  const handleDeletePress = (id) => {
    setSelectedGroupId(id);
    setExitPopupVisible(true);
  };

  // Confirm Delete (Remove Item)
  const handleConfirmDelete = () => {
    console.log("Deleting Group ID: ", selectedGroupId);
    setExitPopupVisible(false);
  };

  // Swipe Right Actions (Edit & Delete)
  const renderRightActions = (item) => (
    <View style={styles.rightActionsContainer}>
      <TouchableOpacity style={styles.editAction} onPress={() => handleEdit(item)}>
        <Text style={styles.actionText}>Edit</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.deleteAction} onPress={() => handleDeletePress(item.id)}>
        <Text style={styles.actionText}>Delete</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../assets/HeaderIcons/splashbg.png")}
        style={styles.backgroundImage}
      >
        <View contentContainerStyle={styles.scrollContent}>
          {/* Header */}
          <Animated.View style={[styles.headerContainer, { opacity: headerAnimation }]}>
            <View style={styles.logoContainer}>
              <Image source={require("../assets/HeaderIcons/logo.png")} style={styles.logo} />
              <Image style={styles.giftBoxImage} source={require("../assets/HeaderIcons/GiftBox.png")} resizeMode="contain" />
            </View>
            <View style={styles.headerIcons}>
              <TouchableOpacity style={styles.profileButton} onPress={() => navigation.navigate("Profile")}>
                <Image source={require("../assets/HeaderIcons/test.png")} style={styles.profileImage} resizeMode="cover" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.menuButton} onPress={() => navigation.navigate("MainMenuScreen")}>
                <Image source={require("../assets/HomeScreenIcons/Menu.png")} style={styles.menuImage} resizeMode="contain" />
              </TouchableOpacity>
            </View>
          </Animated.View>

          <View style={styles.welcomeContainer}>
            <CreateNewGroup />

            {/* Swipeable Group List */}
            <Animated.View style={{ opacity: listAnimation }}>
              <SwipeableFlatList
                ref={flatListRef}
                data={GROUP_DATA}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => <GroupItem item={item} />}
                renderRightActions={renderRightActions} // Only Right Swipe
                enableOpenMultipleRows={false} 
              />
            </Animated.View>
          </View>
        </View>
      </ImageBackground>

      {/* Exit Confirmation Popup */}
      <ExitConfirmationPopup 
        visible={isExitPopupVisible}
        onConfirm={handleConfirmDelete}
        onCancel={() => setExitPopupVisible(false)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  backgroundImage: { flex: 1, width: "100%", height: "100%" },
  scrollContent: { flexGrow: 1, justifyContent: "space-between" },
  headerContainer: {
    marginTop: 35,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  logoContainer: { flexDirection: "row", alignItems: "center" },
  logo: { height: 40, width: 60, marginRight: 10 },
  giftBoxImage: { width: 130, height: 30 },
  headerIcons: { flexDirection: "row", alignItems: "center" },
  profileButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
    marginRight: 15,
  },
  profileImage: { width: "90%", height: "90%", borderRadius: 25 },
  menuButton: { justifyContent: "center", alignItems: "center" },
  menuImage: { width: 20, height: 20, marginHorizontal: 2 },
  welcomeContainer: {
    position: "absolute",
    top: 110,
    left: 0,
    right: 0,
    height: 950,
    backgroundColor: "white",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 5.95,
    paddingHorizontal: 10,
  },
  rightActionsContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    width: 160,
    marginVertical: 10,
  },
  editAction: {
    backgroundColor: "#4CAF50",
    justifyContent: "center",
    alignItems: "center",
    width: 80,
    height: "100%",
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
  },
  deleteAction: {
    backgroundColor: "#F44336",
    justifyContent: "center",
    alignItems: "center",
    width: 80,
    height: "100%",
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5,
  },
  actionText: { color: "white", fontSize: 16, fontWeight: "bold" },
});

export default Homescreen;
