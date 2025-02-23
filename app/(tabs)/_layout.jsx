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
            backgroundColor: "#002D72",
            // borderBottomRadius: wp(20),
            // margin: wp(3),
            height: hp(4.5),
            
          },
          headerShown: false,
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
              <AntDesign name="home" size={hp(2.5)} color="#73C2FB" />
            ),
            tabBarActiveBackgroundColor: "#004792",
            tabBarActiveTintColor: "#E1EBEE"
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
              <AntDesign name="find" size={hp(2.5)} color="#73C2FB" />
            ),
            tabBarActiveBackgroundColor: "#004792",
          }}
        />

        
        <Tabs.Screen
          name="Featured"
          options={{
            tabBarLabel: "Featured",
            tabBarLabelStyle: {
              display: "none",
            },
            tabBarIcon: ({ color }) => (
              <MaterialIcons name="auto-fix-high" size={hp(2.5)} color="#73C2FB" />
            ),
            tabBarActiveBackgroundColor: "#004792",
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
              <Feather name="settings" size={hp(2.5)} color="#73C2FB" />
            ),
            tabBarActiveBackgroundColor: "#0000FF",
          }}
        />
      </Tabs>
    </>
  );
}
