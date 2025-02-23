import { View, Text, ScrollView, StyleSheet, Image } from "react-native";
import React from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

export default function Featured() {
  const featuredPlaces = [
    {
      placeSuitableFor: "Whole sale",
      placeName: "Miyapur",
      district: "Medchal",
      owner: "Kishore Kumar",
      image: require("../../assets/images/place2.jpeg"),
    },
    {
      placeSuitableFor: "Retail grocery/ Super mart",
      placeName: "Nampally, beside numaish ground",
      district: "Hyderabad",
      owner: "Zubair",
      image: require("../../assets/images/place3.jpeg"), //
    },
  ];

  return (
    <ScrollView style={{ flex: 1, backgroundColor: "#002147" }}>
      <Text
        style={{
          fontSize: hp(3.4),
          textAlign: "center",
          borderBottomWidth: hp(0.1),
          borderColor: "white",
          // backgroundColor: "#000428",
          color: "#E1EBEE",
          borderRadius: hp(2),
          margin: wp(3),
        }}
      >
        Featured
      </Text>
      <Text
        style={{ color: "#E1EBEE", fontSize: hp(2), textAlign: "center" }}
      >
        The places we Recommend! 🔥
      </Text>
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

            <View style={{ flex: 1, flexDirection: "row" }}>
              <Text style={styles.textStyle}>Place Suitable For:</Text>
              <Text style={{ fontSize: hp(1.8) }}>
                {place.placeSuitableFor}
              </Text>
            </View>

            <View style={{ flex: 1, flexDirection: "row" }}>
              <Text style={styles.textStyle}>Place Name: </Text>
              <Text style={{ fontSize: hp(1.8) }}>{place.placeName}</Text>
            </View>

            <View style={{ flex: 1, flexDirection: "row" }}>
              <Text style={styles.textStyle}>District: </Text>
              <Text style={{ fontSize: hp(1.8) }}>{place.district}</Text>
            </View>

            <View style={{ flex: 1, flexDirection: "row" }}>
              <Text style={styles.textStyle}>Owner: </Text>
              <Text style={{ fontSize: hp(1.8) }}>{place.owner}</Text>
            </View>
          </View>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  textStyle: {
    fontSize: hp(1.8),
    fontWeight: "700",
    fontStyle: "italic",
  },
  imageStyle: {
    width: wp(80),
    height: hp(20),
    margin: wp(3),
    borderRadius: wp(3),
  },
});
