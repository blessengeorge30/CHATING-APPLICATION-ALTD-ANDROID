import React ,{ useState }from "react";
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
import CameraPopup from "../components/CamaraPopup"; 

const { width, height } = Dimensions.get("window");

const Profile = () => {
  const navigation = useNavigation();
    const [isCameraPopupVisible, setIsCameraPopupVisible] = useState(false); 

  const handlePress = () => {
    console.log("Floating Button Pressed!");
  };

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
          {/* Header Section */}
          <View style={styles.headerContainer}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Image
                source={require("../assets/All_icons/back.png")}
                style={styles.backIcon}
                resizeMode="contain"
              />
            </TouchableOpacity>
            <Text style={styles.headerText}>Profile Edit</Text>
          </View>

          {/* Details Section */}
          <View style={styles.detailsSection}>
            {/* Profile Section */}
            <View style={styles.profileSection}>
              <View style={styles.profileImageContainer}>
                <Image
                  source={require("../assets/HeaderIcons/test.png")}
                  style={styles.profileImage}
                />
                <TouchableOpacity style={styles.editIcon} onPress={() => setIsCameraPopupVisible(true)} >
                  <View style={{
                    backgroundColor: '#575757', padding: 8, borderRadius: 100
                  }}>
                    <Image  
                      source={require("../assets/All_icons/edit.png")}
                      style={styles.smallIcon}
                    />
                  </View>

                </TouchableOpacity>
              </View>
            </View>

            {/* Name */}
            <View style={styles.detailRow}>
              <Image
                source={require("../assets/All_icons/bio.png")}
                style={styles.icon1}
              />
              <Text style={styles.detailText}>Test User </Text>
              <TouchableOpacity>
                <Image
                  source={require("../assets/All_icons/edit.png")}
                  style={styles.icon}
                />
              </TouchableOpacity>
            </View>

            {/* Bio */}
            <View style={styles.detailRow}>
              <Image
                source={require("../assets/All_icons/info.png")}
                style={styles.icon1}
              />
              <Text style={[styles.detailText, styles.bioText]}>
                Lorem ipsum dolor sit amet consectetur. Blandit nam dui egestas
                ullamcorper aliquam ipsum enim cursus amet.
              </Text>
              <TouchableOpacity>
                <Image
                  source={require("../assets/All_icons/edit.png")}
                  style={styles.icon}
                />
              </TouchableOpacity>
            </View>

            {/* Phone */}
            <View style={styles.detailRow}>
              <Image
                source={require("../assets/All_icons/phone1.png")}
                style={styles.icon1}
              />
              <Text style={styles.detailText}>9061 000 000</Text>
              <TouchableOpacity onPress={() => navigation.navigate("EditPhone")}>
                <Image
                  source={require("../assets/All_icons/edit.png")}
                  style={styles.icon}
                />
              </TouchableOpacity>
            </View>

            {/* Email */}
            <View style={styles.detailRow}>
              <Image
                source={require("../assets/All_icons/mail.png")}
                style={styles.icon1}
              />
              <Text style={styles.detailText}>George@gmail.com</Text>
              <TouchableOpacity>
                <Image
                  source={require("../assets/All_icons/edit.png")}
                  style={styles.icon}
                />
              </TouchableOpacity>
            </View>
          </View>

          <FloatingButton
            onPress={handlePress}
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
    marginTop: 25,
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
    tintColor: "white",
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
    height: 720,
  },
  detailRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: height * 0.03,
  },
  detailText: {
    flex: 1,
    marginHorizontal: width * 0.03,
    fontSize: height * 0.018,
    color: "#333",
  },
  bioText: {
    fontSize: height * 0.014,
    color: "#666",
  },
  icon: {
    width: 19,
    height: 20,
    resizeMode: "contain",
  },
  icon1: {
    width: 19,
    height: 20,
    resizeMode: "contain",
    tintColor: "#333",
  },
  smallIcon: {
    width: 14,
    height: 12,
    resizeMode: "contain",
    tintColor: "white",
  },
  backIcon: {
    height: 20,
    width: 20,
    marginRight: 2
  }
});

export default Profile;
