// import { View, Text, ScrollView, StyleSheet } from "react-native";
// import React, { useEffect, useState } from "react";
// import {
//   widthPercentageToDP as wp,
//   heightPercentageToDP as hp,
// } from "react-native-responsive-screen";
// import { useUser } from "@clerk/clerk-expo";
// import { onValue, ref } from "firebase/database";
// import { db } from "@/config";

// const SavedPlaces = () => {
//   const [fetchedSaved, setFetchedSaved] = useState([]);
//   const { user } = useUser();

//   useEffect(() => {
//     const userSavedPlacesRef = ref(db, `savedPlaces/${user.fullName}`);
//     onValue(userSavedPlacesRef, (snapshot) => {
//       const data = snapshot.val();
//       if (data) {
//         const newPlaces = Object.keys(data).map((key) => ({
//           id: key,
//           ...data[key],
//         }));
//         setFetchedSaved(newPlaces); // Update state with all fetched places
//       } else {
//         setFetchedSaved([]); // Clear state if no saved places
//       }
//     });
//   }, [user.fullName]); // Refetch if user changes

//   return (
//     <ScrollView style={{ flex: 1, margin: wp(3) }}>
//       {fetchedSaved.length > 0 ? (
//         fetchedSaved.map((data) => (
//           <View key={data.id} style={styles.placeContainer}>
//             <Text style={{ color: "red", fontSize: hp(2) }}>
//               Place added By: {data.placeAdderName}
//             </Text>
//             <Text style={styles.mainDisplayTexts}>
//               Place name: {data.placeName}
//             </Text>
//             <Text style={styles.mainDisplayTexts}>
//               Place suitable for: {data.placeSuitableFor}
//             </Text>
//             <Text style={styles.subDisplayTexts}>
//               Area in sq. feet: {data.area}
//             </Text>
//             <Text style={styles.subDisplayTexts}>
//               Nearest post office: {data.postOffice}
//             </Text>
//             <Text style={styles.mainDisplayTexts}>
//               Locality: {data.locality}
//             </Text>
//             <Text style={styles.subDisplayTexts}>
//               Nearest Government office: {data.govOffice}
//             </Text>
//             <Text style={styles.subDisplayTexts}>
//               District: {data.district}
//             </Text>
//             <Text style={styles.mainDisplayTexts}>
//               Owner Contact: {data.ownerContact}
//             </Text>
//             <Text style={styles.mainDisplayTexts}>
//               Place Adder Contact: {data.adderContact}
//             </Text>
//           </View>
//         ))
//       ) : (
//         <Text style={{ textAlign: "center", fontSize: hp(2.5) }}>
//           No saved places found.
//         </Text>
//       )}
//     </ScrollView>
//   );
// };

// const styles = StyleSheet.create({
//   placeContainer: {
//     margin: wp(3),
//     backgroundColor: "#D3D8E8",
//     padding: wp(3),
//     borderRadius: wp(3),
//   },
//   mainDisplayTexts: {
//     fontSize: wp(5),
//     fontWeight: "bold",
//   },
//   subDisplayTexts: {
//     fontSize: wp(5),
//   },
// });

// export default SavedPlaces;
