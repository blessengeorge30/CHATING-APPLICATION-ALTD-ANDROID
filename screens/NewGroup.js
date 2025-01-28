import React, { useState, useEffect } from "react";
import { 
  View, Text, Image, TouchableOpacity, StyleSheet, ImageBackground, 
  FlatList, PermissionsAndroid, Platform, TextInput, Linking 
} from "react-native";
import Contacts from "react-native-contacts";
import { useNavigation } from "@react-navigation/native";
import FloatingButton from "../components/FloatingButton";

const NewGroup = () => {
  const navigation = useNavigation();
  const [contacts, setContacts] = useState([]);
  const [filteredContacts, setFilteredContacts] = useState([]);
  const [selectedMembers, setSelectedMembers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [showSearch, setShowSearch] = useState(false);

  useEffect(() => {
    requestContactsPermission();
  }, []);

  const requestContactsPermission = async () => {
    if (Platform.OS === "android") {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_CONTACTS
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        fetchContacts();
      } else {
        console.log("Contacts permission denied");
      }
    } else {
      fetchContacts();
    }
  };

  const fetchContacts = async () => {
    try {
      const phoneContacts = await Contacts.getAll();
      const formattedContacts = phoneContacts.map(contact => ({
        id: contact.recordID,
        name: contact.displayName || "Unknown",
        phone: contact.phoneNumbers.length > 0 ? contact.phoneNumbers[0].number : "No Number",
        isAppUser: checkIfUserExists(contact.phoneNumbers)
      }));
      formattedContacts.sort((a, b) => a.name.localeCompare(b.name));
      setContacts(formattedContacts);
      setFilteredContacts(formattedContacts); // Initialize filtered contacts
    } catch (error) {
      console.error("Error fetching contacts:", error);
    }
  };

  const checkIfUserExists = (phoneNumbers) => {
    return false; // Placeholder logic
  };

  const toggleMemberSelection = (id) => {
    setSelectedMembers((prev) =>
      prev.includes(id) ? prev.filter((memberId) => memberId !== id) : [...prev, id]
    );
  };

  const handleSearch = (text) => {
    setSearchQuery(text);
    const filtered = contacts.filter(contact =>
      (contact.name ? contact.name.toLowerCase().includes(text.toLowerCase()) : false) ||
      (contact.phone ? contact.phone.includes(text) : false)
    );
    setFilteredContacts(filtered);
  };

  const sendWhatsAppInvite = (phone) => {
    if (!phone || phone === "No Number") {
      console.log("Invalid phone number");
      return;
    }

    const message = "Hey! Join us on this amazing app. Download it now!";
  const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;

  Linking.openURL(url).catch((err) => console.error("An error occurred", err));

  };

  const renderMember = ({ item }) => {
    // console.log('item.phone', item.phone);
    
    const isSelected = selectedMembers.includes(item.id);
    return (
      <TouchableOpacity style={styles.memberContainer} onPress={() => toggleMemberSelection(item.id)}>
        <Image source={require("../assets/user.jpg")} style={styles.memberImage} />
        <View style={styles.memberInfo}>
          <Text style={styles.memberName}>{item.name}</Text>
          <Text style={styles.memberPhone}>{item.phone}</Text>
        </View>
        {item.isAppUser ? (
          <Image
            source={isSelected ? require("../assets/All_icons/tick1.png") : require("../assets/All_icons/cross1.png")}
            style={styles.checkboxIcon}
          />
        ) : (
          <TouchableOpacity style={styles.inviteButton} onPress={() => sendWhatsAppInvite(item.phone)}>
            <Text style={styles.inviteText}>Invite</Text>
          </TouchableOpacity>
        )}
      </TouchableOpacity>
    );
  };

  const handleNext = () => {
    const selectedContacts = contacts.filter(contact => selectedMembers.includes(contact.id));
    navigation.navigate("NewGroupDetails", { selectedContacts });
  };

  return (
    <View style={styles.container}>
      <ImageBackground source={require("../assets/HeaderIcons/splashbg.png")} style={styles.backgroundImage}>
        <View style={styles.headerContainer}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image source={require("../assets/All_icons/back.png")} style={styles.backIcon} />
          </TouchableOpacity>
          <View>
            <Text style={styles.headerTitle}>New Group</Text>
            <Text style={styles.headerSubtitle}>{contacts.length} Contacts</Text>
          </View>
        </View>

        <View style={styles.formContainer}>
          <View style={styles.searchHeader}>
            {showSearch ? (
              <TextInput
                style={styles.searchInput}
                placeholder="Search contacts..."
                value={searchQuery}
                onChangeText={handleSearch}
              />
            ) : (
              <Text style={styles.contactsTitle}>Contacts in your Phone</Text>
            )}
            <TouchableOpacity onPress={() => setShowSearch(!showSearch)}>
              <Image source={require("../assets/All_icons/search.png")} style={styles.searchIcon} />
            </TouchableOpacity>
          </View>

          <FlatList 
            data={filteredContacts} 
            renderItem={renderMember} 
            keyExtractor={(item) => item.id} 
            showsVerticalScrollIndicator={false} // Hide the default scroll indicator
            contentContainerStyle={styles.scrollContent}
            style={styles.flatList}
          />
        </View>

        <FloatingButton onPress={handleNext} imageSource={require("../assets/All_icons/floatingbuttonnext.png")} size={100} />
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  backgroundImage: { flex: 1, width: "100%", height: "100%" },
  headerContainer: { flexDirection: "row", alignItems: "center", padding: 20, marginTop: 20 },
  backIcon: { width: 22, height: 18 , marginHorizontal: 5 },
  formContainer: { marginTop: 10, backgroundColor: "white", flex: 1, borderTopLeftRadius: 30, borderTopRightRadius: 30, padding: 25 },
  searchHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 15 },
  contactsTitle: { fontSize: 16, fontWeight: "bold" },
  searchIcon: { width: 18, height: 18, tintColor: "#555" },
  searchInput: { flex: 1, borderBottomWidth: 1, borderColor: "#ccc", padding: 5, marginRight: 10, fontSize: 16 },
  memberContainer: { flexDirection: "row", alignItems: "center", marginBottom: 15 },
  memberImage: { width: 50, height: 50, borderRadius: 25, marginRight: 15 },
  memberInfo: { flex: 1 },
  memberName: { fontSize: 16, fontWeight: "bold" },
  memberPhone: { fontSize: 14, color: "#666" },
  checkboxIcon: { width: 24, height: 24 },
  inviteButton: { backgroundColor: "#007AFF", padding: 8, borderRadius: 5 },
  inviteText: { color: "white", fontSize: 14 },
  headerTitle: { fontSize: 18, fontWeight: "bold", color: "#333", marginHorizontal: 14 },
  headerSubtitle: { color: "#333", fontSize: 12, marginHorizontal: 14 },
  scrollContent: {
    paddingBottom: 100, // To make space for the floating button
  },
  flatList: {
    flex: 1,
  },
});

export default NewGroup;
