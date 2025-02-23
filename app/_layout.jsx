import { Stack } from "expo-router";
import {
  ClerkProvider,
  ClerkLoaded,
  SignedIn,
  SignedOut,
} from "@clerk/clerk-expo";
import { Text, StatusBar } from "react-native";
import { useFonts } from "expo-font";
import LoginScreen from "@/components/LoginScreen";
import * as SecureStore from "expo-secure-store";

// import { LoginContext } from "../components/Contexts/LoginContext";
// import { useState } from "react";

import { Provider } from "react-redux";
import { store } from "../redux/store";

const tokenCache = {
  async getToken(key) {
    try {
      const item = await SecureStore.getItemAsync(key);
      // if (item) {
      //   console.log(`${key} was used 🔐 \n`);
      // } else {
      //   console.log("No values stored under key: " + key);
      // }
      return item;
    } catch (error) {
      console.error("SecureStore get item error: ", error);
      await SecureStore.deleteItemAsync(key);
      return null;
    }
  },
  async saveToken(key, value) {
    try {
      return SecureStore.setItemAsync(key, value);
    } catch (err) {
      return;
    }
  },
};

export default function RootLayout() {
  useFonts({
    spacemono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    "opensans-normal": require("../assets/fonts/OpenSans-VariableFont_wdth,wght.ttf"),
    "opensans-italic": require("../assets/fonts/OpenSans-Italic-VariableFont_wdth,wght.ttf"),
  });

  // const [userName, setUserName] = useState("");

  return (
    <Provider store={store}>
      <StatusBar barStyle="light-content" backgroundColor="black" />
      <ClerkProvider
        tokenCache={tokenCache}
        publishableKey={process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY}
      >
        <ClerkLoaded>
          {/* <LoginContext.Provider value={{ userName, setUserName }}> */}
          <SignedIn>
            <Stack screenOptions={{ headerShown: false }}>
              <Stack.Screen name="index" />
              <Stack.Screen name="(tabs)" />
            </Stack>
          </SignedIn>

          <SignedOut>
            <LoginScreen>SIGNED OUT</LoginScreen>
          </SignedOut>
          {/* </LoginContext.Provider> */}
        </ClerkLoaded>
      </ClerkProvider>
    </Provider>
  );
}