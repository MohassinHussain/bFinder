import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from "react-native";
import React, { useEffect, useState } from "react";
import AddPlaceModal from "@/components/Modals/AddPlaceModal";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { useUser } from "@clerk/clerk-expo";
import { db } from "../../config";
import { ref, onValue } from "firebase/database";
import { useDispatch } from "react-redux";
// import { addPlaceToSaved } from "../../redux/savedPlacesSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Explore = () => {
  // const dispatch = useDispatch();
  const { user } = useUser();
  const [places, setPlaces] = useState([]);
  const [isVisible, setIsVisible] = useState(false);
  const [fetchedPlaces, setFetchedPlaces] = useState([]);
  const [likedPlaces, setLikedPlaces] = useState({}); // To track liked places

  useEffect(() => {
    const loadLikedPlaces = async () => {
      try {
        const likedPlacesData = await AsyncStorage.getItem("likedPlaces");
        if (likedPlacesData) {
          setLikedPlaces(JSON.parse(likedPlacesData));
        }
      } catch (error) {
        console.error("Failed to load liked places", error);
      }
    };

    loadLikedPlaces();

    const startCountRef = ref(db, "places/");
    onValue(startCountRef, (snapshot) => {
      const data = snapshot.val();
      const newPlaces = Object.keys(data).map((key) => ({
        id: key,
        ...data[key],
      }));
      setFetchedPlaces(newPlaces);
    });
  }, []);

  const toggleLikePlace = async (placeId, data) => {
    setLikedPlaces((prev) => {
      const newLikedPlaces = { ...prev };
      if (newLikedPlaces[placeId]) {
        delete newLikedPlaces[placeId]; // Remove if already liked
      } else {
        newLikedPlaces[placeId] = data; // Add to liked places
      }

      // Save liked places to AsyncStorage
      AsyncStorage.setItem("likedPlaces", JSON.stringify(newLikedPlaces)).catch(
        (error) => {
          console.error("Failed to save liked places", error);
        }
      );

      return newLikedPlaces;
    });
  };

  return (
    <>
      <ScrollView style={{ flex: 1, margin: wp(3) }}>
        <Text style={{ fontSize: hp(3), color: "#28231d" }}>
          Note: Your name ({user.fullName}) will be visible to everyone if you
          add a place.
        </Text>

        {fetchedPlaces.map((data) => (
          <View key={data.id} style={styles.placeContainer}>
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
            <TouchableOpacity
              style={styles.likeButton}
              onPress={() => toggleLikePlace(data.id, data)}
            >
              <FontAwesome6
                name={likedPlaces[data.id] ? "heart" : "heart"}
                size={wp(6)}
                color={likedPlaces[data.id] ? "red" : "grey"}
              />
            </TouchableOpacity>
          </View>
        ))}

        <Modal
          animationType="fade"
          visible={isVisible}
          onRequestClose={() => setIsVisible(false)}
        >
          <AddPlaceModal
            places={places}
            setPlaces={setPlaces}
            setIsVisible={setIsVisible}
          />
        </Modal>
      </ScrollView>
      <TouchableOpacity
        style={{
          position: "absolute",
          bottom: hp(2),
          right: wp(4),
        }}
        onPress={() => setIsVisible(true)}
      >
        <View style={styles.addButton}>
          <FontAwesome6 name="add" size={wp(10)} color="#f8eeec" />
        </View>
      </TouchableOpacity>
    </>
  );
};

const styles = StyleSheet.create({
  placeContainer: {
    margin: wp(3),
    backgroundColor: "#D3D8E8",
    padding: wp(3),
    borderRadius: wp(3),
  },
  likeButton: {
    alignItems: "center",
    padding: wp(2),
  },
  addButton: {
    backgroundColor: "black",
    padding: wp(2),
    borderRadius: wp(50),
  },
  mainDisplayTexts: {
    fontSize: wp(5),
    fontWeight: "bold",
  },
  subDisplayTexts: {
    fontSize: wp(5),
  },
});

export default Explore;
