import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

const GroupItem = ({ item }) => {
  const navigation = useNavigation();

  const handlePress = () => {
    navigation.navigate("GroupView", {
      groupData: item,
    });
  };

  return (
    <TouchableOpacity style={styles.container} onPress={handlePress}>
      {/* Avatar Image */}
      {item.image ? (
        <Image source={{ uri: item.image }} style={styles.avatar} />
      ) : (
        <View style={styles.avatarPlaceholder}>
          <Text style={styles.avatarText}>No Image</Text>
        </View>
      )}

      <View style={styles.details}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.members}>Members: {item.membersCount}</Text>
      </View>

      {/* Display Time Only */}
      <Text style={styles.time}>
        {new Date(item.createdAt).toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'})}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 20,
  },
  avatarPlaceholder: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#ccc",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 20,
  },
  avatarText: {
    color: "#fff",
    fontSize: 12,
  },
  details: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
  },
  members: {
    fontSize: 14,
    color: "#888",
  },
  time: {
    fontSize: 14,
    color: "#888",
  },
});

export default GroupItem;
