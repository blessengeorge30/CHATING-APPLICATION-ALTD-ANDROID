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




const notifications = [
  {
    id: "1",
    user: "Anitha Hddh",
    action: "invited Tim Antony to join",
    group: "Amazon Coupon Corner",
    type: "approval",
  },
  {
    id: "2",
    user: "Jeseca Mariya",
    action: "added a coupon in",
    group: "Amazon Coupon Corner",
    type: "info",
  },
  {
    id: "3",
    user: "Anitha Hddh",
    action: "invited Jeseca Mariya to join",
    group: "FlipKart Shopperz Zone",
    type: "approval",
  },
  {
    id: "4",
    user: "Tim Antony",
    action: "added a coupon in",
    group: "General Gift Coupons",
    type: "info",
  },
  {
    id: "5",
    user: "Johnathan Antony",
    action: "added a coupon in",
    group: "General Gift Coupons",
    type: "info",
  },
];


const Notifiactions = () => {
  const navigation = useNavigation();
   const [isMenuVisible, setIsMenuVisible] = useState(false);
 
   const renderNotification = ({ item }) => (
      <View style={styles.notificationItem}>
          <Image
            source={require("../assets/HeaderIcons/test.png")}
            style={styles.avatar}
          />
          <View style={styles.notificationTextContainer}>
            <Text style={styles.notificationText}>
              <Text style={styles.boldText}>{item.user}</Text> {item.action}{" "}
              <Text style={styles.boldText}>{item.group}</Text>
            </Text>
            {item.type === "approval" && (
              <View style={styles.actionButtons}>
                <TouchableOpacity style={styles.acceptButton}>
                  <Text style={styles.buttonText}>ACCEPT</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.rejectButton}>
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
                          onPress={() => navigation.navigate("MainMenuScreen")}
                        >
                          <Image
                            source={require("../assets/HomeScreenIcons/Menu.png")}
                            style={styles.menuImage}
                            resizeMode="contain"
                          />
                        </TouchableOpacity>
                      </View>
        </View>
      

        {/* Notifications List */}
       <View style={styles.notificationsContainer}>
                 <FlatList
                   data={notifications}
                   renderItem={renderNotification}
                   keyExtractor={(item) => item.id}
                   showsVerticalScrollIndicator={false}
                 />
               </View>

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
    width: "100%",
    height: "100%",
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 20,
    marginTop: 55,
  },
  backIcon: {
    width: 22,
    height: 18,
  },
  groupLogo: {
    flexDirection: "row",
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
    marginTop: 5,
    backgroundColor: "white",
    flex: 1,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 25,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    height: 820,
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
  headerIcons: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft:120
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
  notificationsContainer: {
    flex: 1,
    backgroundColor: "#fff",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 20,
    marginTop: -10,
  },
  notificationItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 20,
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
    paddingVertical: 5,
    borderRadius: 20,
    marginRight: 10,
  },
  rejectButton: {
    backgroundColor: "#F2DEDE",
    paddingHorizontal: 15,
    paddingVertical: 5,
    borderRadius: 20,
  },
  buttonText: {
    fontSize: 12,
    color: "#333",
    fontWeight: "bold",
  },
});

export default Notifiactions;