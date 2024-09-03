import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  ScrollView,
  Geolocation,
  Button,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import React, { useEffect, useState } from "react";

import MapView, { Marker } from "react-native-maps";
import Entypo from "@expo/vector-icons/Entypo";
import Geocoder from "react-native-geocoding";
import * as Location from "expo-location";
// const responsiveWidth = Dimensions.get("window").width;
// Geocoder.init('');

import { LoginContext } from "../../components/Contexts/LoginContext";
import { useContext } from "react";
import { useUser } from "@clerk/clerk-expo";

export default function Home() {
  const { userName } = useContext(LoginContext);

  const [position, setPosition] = useState();
  // const [address, setAddress] = useState();
  useEffect(() => {
    const getPermissions = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Grant Location");
        return;
      }
      let currentLocation = await Location.getCurrentPositionAsync({});
      setPosition(currentLocation);
      // console.log("CURRENT: ", currentLocation);
      console.log("current latitude: ", currentLocation.coords.latitude);
      console.log("current longitude: ", currentLocation.coords.longitude);
      // const res = await fetch(
      //   `https://geocode.maps.co/reverse?lat=${currentLocation.coords.latitude}&lon=${currentLocation.coords.longitude}&api_key=dk`
      // );
      // console.log(res.json());
    };
    getPermissions();
  }, []);

  const [lat, setLat] = useState();
  const [long, setLong] = useState();

  useEffect(() => {
    setLat(-18.333935827326563);
    setLong(48.26392315328121);
  }, []);
  const { user } = useUser();
  return (
    <ScrollView>
      {/* <StatusBar barStyle="light-content" backgroundColor="black" /> */}
      <View style={styles.mainContainer}>
        <Text style={{ fontSize: wp(9) }}>
          Welcome to Myapp, {user.fullName}!
        </Text>
      </View>
      <View style={{ marginLeft: wp(3), marginTop: hp(4) }}>
        <Text
          style={{
            // fontFamily: "opensans-normal",
            fontSize: wp(6),
            fontWeight: "bold",
          }}
        >
          Featured
        </Text>
      </View>
      <ScrollView scrollEnabled={true} horizontal>
        <Image
          source={require("../../assets/images/image.webp")}
          style={styles.sliderImage}
        />
        <Image
          source={require("../../assets/images/image.webp")}
          style={styles.sliderImage}
        />
        <Image
          source={require("../../assets/images/image.webp")}
          style={styles.sliderImage}
        />
        <Image
          source={require("../../assets/images/image.webp")}
          style={styles.sliderImage}
        />
      </ScrollView>
      <View style={{ flex: 1, alignItems: "center" }}>
        <TouchableOpacity
          style={{ backgroundColor: "skyblue", borderRadius: wp(3) }}
        >
          <Text
            style={{
              // fontFamily: "opensans-normal",
              color: "black",
              fontWeight: "semibold",
              fontSize: wp(4),
              padding: wp(2),
            }}
          >
            Explore more featured
          </Text>
        </TouchableOpacity>
      </View>
      <View style={{ marginLeft: wp(3) }}>
        <Text
          style={{
            // fontFamily: "opensans-normal",
            fontWeight: "bold",
            fontSize: wp(6),
          }}
        >
          Maps
        </Text>
        <MapView
          // mapType="satellite"
          userInterfaceStyle="light"
          showsUserLocation={true}
          userLocationPriority="high"
          // userLocationUpdateInterval="1000"
          showsMyLocationButton={true}
          showsCompass={true}
          showsTraffic={true}
          showsIndoors={true}
          showsBuildings={true}
          scrollDuringRotateOrZoomEnabled={true}
          toolbarEnabled={true}
          onPress={(event) => {
            {
              const { latitude, longitude } = event.nativeEvent.coordinate;
              console.log("Latitude:", latitude);
              console.log("Longitude:", longitude);
              setLat(latitude);
              setLong(longitude);
            }
          }}
          style={{
            marginLeft: wp(2),
            width: wp(90),

            height: hp(40),
          }}
        >
          <Marker
            coordinate={{
              latitude: lat,
              longitude: long,
            }}
          >
            <View>
              <Entypo name="location-pin" size={24} color="red" />
            </View>
          </Marker>
        </MapView>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    // flex: 1,
    alignItems: "center",
  },
  sliderImage: {
    width: wp(100),
    height: hp(20),
    margin: wp(2),
    borderRadius: wp(3),
  },
});
