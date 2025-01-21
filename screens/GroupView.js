import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TextInput,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  ImageBackground,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import PromoCard from "../components/ChatCouponCard";
import MenuPopup from "../components/MenuPopup";
import ExitConfirmationPopup from "../components/ExitConfirmationPopup";

const GroupChatScreen = () => {
  const navigation = useNavigation();
  const [messages, setMessages] = useState([
    { id: "1", name: "Hafizur Rahman", message: "Have a great working week!!", time: "09:25 AM" },
    { id: "2", name: "Majharul Haque", message: "Anyone need an Amazon coupon for Gadgets? Flat 5% off...", time: "09:25 AM", isPromo: true },
    { id: "3", name: "You", message: "You did your job well!", time: "09:25 AM" },
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [menuVisible, setMenuVisible] = useState(false);
  const [exitConfirmationVisible, setExitConfirmationVisible] = useState(false);

  const handleSendMessage = () => {
    if (inputMessage.trim() === "") return;

    const newMessage = {
      id: Date.now().toString(),
      name: "You",
      message: inputMessage,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };
    setMessages([...messages, newMessage]);
    setInputMessage("");
  };

  const handleMenuOptionSelect = (option) => {
    console.log(option); // Handle the selected menu option
    setMenuVisible(false); // Close the menu
    // Additional actions based on option can be added here
    if (option === "Group Info") {
      navigation.navigate("Groupinfo");
    } else if (option === "Group Members") {
      navigation.navigate("GroupMembers");
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

  const renderMessageItem = ({ item }) => (
    <View style={styles.chats}>
      <View style={[styles.messageContainer, item.name === "You" && styles.myMessage]}>
        <Text style={styles.messageSender}>{item.name}</Text>
        <Text style={styles.messageText}>{item.message}</Text>
        <Text style={styles.messageTime}>{item.time}</Text>
      </View>
      {/* Conditionally Render PromoCard */}
      {item.isPromo && <PromoCard />}
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
          <View style={styles.headerContainer}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Image
                source={require("../assets/All_icons/back.png")}
                style={styles.backIcon}
              />
            </TouchableOpacity>
            <TouchableOpacity style={styles.GroupLogo} onPress={() => navigation.navigate("GroupMembers")}>
              <Image
                source={require("../assets/HomeScreenIcons/Logos/Amazon.png")}
                style={styles.LogogroupIcon}
              />
              <View>
                <Text style={styles.headerTitle}>Amazon Coupons Corner</Text>
                <Text style={styles.headerTitle1}>7 members</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setMenuVisible(true)}>
              <Image
                source={require("../assets/All_icons/dotmenu.png")}
                style={styles.menuIcon}
              />
            </TouchableOpacity>
          </View>

          <View style={styles.welcomeContainer}>
            {/* Chat List */}
            <FlatList
              data={messages}
              keyExtractor={(item) => item.id}
              renderItem={renderMessageItem}
              style={styles.chatList}
            />

            {/* Message Input */}
            <View style={styles.inputContainer}>
              <TouchableOpacity onPress={() => navigation.navigate("AddCoupon")}>
                <Image
                  source={require("../assets/All_icons/coupon.png")}
                  style={styles.couponIcon}
                />
              </TouchableOpacity>

              <TextInput
                style={styles.textInput}
                placeholder="Write your message"
                value={inputMessage}
                onChangeText={setInputMessage}
              />
              <TouchableOpacity style={styles.sendButton} onPress={handleSendMessage}>
                <Image
                  source={require("../assets/All_icons/send.png")}
                  style={styles.sendIcon}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ImageBackground>

      {/* Menu Popup */}
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
  backIcon: {
    width: 22,
    height: 18,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginTop: 1,
  },
  headerTitle1: {
    fontSize: 12,
    fontWeight: "400",
    color: "#333",
  },
  menuIcon: {
    width: 5,
    height: 45,
    marginRight: 10,
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
  headerIcons: {
    flexDirection: "row",
    alignItems: "center",
  },
  welcomeContainer: {
    position: "absolute",
    top: 105,
    left: 0,
    right: 0,
    height: 795,
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
  chatList: {
    flex: 1,
    padding: 10,
    marginTop: 20,
  },
  messageContainer: {
    marginVertical: 5,
    padding: 10,
    borderRadius: 10,
    backgroundColor: "#F6F4D1",
    alignSelf: "flex-start",
    maxWidth: "80%",
  },
  myMessage: {
    alignSelf: "flex-end",
    backgroundColor: "#E8E248",
  },
  messageSender: {
    fontWeight: "bold",
    marginBottom: 3,
  },
  messageText: {
    fontSize: 16,
  },
  messageTime: {
    fontSize: 12,
    color: "#888",
    marginTop: 5,
    alignSelf: "flex-end",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    backgroundColor: "#FFF",
    borderTopWidth: 1,
    borderTopColor: "#DDD",
    marginBottom: 45,
  },
  textInput: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: "#DDD",
    borderRadius: 20,
    paddingHorizontal: 15,
    backgroundColor: "#F9F9F9",
  },
  sendButton: {
    backgroundColor: "#E8E248",
    borderRadius: 10,
    marginLeft: 10,
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  sendIcon: {
    width: 20,
    height: 20,
  },
  couponIcon: {
    width: 21.5,
    height: 17,
    marginRight: 10,
  },
  GroupLogo: {
    flexDirection: "row",
  },
  LogogroupIcon: {
    height: 40,
    width: 40,
    marginHorizontal: 10,
    marginLeft: -48,

  },
  chats: {},
});

export default GroupChatScreen;
