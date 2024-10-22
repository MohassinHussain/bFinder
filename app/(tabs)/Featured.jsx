import { View, Text, ScrollView, StyleSheet, Image } from "react-native";
import React from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

export default function Featured() {
  const featuredPlaces = [
    {
      placeName: "NEW",
      district: "THIS",
      owner: "SOME",
      image: require("../../assets/images/place2.jpeg"),
    },
    {
      placeName: "NEWone",
      district: "THISone",
      owner: "SOMEone",
      image: require("../../assets/images/place3.jpeg"), //
    },
  ];

  return (
    <ScrollView>
      {featuredPlaces.map((place, index) => {
        return (
          <View
            key={index}
            style={{
              backgroundColor: "#c5c6d0",
              borderRadius: wp(1),
              margin: hp(1.5),
              padding: hp(1),
            }}
          >
            <Image
              source={place.image} // Use the image from the object
              style={styles.imageStyle}
            />
            <Text style={styles.textStyle}>Place Name: {place.placeName}</Text>
            <Text style={styles.textStyle}>District: {place.district}</Text>
            <Text style={styles.textStyle}>Owner: {place.owner}</Text>
          </View>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  textStyle: {
    fontSize: hp(2),
  },
  imageStyle: {
    width: wp(80),
    height: hp(20),
    margin: wp(3),
    borderRadius: wp(3),
  },
});
