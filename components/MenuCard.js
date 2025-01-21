// Components/MenuCard.js
import React from "react";
import { TouchableOpacity, View, Text, Image, StyleSheet } from "react-native";
import PropTypes from "prop-types";

const MenuCard = ({ item, onPress }) => (
  <TouchableOpacity style={styles.card} onPress={onPress}>
    <View style={styles.cardContent}>
      <View style={styles.imageContainer}>
        <Image style={styles.image} source={item.image} />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.subText}>{item.subText}</Text>
      </View>
      <Image style={styles.imageNext} source={item.image1} />
    </View>
  </TouchableOpacity>
);

MenuCard.propTypes = {
  item: PropTypes.object.isRequired,
  onPress: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
  card: {
    width: "46%",
    backgroundColor: "#f9f9f9",
    borderRadius: 15,
    padding: 15,
    marginVertical: 8,
    marginHorizontal: 5,
    alignItems: "center",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
  },
  cardContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  imageContainer: {
    borderRadius: 50,
    marginBottom: 10,
  },
  image: {
    width: 40,
    height: 40,
    resizeMode: "contain",
  },
  textContainer: {
    flex: 1,
    marginLeft: 10,
  },
  name: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#333",
  },
  subText: {
    fontSize: 10,
    color: "#B0AA02",
    marginTop: 5,
  },
  imageNext: {
    width: 14,
    height: 14,
    marginTop: 20,
    resizeMode: "contain",
  },
});

export default MenuCard;
