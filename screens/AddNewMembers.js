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
import ADDGROUPMEMBERS from "../components/DummyData/AddMembersData"; 

const AddNewMembers = () => {
  const navigation = useNavigation();
  const [menuVisible, setMenuVisible] = useState(false);
  const [exitConfirmationVisible, setExitConfirmationVisible] = useState(false);
  const [selectedMembers, setSelectedMembers] = useState([]); 

  const handlePress = () => {
    console.log("Floating Button Pressed!");
  };

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

  const toggleMemberSelection = (id) => {
    setSelectedMembers((prev) =>
      prev.includes(id)
        ? prev.filter((memberId) => memberId !== id)
        : [...prev, id]
    );
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
            <Image
              source={require("../assets/HomeScreenIcons/Logos/Amazon.png")}
              style={styles.groupIcon}
            />
            <View>
              <Text style={styles.headerTitle}>Amazon Coupons Corner</Text>
              <Text style={styles.headerSubtitle}>Add New Members </Text>
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

        {/* Form */}
        <View style={styles.formContainer}>
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
    justifyContent: "space-between",
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
    alignItems: "center",
    marginLeft: -35,
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
    marginBottom: 15,
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
});

export default AddNewMembers;
