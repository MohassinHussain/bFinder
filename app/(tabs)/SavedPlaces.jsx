import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import React from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

import { useSelector } from "react-redux";
import { useUser } from "@clerk/clerk-expo";
export default function SavedPlaces() {
  const savedPlaces = useSelector((state) => state.savedPlaces);
  const { user } = useUser();
  return (
    // <View>
    //   <Text>SavedPlaces</Text>
    //   {/* <Text>{props.saved}</Text> */}

    //   {/* <Text style={{ color: "black", fontSize: 10 }}>{count}</Text> */}
    // </View>
    <ScrollView style={{ flex: 1, margin: wp(3) }}>
      {savedPlaces.map((data, index) => {
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
            </View>
          </View>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  mainDisplayTexts: {
    fontSize: wp(5),
    fontWeight: "bold",
  },
  subDisplayTexts: {
    fontSize: wp(5),
  },
});
