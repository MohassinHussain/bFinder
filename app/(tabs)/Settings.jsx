import { View, Text, Button, TouchableOpacity, Image } from "react-native";
import React from "react";
import { useClerk } from "@clerk/clerk-react";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import { useUser } from "@clerk/clerk-expo";

export default function Settings() {
  const { user } = useUser();
  const { signOut, session } = useClerk();

  const signOutClicked = async () => {
    await signOut(session.id);
  };

  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        // marginTop: hp(2),
        backgroundColor: "#B0C4DE"
      }}
    >
      <View style={{ margin: hp(10), alignItems: "center" }}>
        <Image
          source={{ uri: user.imageUrl }}
          style={{ width: wp(30), height: hp(10), borderRadius: wp(50) }}
        />
        <Text style={{ fontSize: hp(3) }}>
          {user.fullName}
          {/* {user.imageUrl} */}
        </Text>
      </View>

      <TouchableOpacity
        style={{
          backgroundColor: "skyblue",
          borderRadius: wp(2),
          padding: wp(2),
        }}
        onPress={signOutClicked}
      >
        <Text style={{ fontSize: hp(3), fontWeight: "condensed" }}>
          SignOut
        </Text>
      </TouchableOpacity>
    </View>
    // </View>
  );
}
