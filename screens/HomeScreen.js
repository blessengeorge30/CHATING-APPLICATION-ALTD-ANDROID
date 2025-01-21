import React, { useEffect, useState } from "react";
import { View, ImageBackground, ScrollView, FlatList, StyleSheet, Image, TouchableOpacity, Animated } from "react-native";
import { useNavigation } from "@react-navigation/native";
import FloatingButton from "../components/FloatingButton";
import CreateNewGroup from "../components/CreateNewGroup";
import GroupItem from "../components/GroupItem";
import { GROUP_DATA } from "../components/DummyData/GroupData";

const Homescreen = () => {
  const navigation = useNavigation();

  // Animations
  const [headerAnimation] = useState(new Animated.Value(0)); // Opacity for header
  const [listAnimation] = useState(new Animated.Value(0)); // Opacity for list items

  const handlePress = () => {
    console.log("Floating Button Pressed!");
  };

  const renderGroupItem = ({ item }) => <GroupItem item={item} />;

  useEffect(() => {
    // Animate header opacity
    Animated.timing(headerAnimation, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();

    // Animate group list fade-in
    Animated.timing(listAnimation, {
      toValue: 1,
      duration: 1000,
      delay: 200, // Add delay to group list fade-in
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../assets/HeaderIcons/splashbg.png")}
        style={styles.backgroundImage}
      >
        <View contentContainerStyle={styles.scrollContent}>
          {/* Header Animation */}
          <Animated.View
            style={[
              styles.headerContainer,
              { opacity: headerAnimation },
            ]}
          >
            <View style={styles.logoContainer}>
              <Image
                source={require("../assets/HeaderIcons/logo.png")}
                style={styles.logo}
              />
              <Image
                style={styles.giftBoxImage}
                source={require("../assets/HeaderIcons/GiftBox.png")}
                resizeMode="contain"
              />
            </View>
            <View style={styles.headerIcons}>
              <TouchableOpacity
                style={styles.profileButton}
                onPress={() => navigation.navigate("Profile")}
              >
                <Image
                  source={require("../assets/HeaderIcons/test.png")}
                  style={styles.profileImage}
                  resizeMode="cover"
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.menuButton}
                onPress={() => navigation.navigate("MainMenuScreen")}
              >
                <Image
                  source={require("../assets/HomeScreenIcons/Menu.png")}
                  style={styles.menuImage}
                  resizeMode="contain"
                />
              </TouchableOpacity>
            </View>
          </Animated.View>

          <View style={styles.welcomeContainer}>
            <CreateNewGroup />

            {/* Group List Fade-in Animation */}
            <Animated.FlatList
              data={GROUP_DATA}
              keyExtractor={(item) => item.id}
              renderItem={renderGroupItem}
              style={[styles.groupList, { opacity: listAnimation }]}
            />
          </View>

          {/* <FloatingButton
            onPress={() => navigation.navigate("NewGroup")}
            imageSource={require("../assets/HomeScreenIcons/AddButton.png")}
            size={100}
          /> */}
        </View>
      </ImageBackground>
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
  scrollContent: {
    flexGrow: 1,
    justifyContent: "space-between",
  },
  headerContainer: {
    marginTop: 30,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  logoContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  logo: {
    height: 40,
    width: 60,
    marginRight: 10,
  },
  giftBoxImage: {
    width: 130,
    height: 30,
  },
  headerIcons: {
    flexDirection: "row",
    alignItems: "center",
  },
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
  profileImage: {
    width: "90%",
    height: "90%",
    borderRadius: 25,
  },
  menuButton: {
    justifyContent: "center",
    alignItems: "center",
  },
  menuImage: {
    width: 20,
    height: 20,
    marginHorizontal: 2,
  },
  newuserbutton: {
    width: 58,
    height: 58,
    marginHorizontal: 15,
    marginLeft: 10,
  },
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
  groupList: {
    marginVertical: 15,
  },
  groupItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  groupAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 20,
  },
  groupDetails: {
    flex: 1,
  },
  groupName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  groupInfo: {
    fontSize: 14,
    color: "#888",
  },
  groupTimeContainer: {
    justifyContent: "center",
    alignItems: "flex-end",
  },
  groupTime: {
    fontSize: 14,
    color: "#888",
  },
});

export default Homescreen;
