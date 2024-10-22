import React, { useState } from "react";
import { Tabs } from "expo-router";
import Entypo from "@expo/vector-icons/Entypo";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import Feather from "@expo/vector-icons/Feather";
import AntDesign from "@expo/vector-icons/AntDesign";

import { Dimensions, StatusBar } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
export default function TabLayout() {
  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="black" />

      <Tabs
        screenOptions={{
          tabBarStyle: {
            backgroundColor: "#bbaed9",
            borderRadius: wp(20),
            margin: wp(3),
            height: hp(5),
          },
        }}
      >
        <Tabs.Screen
          name="Home"
          options={{
            tabBarLabelStyle: {
              display: "none",
            },
            tabBarLabel: "HOME",
            tabBarIcon: ({ color }) => (
              <AntDesign name="home" size={wp(7)} color="black" />
            ),
            tabBarActiveBackgroundColor: "#FFFADA",
            // tabBarActiveTintColor: "#FFFADA",
          }}
        />
        <Tabs.Screen
          name="Explore"
          options={{
            tabBarLabel: "EXPLORE",
            tabBarLabelStyle: {
              display: "none",
            },
            tabBarIcon: ({ color }) => (
              <AntDesign name="find" size={wp(7)} color="black" />
            ),
            tabBarActiveBackgroundColor: "#FFFADA",
          }}
        />

        {/* <Tabs.Screen
          name="SavedPlaces"
          options={{
            tabBarLabel: "Saved",
            tabBarLabelStyle: {
              display: "none",
            },
            tabBarIcon: ({ color }) => (
              <MaterialIcons name="list-alt" size={wp(7)} color="black" />
            ),
            tabBarActiveBackgroundColor: "#FFFADA",
          }}
        /> */}
        <Tabs.Screen
          name="Featured"
          options={{
            tabBarLabel: "Featured",
            tabBarLabelStyle: {
              display: "none",
            },
            tabBarIcon: ({ color }) => (
              <MaterialIcons name="auto-fix-high" size={wp(7)} color="black" />
            ),
            tabBarActiveBackgroundColor: "#FFFADA",
          }}
        />
        <Tabs.Screen
          name="Settings"
          options={{
            tabBarLabel: "SETTINGS",
            tabBarLabelStyle: {
              display: "none",
            },
            tabBarIcon: ({ color }) => (
              <Feather name="settings" size={24} color="black" />
            ),
            tabBarActiveBackgroundColor: "#FFFADA",
          }}
        />
      </Tabs>
    </>
  );
}
