import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  Switch,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import MenuPopup from "../components/MenuPopup"; 

const AddCouponScreen = () => {
  const navigation = useNavigation();
  const [isOtpRequired, setIsOtpRequired] = useState(false);
  const [couponCode, setCouponCode] = useState("");
  const [comments, setComments] = useState("");
  const [isCouponCodeValid, setIsCouponCodeValid] = useState(true);
  const [isMenuVisible, setIsMenuVisible] = useState(false); 

  const handleToggleSwitch = () => setIsOtpRequired((prev) => !prev);

  const validateCouponCode = () => {
    const isValid = /^[A-Z0-9]{5,10}$/.test(couponCode);
    setIsCouponCodeValid(isValid);
    return isValid;
  };

  const handleSubmit = () => {
    if (validateCouponCode()) {
      console.log("Coupon Code:", couponCode);
      console.log("OTP Required:", isOtpRequired);
      console.log("Comments:", comments);
    } else {
      console.log("Invalid Coupon Code");
    }
  };

  const handleMenuOptionSelect = (option) => {
    console.log("Selected Option:", option);
    setIsMenuVisible(false); 
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
          <View style={styles.groupheaderdetails}>
            <Image
              source={require("../assets/HomeScreenIcons/Logos/Amazon.png")}
              style={styles.groupIcon}
            />
            <View>
              <Text style={styles.headerTitle}>Amazon Coupons Corner</Text>
              <Text style={styles.headerSubtitle}>5 Members</Text>
            </View>
          </View>
          <TouchableOpacity onPress={() => setIsMenuVisible(true)}>
           
            <Image
              source={require("../assets/All_icons/dotmenu.png")}
              style={styles.menuIcon}
            />
          </TouchableOpacity>
        </View>

        {/* Form */}
        <View style={styles.formContainer}>
          <Text style={styles.formTitle}>ADD NEW COUPON</Text>

          {/* Coupon Code Input */}
          <View style={styles.inputRow}>
            <TextInput
              style={[
                styles.textInput,
                !isCouponCodeValid && { borderColor: "red" },
              ]}
              placeholder="Enter Coupon Code"
               placeholderTextColor="#888"
              value={couponCode}
              onChangeText={(text) => {
                setCouponCode(text);
                setIsCouponCodeValid(true);
              }}
              onBlur={validateCouponCode}
            />
            <TouchableOpacity style={styles.imageUploadButton}>
              <Image
                source={require("../assets/All_icons/gallery.png")}
                style={styles.imageUploadIcon}
              />
            </TouchableOpacity>
          </View>

          {!isCouponCodeValid && (
            <Text style={styles.errorText}>
              Invalid coupon code. Use 5-10 alphanumeric characters.
            </Text>
          )}

          {/* OTP Switch */}
          <View style={styles.switchRow}>
            <Text style={styles.switchLabel}>OTP Required?</Text>
            <Switch
              value={isOtpRequired}
              onValueChange={handleToggleSwitch}
              thumbColor={isOtpRequired ? "#F2E71C" : "#f4f3f4"}
              trackColor={{ false: "#ddd", true: "#ddd" }}
              style={styles.switch}
            />
          </View>

          {/* Comments Input */}
          <TextInput
            style={styles.commentsInput}
            placeholder="Comments"
             placeholderTextColor="#888"
            multiline
            value={comments}
            onChangeText={setComments}
          />

          {/* Submit Button */}
          <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
            <Image
              source={require("../assets/All_icons/forward.png")}
              style={styles.submitIcon}
            />
          </TouchableOpacity>
        </View>
      </ImageBackground>

      {/* MenuPopup Component */}
      <MenuPopup
        visible={isMenuVisible}
        onClose={() => setIsMenuVisible(false)} 
        onOptionSelect={handleMenuOptionSelect} 
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
    marginTop: 15,
  },
  backIcon: {
    width: 22,
    height: 18,
  },
  groupheaderdetails: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft:-30
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
  formTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 20,
    marginTop: 20,
  },
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  textInput: {
    flex: 1,
    height: 50,
    borderWidth: 1,
    borderColor: "#DDD",
    borderRadius: 10,
    paddingHorizontal: 15,
    backgroundColor: "#F9F9F9",
  },
  imageUploadButton: {
    marginLeft: 10,
    backgroundColor: "#E8E248",
    padding: 15,
    borderRadius: 10,
  },
  imageUploadIcon: {
    width: 23,
    height: 19,
  },
  switchRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  switchLabel: {
    flex: 1,
    fontSize: 14,
    color: "#333",
  },
  switch: {
    transform: [{ scaleX: 0.8 }, { scaleY: 0.8 }],
  },
  commentsInput: {
    height: 100,
    borderWidth: 1,
    borderColor: "#DDD",
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: "#F9F9F9",
    textAlignVertical: "top",
    marginBottom: 20,
  },
  submitButton: {
    backgroundColor: "#E8E248",
    width: 80,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    alignSelf: "center",
  },
  submitIcon: {
    width: 25,
    height: 20,
  },
  errorText: {
    color: "red",
    fontSize: 12,
    marginBottom: 10,
    marginLeft: 3,
  },
});

export default AddCouponScreen;
