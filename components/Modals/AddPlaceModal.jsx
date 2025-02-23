import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import React, { useState, useEffect } from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useUser } from "@clerk/clerk-expo";

import { db } from "../../config";
import { ref, set } from "firebase/database";

export default function AddPlaceModal({ places, setPlaces }) {
  const [placeName, setPlaceName] = useState("");
  const [placeSuitableFor, setPlaceSuitableFor] = useState("");
  const [area, setArea] = useState("");
  const [locality, setLocality] = useState("");
  const [govOffice, setGovOffice] = useState("");
  const [postOffice, setPostOffice] = useState("");
  const [district, setDistrict] = useState("");
  const [ownerContact, setOwnerContact] = useState("");
  const [adderContact, setAdderContact] = useState("");
  const [isVisible, setIsVisible] = useState(false);

  const { user } = useUser();

  useEffect(() => {
    // console.log(places);
  }, [places]);

  const addPlaceClicked = () => {
    if (
      placeName?.trim() === "" ||
      area?.trim() === "" ||
      placeSuitableFor?.trim() === "" ||
      locality?.trim() === "" ||
      govOffice?.trim() === "" ||
      postOffice?.trim() === "" ||
      district?.trim() === "" ||
      ownerContact?.trim() === "" ||
      adderContact?.trim() === ""
    ) {
      Alert.alert("Fields Important", "All fields are important!", [
        {
          text: "Okay",
        },
      ]);
    } else {
      const newPlace = {
        placeName,
        area,
        locality,
        govOffice,
        postOffice,
        district,
        ownerContact,
        adderContact,
        placeSuitableFor,
      };

      setPlaces((prevPlaces) => [...prevPlaces, newPlace]);
      set(ref(db, "places/" + placeName + " added by " + user.fullName), {
        placeAdderName: user.fullName, //name of the one who adds the place
        placeName: placeName,
        placeSuitableFor: placeSuitableFor,
        area: area,
        locality: locality,
        govOffice: govOffice,
        postOffice: postOffice,
        district: district,
        ownerContact: ownerContact,
        adderContact: adderContact, //contact of the one who adds the place
      });
      // setPlaceAdder(user.fullName);

      // Clear the form fields
      setPlaceName("");
      setArea("");
      setLocality("");
      setGovOffice("");
      setPostOffice("");
      setDistrict("");
      setOwnerContact("");
      setPlaceSuitableFor("");
      setAdderContact("");
      // console.log(places);

      Alert.alert("Added", "Place added successfully", [
        {
          text: "Okay",
        },
      ]);

      setIsVisible(false);
    }
  };
  const placeDetails = [
    {
      title: placeName,
      setTitle: setPlaceName,
      placeHolder: "Enter Place name",
    },
    {
      title: placeSuitableFor,
      setTitle: setPlaceSuitableFor,
      placeHolder: "Enter Place suitable for",
    },
    { title: area, setTitle: setArea, placeHolder: "Enter Area in sq. feet" },
    { title: locality, setTitle: setLocality, placeHolder: "Enter Locality" },
    {
      title: govOffice,
      setTitle: setGovOffice,
      placeHolder: "Enter nearest gov office name",
    },
    {
      title: postOffice,
      setTitle: setPostOffice,
      placeHolder: "Enter nearest postal code(pin code)",
    },
    {
      title: district,
      setTitle: setDistrict,
      placeHolder: "Enter district of place",
    },
    {
      title: ownerContact,
      setTitle: setOwnerContact,
      placeHolder: "Owner contact",
    },
    {
      title: adderContact,
      setTitle: setAdderContact,
      placeHolder: "Your contact",
    },
  ];
  return (
    <KeyboardAwareScrollView style={{ flex: 1 }}>
      <View>
        <View style={{ alignItems: "center", marginTop: hp(2) }}>
          <Text style={{ fontSize: hp(3) }}>Add a place</Text>
          <View>
            {placeDetails.map((data, index) => {
              return (
                <TextInput
                  key={index}
                  value={data.title}
                  onChangeText={(text) => {
                    data.setTitle(text);
                  }}
                  placeholder={data.placeHolder}
                  style={styles.textInputs}
                  required={true}
                  multiline={true}
                />
              );
            })}

            <TouchableOpacity
              style={{
                alignItems: "center",
                marginTop: hp(3),
                marginBottom: hp(3),
                backgroundColor: "skyblue",
                borderRadius: wp(50),
                padding: wp(2),
              }}
              onPress={addPlaceClicked}
            >
              <Text style={{ fontSize: hp(2) }}>Add the place</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  textInputs: {
    marginTop: hp(3),
    padding: wp(3),
    paddingLeft: wp(0),
    width: wp(70),
    borderBottomWidth: 2,
    fontSize: hp(2),
  },
});
