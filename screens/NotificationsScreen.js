import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  FlatList,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import FloatingButton from "../components/FloatingButton";
import MenuPopup from "../components/MenuPopup";
import ExitConfirmationPopup from "../components/ExitConfirmationPopup"; // Ensure this component is implemented.

const notifications = [
  {
    id: "1",
    user: "Jimmy James",
    action: "invited Tim Antony to join",
    group: "Amazon Coupon Corner",
    type: "approval",
    avatar: require("../assets/people_profile/user3.png"),
  },
  {
    id: "2",
    user: "Jeseca Mariya",
    action: "added a coupon in",
    group: "Amazon Coupon Corner",
    type: "info",
    avatar: require("../assets/people_profile/user2.png"),
  },
  {
    id: "3",
    user: "Natasha Aaron",
    action: "invited Jeseca Mariya to join",
    group: "FlipKart Shopperz Zone",
    type: "approval",
    avatar: require("../assets/people_profile/user8.png"),
  },
  {
    id: "4",
    user: "Tim Antony",
    action: "added a coupon in",
    group: "General Gift Coupons",
    type: "info",
    avatar: require("../assets/people_profile/user4.png"),
  },
  {
    id: "5",
    user: "Elizabeth Fernades",
    action: "added a coupon in",
    group: "General Gift Coupons",
    type: "info",
    avatar: require("../assets/people_profile/user5.png"),
  },
  {
    id: "6",
    user: "Joseph Fernades",
    action: "added a coupon in",
    group: "General Gift Coupons",
    type: "info",
    avatar: require("../assets/people_profile/user7.png"),
  },
];

const Notifications = () => {
  const navigation = useNavigation();
  const [menuVisible, setMenuVisible] = useState(false);
  const [exitConfirmationVisible, setExitConfirmationVisible] = useState(false);

  const handleMenuOptionSelect = (option) => {
    console.log(`Selected menu option: ${option}`);
    setMenuVisible(false);
  };

  const handleExitConfirmation = (confirm) => {
    if (confirm) {
      console.log("Exit confirmed");
    } else {
      console.log("Exit cancelled");
    }
    setExitConfirmationVisible(false);
  };

  const renderNotification = ({ item }) => (
    <View style={styles.notificationItem}>
      <Image source={item.avatar} style={styles.avatar} />
      <View style={styles.notificationTextContainer}>
        <Text style={styles.notificationText}>
          <Text style={styles.boldText}>{item.user}</Text> {item.action}{" "}
          <Text style={styles.boldText}>{item.group}</Text>
        </Text>
        {item.type === "approval" && (
          <View style={styles.actionButtons}>
            <TouchableOpacity style={styles.acceptButton}>
              <Image
                source={require("../assets/All_icons/accept.png")}
                style={styles.buttonIcon}
              />
              <Text style={styles.buttonText}>ACCEPT</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.rejectButton}>
              <Image
                source={require("../assets/All_icons/reject.png")}
                style={styles.buttonIcon}
              />
              <Text style={styles.buttonText}>REJECT</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../assets/HeaderIcons/splashbg.png")}
        style={styles.backgroundImage}
      >
        <View style={styles.headerContainer}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image
              source={require("../assets/All_icons/back.png")}
              style={styles.backIcon}
            />
          </TouchableOpacity>

          <View style={styles.groupLogo}>
            <View>
              <Text style={styles.headerTitle}>Notifications</Text>
              <Text style={styles.headerSubtitle}>Unread: 10</Text>
            </View>
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
              onPress={() => setMenuVisible(true)}
            >
              <Image
                source={require("../assets/HomeScreenIcons/Menu.png")}
                style={styles.menuImage}
                resizeMode="contain"
              />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.notificationsContainer}>
          <FlatList
            data={notifications}
            renderItem={renderNotification}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
          />
        </View>

        <MenuPopup
          visible={menuVisible}
          onClose={() => setMenuVisible(false)}
          onOptionSelect={handleMenuOptionSelect}
        />

        <ExitConfirmationPopup
          visible={exitConfirmationVisible}
          onConfirm={() => handleExitConfirmation(true)}
          onCancel={() => handleExitConfirmation(false)}
        />

        <FloatingButton
          onPress={() => navigation.navigate("NewGroupDetails")}
          imageSource={require("../assets/All_icons/floatingbuttonnext.png")}
          size={100}
        />
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
    marginLeft: 20,
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
  headerIcons: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 120,
  },
  profileButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
    marginRight: 20,
  },
  profileImage: {
    width: "90%",
    height: "90%",
    borderRadius: 25,
  },
  menuButton: {
    justifyContent: "center",
    alignItems: "center",
    marginLeft:5
  },
  menuImage: {
    width: 20,
    height: 20,
    marginHorizontal: 2,
  },
  notificationsContainer: {
    flex: 1,
    backgroundColor: "#fff",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 20,
    marginTop: 4,
  },
  notificationItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 20,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
  },
  notificationTextContainer: {
    flex: 1,
  },
  notificationText: {
    fontSize: 14,
    color: "#333",
  },
  boldText: {
    fontWeight: "bold",
  },
  actionButtons: {
    flexDirection: "row",
    marginTop: 10,
  },
  acceptButton: {
    backgroundColor: "#DFF0D8",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginRight: 10,
    flexDirection: "row",
  },
  rejectButton: {
    backgroundColor: "#F2DEDE",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    flexDirection: "row",
  },
  buttonText: {
    fontSize: 12,
    color: "#333",
    fontWeight: "bold",
  },
  buttonIcon: {
    width: 16,
    height: 16,
    marginRight: 5,
  },
});

export default Notifications;
