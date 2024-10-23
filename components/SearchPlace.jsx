import { View, Text, StyleSheet, TextInput, Button } from "react-native";
import React, { useState } from "react";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import axios from "axios";

export const SearchPlace = () => {
  const [searchQuery, setSearchQuery] = useState("");

  //   const fetchPlaces = async (query) => {
  //     try {
  //       const response = await fetch(
  //         `https://api.example.com/places?query=${query}&key=AIzaSyCP_O4b4o0ZQmUq2S5siw_Cn3EE4Eu8M48`
  //       );
  //       const data = await response.json();
  //       console.log(data);
  //       // Handle the data as needed
  //     } catch (error) {
  //       console.error("Error fetching places:", error);
  //     }
  //   };

  const handleSearch = async () => {
    console.log("Search query entered:", searchQuery); // Log what is being sent
    try {
      await axios
        .post("http://192.168.56.1:5000/search", { searchQuery })
        .then((res) => {
          console.log(res.data);
        })
        .catch((e) => {
          console.log(e);
        });
    } catch (e) {
      console.log("Error in handleSearch:", e);
    }
  };

  return (
    <View style={styles.mainContainer}>
      <Text style={styles.text}>SearchPlace</Text>
      <View style={styles.promptBar}>
        <TextInput
          style={styles.input}
          placeholder="Enter place name"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        <Button title="Search" onPress={handleSearch} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    height: hp(20),
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: hp(4),
  },
  promptBar: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: hp(2),
  },
  input: {
    height: hp(6),
    width: wp(60),
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginRight: wp(2),
  },
});

// AIzaSyCP_O4b4o0ZQmUq2S5siw_Cn3EE4Eu8M48
