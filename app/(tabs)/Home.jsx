import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import React, { useEffect, useState, useContext } from "react";
import MapView, { Marker } from "react-native-maps";
import Entypo from "@expo/vector-icons/Entypo";
import * as Location from "expo-location";
import { LoginContext } from "../../components/Contexts/LoginContext";
import { useUser } from "@clerk/clerk-expo";
import { useNavigation } from "@react-navigation/native";
import { SearchPlace } from "@/components/SearchPlace";
import { LinearGradient } from "expo-linear-gradient";
import axios from "axios";
import { PLACES_API_KEY } from "react-native-dotenv";

// import dot

export default function Home() {
  const navigation = useNavigation();
  const { userName } = useContext(LoginContext);
  const [position, setPosition] = useState();
  const [places, setPlaces] = useState([]); // State to store nearby places
  const [lat, setLat] = useState(-18.333935827326563); // Default Latitude
  const [long, setLong] = useState(48.26392315328121); // Default Longitude
  const { user } = useUser();

  useEffect(() => {
    console.log(process.env.PLACES_API_KEY);
    console.log(PLACES_API_KEY);

    const getPermissions = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Grant Location");
        return;
      }
      let currentLocation = await Location.getCurrentPositionAsync({});
      setPosition(currentLocation);
      setLat(currentLocation.coords.latitude);
      setLong(currentLocation.coords.longitude);
    };
    getPermissions();
  }, []);
  useEffect(() => {
    async function fetchP() {
      try {
        // Use the current latitude and longitude for the nearby search
        const nearbySearchUrl = `https://api.tomtom.com/search/2/nearbySearch/.json?key=${PLACES_API_KEY}&lat=${lat}&lon=${long}&radius=500&limit=30`;
        const nearbyResponse = await axios.get(nearbySearchUrl);
        const nearbyResults = nearbyResponse.data;

        // Define keywords/synonyms to filter results
        const keywords = [
          "store",
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
          setPlaces(
            filteredPlaces.length > 0 ? filteredPlaces : nearbyResults.results
          );
        } else {
          setPlaces([]); // Clear places list if no results
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setPlaces([]); // Clear places list on error
      }
    }
    if (lat && long) {
      fetchP();
    }
  }, [lat, long]); // Fetch places when latitude or longitude changes

  return (
    <LinearGradient colors={["#914a4a", "#1240ab"]} style={styles.gradient}>
      <ScrollView>
        <View style={styles.mainContainer}>
          <Text style={{ fontSize: wp(9), color: "white" }}>
            Welcome to bFinder, {user.fullName}!
          </Text>
        </View>
        <View style={{ marginLeft: wp(3), marginTop: hp(4) }}>
          <Text style={styles.featuredText}>Featured</Text>
        </View>
        <ScrollView scrollEnabled={true} horizontal>
          <Image
            source={require("../../assets/images/place2.jpeg")}
            style={styles.sliderImage}
          />
          <Image
            source={require("../../assets/images/place1.jpeg")}
            style={styles.sliderImage}
          />
          <Image
            source={require("../../assets/images/place3.jpeg")}
            style={styles.sliderImage}
          />
          <Image
            source={require("../../assets/images/image.webp")}
            style={styles.sliderImage}
          />
        </ScrollView>
        <View style={{ flex: 1, alignItems: "center", margin: hp(2) }}>
          <TouchableOpacity
            style={{ backgroundColor: "skyblue", borderRadius: wp(3) }}
          >
            <Text
              style={{
                color: "black",
                fontWeight: "semibold",
                fontSize: wp(4),
                padding: wp(2),
              }}
              onPress={() => navigation.navigate("Featured")}
            >
              Explore more featured
            </Text>
          </TouchableOpacity>
        </View>
        <SearchPlace />

        <View style={{ marginLeft: wp(3) }}>
          <Text style={styles.mapHeader}>Maps</Text>
          <MapView
            userInterfaceStyle="light"
            showsUserLocation={true}
            userLocationPriority="high"
            showsMyLocationButton={true}
            showsCompass={true}
            showsTraffic={true}
            showsIndoors={true}
            showsBuildings={true}
            style={styles.map}
            onPress={(event) => {
              const { latitude, longitude } = event.nativeEvent.coordinate;
              console.log("Marker's Latitude:", latitude);
              console.log("Marker's Longitude:", longitude);
              setLat(latitude);
              setLong(longitude);
            }}
          >
            <Marker coordinate={{ latitude: lat, longitude: long }}>
              <Entypo name="location-pin" size={hp(3)} color="red" />
            </Marker>
          </MapView>

          {/* businesses at Current place or marker's  */}

          <View style={styles.placesContainer}>
            <Text style={styles.placesHeader}>Businesses near you/ marker</Text>
            {places.length > 0 ? (
              places.map((place, index) => (
                <View
                  key={index}
                  style={{
                    backgroundColor: "black",
                    margin: hp(2),
                    padding: hp(1),
                    borderRadius: hp(2),
                  }}
                >
                  <Text style={styles.placeText}>
                    {place.poi.name} - {place.address.freeformAddress}
                  </Text>
                </View>
              ))
            ) : (
              <Text style={styles.noPlacesText}>No nearby places found.</Text>
            )}
          </View>
          {/* Render places below the map */}
        </View>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    marginTop: hp(7),
    alignItems: "center",
  },
  sliderImage: {
    width: wp(100),
    height: hp(25),
    margin: wp(2),
    borderRadius: wp(3),
  },
  featuredText: {
    fontSize: hp(4),
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
  },
  mapHeader: {
    fontSize: hp(4),
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
    padding: hp(2),
  },
  map: {
    marginLeft: wp(2),
    width: wp(90),
    height: hp(50),
  },
  placesContainer: {
    margin: hp(2),
    backgroundColor: "gray",
    padding: hp(2),
    borderRadius: hp(2),
  },
  placesHeader: {
    fontSize: hp(4),
    fontWeight: "bold",
    color: "white",
    marginBottom: hp(1),
  },
  placeText: {
    color: "white",
    fontSize: hp(2),
    marginVertical: hp(0.5),
  },
  noPlacesText: {
    color: "white",
    fontSize: hp(3),
  },
});
