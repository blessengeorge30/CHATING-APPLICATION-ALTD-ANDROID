import React, { useState } from "react";
import {
  View,
  TextInput,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  Dimensions,

  ImageBackground,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { firebase } from "@react-native-firebase/app";
import "@react-native-firebase/firestore";
import FloatingButton from "../components/FloatingButton";
import { launchImageLibrary } from "react-native-image-picker";
import CameraPopup from "../components/CamaraPopup";

const { width, height } = Dimensions.get("window");

const CreateGroupScreen = () => {
    const navigation = useNavigation();
  const route = useRoute();
  const { group } = route.params || {};

  const [groupName, setGroupName] = useState(group?.name || "");
  const [groupDescription, setGroupDescription] = useState(group?.description || "");
  const [groupImage, setGroupImage] = useState(group?.image ? { uri: group.image } : null);
  const [membersCount, setMembersCount] = useState(group?.membersCount?.toString() || "");
  const [isCameraPopupVisible, setIsCameraPopupVisible] = useState(false);

  const selectImage = () => {
    launchImageLibrary({ mediaType: "photo" }, (response) => {
      if (response.didCancel) {
        console.log("User cancelled image picker");
      } else if (response.errorCode) {
        console.log("ImagePicker Error: ", response.errorMessage);
      } else {
        const source = { uri: response.assets[0].uri };
        setGroupImage(source);
      }
    });
  };

  const handleCameraOptionSelect = (option) => {
    console.log("Selected Option:", option);
    setIsCameraPopupVisible(false);
    if (option === "camera") {
      console.log("Camera option selected");
    } else if (option === "gallery") {
      selectImage();
    }
  };

  const handleSubmit = async () => {
    if (!groupName || !groupDescription || !membersCount) {
      alert("Please fill all fields!");
      return;
    }

    const groupData = {
      name: groupName,
      description: groupDescription,
      image: groupImage ? groupImage.uri : null,
      membersCount: parseInt(membersCount),
      createdAt: group?.createdAt || new Date().toISOString(),
    };

    try {
      if (group) {
        await firebase.firestore().collection("groups").doc(group.id).update(groupData);
      } else {
        await firebase.firestore().collection("groups").add(groupData);
      }
      navigation.goBack();
    } catch (error) {
      console.error("Error saving group: ", error);
    }
  };

  const handleAddMembers = () => {
    navigation.navigate("NewGroup", {
      groupId: group?.id,
      onMembersAdded: (count) => setMembersCount(count.toString()),
    });
  };

  return (
    <View style={styles.safeArea}>
      <ImageBackground
        source={require("../assets/HeaderIcons/splashbg.png")}
        style={styles.backgroundImage}
      >
        <View style={styles.container}>
          {/* Header */}
          <View style={styles.headerContainer}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Image source={require("../assets/All_icons/back.png")} style={styles.backIcon} />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>
              {group ? "Edit Group" : "Create New Group"}
            </Text>
            <View style={{ width: 40 }} /> {/* Placeholder for spacing */}
          </View>

          {/* Profile Section */}
          <View style={styles.profileSection}>
            <View style={styles.profileImageContainer}>
              <Image
                source={groupImage || require("../assets/user.jpg")}
                style={styles.profileImage}
              />
              <TouchableOpacity
                style={styles.editIcon}
                onPress={() => setIsCameraPopupVisible(true)}
              >
                <View style={styles.editOption}>
                  <Image
                    source={require("../assets/All_icons/edit.png")}
                    style={styles.smallIcon}
                  />
                </View>
              </TouchableOpacity>
            </View>
          </View>

          {/* Form Inputs */}
          <View style={styles.detailsSection}>
            <TextInput
              style={styles.input}
              placeholder="Group Name"
              value={groupName}
              onChangeText={setGroupName}
              placeholderTextColor="#b0b0b0"
            />
            <TextInput
              style={styles.input}
              placeholder="Group Description"
              value={groupDescription}
              onChangeText={setGroupDescription}
              placeholderTextColor="#b0b0b0"
            />
            <TextInput
              style={styles.input}
              placeholder="Number of Members"
              value={membersCount}
              onChangeText={setMembersCount}
              keyboardType="numeric"
              placeholderTextColor="#b0b0b0"
            />

            {/* Add Members Button */}
            <TouchableOpacity style={styles.addButton} onPress={handleAddMembers}>
              <Text style={styles.addButtonText}>Add Members</Text>
            </TouchableOpacity>

            {/* Create/Update Group Button */}
            <TouchableOpacity style={styles.createButton} onPress={handleSubmit}>
              <Text style={styles.createButtonText}>
                {group ? "Update Group" : "Create Group"}
              </Text>
            </TouchableOpacity>

            {/* Cancel Button */}
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Text style={styles.cancelButton}>Cancel</Text>
            </TouchableOpacity>
          </View>

              {/* Floating Button */}
              <FloatingButton
                    onPress={() => navigation.navigate("Home")}
                    imageSource={require("../assets/All_icons/floatingbuttontick.png")}
                    size={100}
                />

          {/* CameraPopup Component */}
          <CameraPopup
            visible={isCameraPopupVisible}
            onClose={() => setIsCameraPopupVisible(false)}
            onOptionSelect={handleCameraOptionSelect}
          />
        </View>
      </ImageBackground>
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
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 20,
    paddingVertical: height * 0.02,
    paddingHorizontal: width * 0.05,
    marginBottom: 20,
  },
  backIcon: {
    width: 25,
    height: 19,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
  },
  profileSection: {
    alignItems: "center",
    marginBottom: 30,
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
  editOption: {
    backgroundColor: '#575757',
    padding: 8,
    borderRadius: 100,
  },
  smallIcon: {
    width: 14,
    height: 12,
    tintColor: "white",
  },
  detailsSection: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: width * 0.05,
    marginTop: height * 0.02,
    elevation: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    height:900
  },
  input: {
    height: 50,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 15,
    paddingLeft: 15,
    fontSize: 16,
    backgroundColor: "#f9f9f9",
  },
  addButton: {
    backgroundColor: "#E8E248",
    padding: 15,
    borderRadius: 30,
    alignItems: "center",
    marginBottom: 15,
  },
  addButtonText: {
    color: "black",
    fontWeight: "bold",
    fontSize: 16,
  },
  createButton: {
    backgroundColor: "#575757",
    padding: 15,
    borderRadius: 30,
    alignItems: "center",
    marginBottom: 15,
  },
  createButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
  cancelButton: {
    color: "#f44336",
    fontSize: 16,
    textAlign: "center",
    marginTop: 20,
  },
});

export default CreateGroupScreen;
