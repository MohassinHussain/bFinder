import {
  View,
  Text,
  Modal,
  Button,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Image,
  KeyboardAvoidingView,
} from "react-native";
import React, { useEffect, useState } from "react";

import AddPlaceModal from "@/components/Modals/AddPlaceModal";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import PlaceModal from "@/components/Modals/PlaceModal";
import { useUser } from "@clerk/clerk-expo";

import { db } from "../../config";
import { ref, onValue } from "firebase/database";
// import SavedPlaces from "./SavedPlaces";

import { useDispatch } from "react-redux";
import { addPlaceToSaved } from "../../redux/savedPlacesSlice";
const Explore = () => {
  const dispatch = useDispatch();
  const { user } = useUser();
  const [places, setPlaces] = useState([]);
  const [isVisible, setIsVisible] = useState(false);
  const [isPlaceModalVisible, setIsPlaceModalVisible] = useState(false);
  const [fetchedPlaces, setFetchedPlaces] = useState([]);
  const [placeAdder, setPlaceAdder] = useState("");

  useEffect(() => {
    const startCountRef = ref(db, "places/");
    onValue(startCountRef, (snapshot) => {
      const data = snapshot.val();
      const newPlaces = Object.keys(data).map((key) => ({
        id: key,
        ...data[key],
      }));
      // console.log(newPlaces);
      setFetchedPlaces(newPlaces);
    });
  }, []);

  return (
    <>
      <ScrollView style={{ flex: 1, margin: wp(3) }}>
        <Text style={{ fontSize: hp(3), color: "#28231d" }}>
          Note: Your name ({user.fullName}) will be visible to everyone if you
          add place.
        </Text>

        {fetchedPlaces.map((data, index) => {
          return (
            <View
              key={index}
              style={{
                margin: wp(3),
                backgroundColor: "#D3D8E8",
                padding: wp(3),
                borderRadius: wp(3),
              }}
            >
              <View style={{ display: "flex", flexDirection: "column" }}>
                <View>
                  <Text style={{ color: "red", fontSize: hp(2) }}>
                    Place added By: {data.placeAdderName}
                  </Text>
                  <Text style={styles.mainDisplayTexts}>
                    Place name: {data.placeName}
                  </Text>
                  <Text style={styles.mainDisplayTexts}>
                    Place suitable for: {data.placeSuitableFor}
                  </Text>
                  <Text style={styles.subDisplayTexts}>
                    Area in sq. feet: {data.area}
                  </Text>
                  <Text style={styles.subDisplayTexts}>
                    Nearest post office: {data.postOffice}
                  </Text>
                  <Text style={styles.mainDisplayTexts}>
                    Locality: {data.locality}
                  </Text>
                  <Text style={styles.subDisplayTexts}>
                    Nearest Government office: {data.govOffice}
                  </Text>
                  <Text style={styles.subDisplayTexts}>
                    District: {data.district}
                  </Text>
                  <Text style={styles.mainDisplayTexts}>
                    Owner Contact: {data.ownerContact}
                  </Text>
                  <Text style={styles.mainDisplayTexts}>
                    Place Adder Contact: {data.adderContact}
                  </Text>
                </View>
                <View style={{ margin: wp(2) }}>
                  <Text>Image</Text>
                </View>
                <View>
                  <TouchableOpacity
                    style={{
                      backgroundColor: "green",
                      alignItems: "center",
                      borderRadius: wp(10),
                    }}
                    onPress={() => {
                      console.log(data);
                      dispatch(addPlaceToSaved(data));
                    }}
                  >
                    <Text style={{ color: "white", fontSize: hp(2.5) }}>
                      Save Place
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          );
        })}

        <Modal
          animationType="fade"
          visible={isVisible}
          onRequestClose={() => setIsVisible(false)}
        >
          <AddPlaceModal
            places={places}
            setPlaces={setPlaces}
            setIsVisible={setIsVisible}
            setPlaceAdder={setPlaceAdder}
          />
        </Modal>
      </ScrollView>
      <TouchableOpacity
        style={{
          fontSize: wp(4),
          position: "absolute",
          bottom: hp(2),
          right: wp(4),
        }}
        onPress={() => setIsVisible(true)}
      >
        <View
          style={{
            backgroundColor: "black",
            padding: wp(2),
            borderRadius: wp(50),
          }}
        >
          <FontAwesome6 name="add" size={wp(10)} color="#f8eeec" />
        </View>
      </TouchableOpacity>
    </>
  );
};

const styles = StyleSheet.create({
  mainDisplayTexts: {
    fontSize: wp(5),
    fontWeight: "bold",
  },
  subDisplayTexts: {
    fontSize: wp(5),
  },
});

export default Explore;
