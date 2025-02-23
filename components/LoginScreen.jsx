import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StatusBar,
  Image,
} from "react-native";
import React from "react";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import * as Linking from "expo-linking";
import { useWarmUpBrowser } from "./../hooks/useWarmUpBrowser";
import * as WebBrowser from "expo-web-browser";
import { useOAuth } from "@clerk/clerk-expo";

WebBrowser.maybeCompleteAuthSession();
export default function LoginScreen() {
  useWarmUpBrowser();
  const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });

  const onPressOfSignin = React.useCallback(async () => {
    try {
      const { createdSessionId, signIn, signUp, setActive } =
        await startOAuthFlow({
          //   redirectUrl: Linking.createURL("/dashboard", { scheme: "myapp" }),
        });

      if (createdSessionId) {
        setActive({ session: createdSessionId });
      } else {
        // Use signIn or signUp for next steps such as MFA
      }
    } catch (err) {
      console.error("OAuth error", err);
    }
  }, []);

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="black" />

      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#89CFF0",
          
        }}
      >
        <Image source={require("../assets/images/icon.jpg")} style={{borderRadius: hp(14)}} />
        <View style={{ margin: hp(4) }}>
          <Text style={{ textAlign: "center", fontSize: hp(4) }}>
            Welcome to bFinder
          </Text>
          <Text
            style={{
              textAlign: "center",
              fontSize: hp(2),
              fontStyle: "italic",
            }}
          >
            Feel pleasured to have business!
          </Text>
        </View>
        <View>
          <TouchableOpacity
            style={{
              // backgroundColor: "#0000FF",
              borderRadius: wp(3),
              padding: wp(2),
            }}
            onPress={onPressOfSignin}
          >
            <Text
              style={{ color: "#13274F", fontSize: hp(3), fontWeight: "800" }}
            >
              Google Login
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
}
