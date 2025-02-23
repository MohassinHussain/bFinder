import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Button,
  Alert,
} from "react-native";
import React, { useState } from "react";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import axios from "axios";

// import { PLACES_API_KEY } from "react-native-dotenv";

// import { Clipboard } from "react-native";

export const SearchPlace = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [places, setPlaces] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);
  const [lattitude, setLattitude] = useState("");
  const [longitude, setLongitude] = useState("");

  const handleSearch = async () => {
    console.log("Search query entered:", searchQuery);

    const query = encodeURIComponent(searchQuery);

    const geocodeUrl = `https://api.tomtom.com/search/2/geocode/${query}.json?key=${PLACES_API_KEY}`;

    try {
      const geoResponse = await axios.get(geocodeUrl);
      const geoResult = geoResponse.data;

      if (geoResult && geoResult.results && geoResult.results.length > 0) {
        const { lat, lon } = geoResult.results[0].position;
        setLattitude(lat);
        setLongitude(lon);

        const nearbySearchUrl = `https://api.tomtom.com/search/2/nearbySearch/.json?key=${PLACES_API_KEY}&lat=${lat}&lon=${lon}&radius=500&limit=30`;
        const nearbyResponse = await axios.get(nearbySearchUrl);
        const nearbyResults = nearbyResponse.data;

        const keywords = [
          "store",
          "shope",
          "retail",
          "shop",
          "grocery",
          "kirana",
          "hotel",
          "restro",
          "restaurant",
          "stationery",
          "chicken",
          "fast",
          "chinese",
          "xerox",
          "business",
          "company",
          "enterprise",
          "outlet",
          "emporium",
          "market",
          "dairy",
          "vegetable",
          "fresh",
        ];

        if (
          nearbyResults &&
          nearbyResults.results &&
          nearbyResults.results.length > 0
        ) {
          const filteredPlaces = nearbyResults.results.filter((place) =>
            keywords.some((keyword) =>
              place.poi.name.toLowerCase().includes(keyword)
            )
          );

          if (filteredPlaces.length > 0) {
            setPlaces(filteredPlaces);
          } else {
            setPlaces(nearbyResults.results);
          }

          setErrorMessage(null);
        } else {
          setErrorMessage("No nearby places found.");
          setPlaces([]);
        }
      } else {
        setErrorMessage("No geocoding results found.");
        setPlaces([]);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setErrorMessage("Error fetching data.");
      setPlaces([]);
    }
  };

  const renderPlace = (place) => (
    <View style={styles.placeItem} key={place.id}>
      <Text style={styles.placeName}>
        {place.poi.name} - {place.address.freeformAddress}
      </Text>
      {/* <View style={styles.coordinatesContainer}>
        <Text style={styles.coordinatesText}>Latitude: {lattitude}</Text>
        <Text style={styles.coordinatesText}>Longitude: {longitude}</Text>
        
      </View> */}
    </View>
  );

  return (
    <View style={styles.mainContainer}>
      <Text style={styles.text}>Search Place 🔎</Text>
      <View style={styles.promptBar}>
        <TextInput
          style={styles.input}
          placeholder="Enter place name"
          placeholderTextColor="gray"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        <TouchableOpacity onPress={handleSearch} style={styles.searchButton}>
          <Text style={styles.searchButtonText}>Search</Text>
        </TouchableOpacity>
      </View>

      {errorMessage && <Text style={styles.errorText}>{errorMessage}</Text>}

      <ScrollView style={styles.placesList}>
        {places.length > 0 ? (
          places.map((place) => renderPlace(place))
        ) : (
          <Text style={styles.noResultsText}>
            {errorMessage ? errorMessage : "No places found. 😔"}
          </Text>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#4682B4",
    padding: wp(5),
    borderRadius: hp(2),
    margin: hp(1)
  },
  text: {
    fontSize: hp(3),
    fontWeight: "bold",
    color: "#1E2952",
  },
  promptBar: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: hp(2),
    width: wp(80),
  },
  input: {
    height: hp(6),
    flex: 1,
    borderColor: "gray",
    borderWidth: wp(0.5),
    borderRadius: hp(1),
    paddingHorizontal: wp(4),
    color: "white",
    fontSize: hp(2),
    backgroundColor: "#333",
  },
  searchButton: {
    backgroundColor: "black",
    borderRadius: hp(1),
    paddingVertical: hp(1.5),
    paddingHorizontal: wp(4),
    marginLeft: wp(2),
  },
  searchButtonText: {
    color: "white",
    fontSize: hp(2),
    fontWeight: "bold",
  },
  placesList: {
    marginTop: hp(4),
    width: wp(90),
  },
  placeItem: {
    padding: hp(2),
    backgroundColor: "#444",
    marginVertical: hp(0.5),
    borderRadius: hp(1),
  },
  placeName: {
    fontSize: hp(2.2),
    color: "white",
  },
  coordinatesContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: hp(2),
  },
  coordinatesText: {
    fontSize: hp(2),
    padding: hp(1),
  },
  errorText: {
    marginTop: hp(2),
    fontSize: hp(2),
    color: "red",
  },
  noResultsText: {
    textAlign: "center",
    fontSize: hp(2),
    color: "white",
    marginTop: hp(1),
  },
});
