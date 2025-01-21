import React from "react";
import { View, Text, Image, StyleSheet, FlatList, TouchableOpacity } from "react-native";

const MemberList = ({ members }) => {
    const renderMemberItem = ({ item }) => (
        <TouchableOpacity style={styles.memberRow}>
            <Image source={item.image} style={styles.memberImage} />
            <View>
                <Text style={styles.memberName}>{item.name}</Text>
                <Text style={styles.memberPhone}>{item.phone}</Text>
            </View>
        </TouchableOpacity>
    );

    return (
        <>
            <Text style={styles.membersTitle}>MEMBERS : {members.length}</Text>
            <FlatList
                data={members}
                keyExtractor={(item) => item.id}
                renderItem={renderMemberItem}
            />
        </>
    );
};

const styles = StyleSheet.create({
    membersTitle: {
        fontSize: 16,
        fontWeight: "bold",
        marginBottom: 18,
        marginTop: 30,
        marginLeft: 10,
        color: "#333",
    },
    memberRow: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 15,
    },
    memberImage: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginRight: 10,
    },
    memberName: {
        fontSize: 14,
        fontWeight: "bold",
        color: "#333",
    },
    memberPhone: {
        fontSize: 12,
        color: "#666",
    },
});

export default MemberList;
