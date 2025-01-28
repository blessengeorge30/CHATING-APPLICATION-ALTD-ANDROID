import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
const CreateNewGroup = () => {
    const navigation = useNavigation();
  return (
    // <TouchableOpacity style={{ flexDirection: "row", marginTop: 30 }} onPress={() => navigation.navigate("NewGroup")}>
          <TouchableOpacity style={{ flexDirection: "row", marginTop: 30 }} onPress={() => navigation.navigate("CreateGroupScreen")}>
      <Image
        source={require("../assets/HomeScreenIcons/UsersThree.png")}
        style={styles.newuserbutton}
        resizeMode="contain"
      />
      <Text style={styles.createGroupText}>Create new Group</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  newuserbutton: {
    width: 58,
    height: 58,
    marginHorizontal: 15,
    marginLeft: 10,
  },
  createGroupText: {
    color: "#575757",
    fontSize: 24,
    marginTop: 10,
    fontWeight: "600",
    marginLeft: 1,
  },
});

export default CreateNewGroup;
