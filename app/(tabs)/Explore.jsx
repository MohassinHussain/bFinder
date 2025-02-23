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
import { ref, onValue, remove } from "firebase/database";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Explore = () => {
  const { user } = useUser();
  const [places, setPlaces] = useState([]);
  const [isVisible, setIsVisible] = useState(false);
  const [fetchedPlaces, setFetchedPlaces] = useState([]);
  const [likedPlaces, setLikedPlaces] = useState({});
  const [deleteConfirmData, setDeleteConfirmData] = useState(null);

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
        delete newLikedPlaces[placeId];
      } else {
        newLikedPlaces[placeId] = data;
      }

      AsyncStorage.setItem("likedPlaces", JSON.stringify(newLikedPlaces)).catch(
        (error) => {
          console.error("Failed to save liked places", error);
        }
      );

      return newLikedPlaces;
    });
  };

  const handleDeletePlace = async (placeId) => {
    try {
      const placeRef = ref(db, `places/${placeId}`);
      await remove(placeRef);

      setFetchedPlaces((prevPlaces) =>
        prevPlaces.filter((place) => place.id !== placeId)
      );

      setDeleteConfirmData(null);
    } catch (error) {
      console.error("Failed to delete place:", error);
    }
  };

  return (
    <>
      <ScrollView style={{ flex: 1, backgroundColor: "#002147"}}>
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
          Explore
        </Text>
        <Text
          style={{
            marginHorizontal: hp(3),
            fontSize: hp(2),
            color: "#E1EBEE",
            fontStyle: "italic",
          }}
        >
          Note: Your name ({user.fullName}) will be visible to everyone if you
          add a place.
        </Text>

        {fetchedPlaces.map((data) => (
          <View key={data.id} style={styles.placeContainer}>
            <View>
              <Modal
                animationType="fade"
                visible={!!deleteConfirmData} // Show if deleteConfirmData is set
                onRequestClose={() => setDeleteConfirmData(null)} // Close when user cancels
              >
                <View style={styles.modalContainer}>
                  <Text style={styles.modalText}>
                    Are you sure you want to delete this place, 
                     {deleteConfirmData?.placeName}?
                  </Text>

                  <View style={styles.modalButtons}>
                    <TouchableOpacity
                      style={styles.confirmButton}
                      onPress={() => handleDeletePlace(deleteConfirmData?.id)}
                    >
                      <Text style={styles.modalButtonText}>Confirm</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={styles.cancelButton}
                      onPress={() => setDeleteConfirmData(null)}
                    >
                      <Text style={styles.modalButtonText}>Cancel</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </Modal>
              {user.fullName === data.placeAdderName && (
                <TouchableOpacity
                  style={styles.deleteButton}
                  onPress={() =>
                    setDeleteConfirmData({
                      id: data.id,
                      placeName: data.placeName,
                    })
                  } // Save place ID and name to delete
                >
                  <FontAwesome6 name="trash" size={hp(3)} color="black" />
                </TouchableOpacity>
              )}

              <Text style={{ color: "red", fontSize: hp(2) }}>
                Place added By: {data.placeAdderName}
                {user.fullName === data.placeAdderName && " (YOU)"}
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
  deleteButton: {
    alignItems: "flex-end",
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
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalText: {
    fontSize: wp(5),
    color: "white",
    marginBottom: hp(2),
  },
  modalButtons: {
    flexDirection: "row",
  },
  confirmButton: {
    backgroundColor: "red",
    padding: wp(3),
    marginRight: wp(2),
    borderRadius: wp(3),
  },
  cancelButton: {
    backgroundColor: "grey",
    padding: wp(3),
    borderRadius: wp(3),
  },
  modalButtonText: {
    color: "white",
    fontSize: wp(4),
  },
});

export default Explore;
