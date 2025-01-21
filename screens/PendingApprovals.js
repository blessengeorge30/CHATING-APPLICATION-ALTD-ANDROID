import React, { useState } from "react";
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
import MenuPopup from "../components/MenuPopup";
import FloatingButton from "../components/FloatingButton";
import ExitConfirmationPopup from "../components/ExitConfirmationPopup";

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
    user: "Natasha Aaron",
    action: "invited Jeseca Mariya to join",
    group: "Flip-Kart Shoppers Zone",
    type: "approval",
    avatar: require("../assets/people_profile/user8.png"),
  },
  
];



const Notifications = () => {
  const navigation = useNavigation();
  const [menuVisible, setMenuVisible] = useState(false);
  const [exitConfirmationVisible, setExitConfirmationVisible] = useState(false);
  const [selectedMembers, setSelectedMembers] = useState([]);
  

  const renderNotification = ({ item }) => (
    <View style={styles.notificationItem}>
      <Image source={item.avatar} style={styles.avatar} />
      <View style={styles.notificationContent}>
        <Text style={styles.notificationText}>
          <Text style={styles.boldText}>{item.user}</Text> {item.action}{" "}
          <Text style={styles.groupText}>{item.group}</Text>
        </Text>
        {item.type === "approval" && (
          <View style={styles.actionButtons}>
            <TouchableOpacity style={styles.acceptButton}>
              <Image
                source={require("../assets/All_icons/accept.png")}
                style={styles.buttonIcon}
              />
              <Text style={styles.buttonText}>Accept</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.rejectButton}>
              <Image
                source={require("../assets/All_icons/reject.png")}
                style={styles.buttonIcon}
              />
              <Text style={styles.buttonText}>Reject</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  );

  const handleMenuOptionSelect = (option) => {
    console.log(option); // Handle the selected menu option
    setMenuVisible(false); // Close the menu
    // Additional actions based on option can be added here
    if (option === "Group Info") {
      navigation.navigate("Groupinfo");
    } else if (option === "Mute Notification") {
      console.log("Notifications muted");
    } else if (option === "Exit Group") {
      setExitConfirmationVisible(true); // Show exit confirmation popup
    }
  };
  
  const handleExitConfirmation = (confirm) => {
    if (confirm) {
      console.log("Exited group");
      // Implement exit logic here, such as navigating or updating state
    }
    setExitConfirmationVisible(false); // Close the exit confirmation
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
                   <Image
                     source={require("../assets/HomeScreenIcons/Logos/Amazon.png")}
                     style={styles.groupIcon}
                   />
                   <View>
                     <Text style={styles.headerTitle}>Amazon Coupons Corner</Text>
                     <Text style={styles.headerSubtitle}>7 Members in the group </Text>
                   </View>
                 </View>
                 <TouchableOpacity onPress={() => setMenuVisible(true)}>
                   {/* Toggle menu visibility */}
                   <Image
                     source={require("../assets/All_icons/dotmenu.png")}
                     style={styles.menuIcon}
                   />
                 </TouchableOpacity>
               </View>

        {/* Notifications */}
        <View style={styles.notificationsContainer}>
             {/* <Text style={styles.Title}>Pending Approvals </Text> */}
          <FlatList
            data={notifications}
            renderItem={renderNotification}
            keyExtractor={(item) => item.id}
          />
        </View>

             {/* MenuPopup Component */}
      <MenuPopup
        visible={menuVisible}
        onClose={() => setMenuVisible(false)}
        onOptionSelect={handleMenuOptionSelect}
      />


      {/* Exit Confirmation Popup */}
      <ExitConfirmationPopup
        visible={exitConfirmationVisible}
        onConfirm={() => handleExitConfirmation(true)}
        onCancel={() => handleExitConfirmation(false)}
      />

        {/* Floating Button */}
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
    resizeMode: "cover",
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    marginTop: 25,
  },
  backIcon: {
    width: 22,
    height: 18,
  },
  groupLogo: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: -30,
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
  notificationsContainer: {
    flex: 1,
    backgroundColor: "#fff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 20,
  },
  notificationItem: {
    flexDirection: "row",
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
  },
  avatar: {
    width: 55,
    height: 55,
    borderRadius: 25,
    marginRight: 15,
  },
  notificationContent: {
    flex: 1,
    justifyContent: "center",
  },
  notificationText: {
    fontSize: 15,
    color: "#333",
  },
  boldText: {
    fontWeight: "bold",
    color: "#000",
  },
  groupText: {
    color: "#007BFF",
    fontWeight: "bold",
  },
  actionButtons: {
    flexDirection: "row",
    marginTop: 10,
  },
  acceptButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#DFF0D8",
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 10,
    marginRight: 10,
  },
  rejectButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F2DEDE",
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 10,
  },
  buttonText: {
    color: "black",
    fontWeight: "bold",
    fontSize: 14,
    marginLeft: 5,
  },
  buttonIcon: {
    width: 16,
    height: 16,
  },
  Title: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 15,
    marginLeft: 15,
  },
});

export default Notifications;
