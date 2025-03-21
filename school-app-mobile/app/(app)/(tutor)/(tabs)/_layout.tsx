import { View, Text } from "react-native";
import React, { useEffect } from "react";
import { router, Tabs } from "expo-router";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";
import { BlurView } from "expo-blur";

export default function _layout() {
  const TAB_ACTIVE_COLOR = "white";

  const TAB_UNACTIVE_COLOR = "lightgray";

  // 21b0fe blue

  const EXPIRED_PAYMENTS = 1;
  useEffect(() => {}, []);
  return (
    <Tabs
      initialRouteName="home"
      screenOptions={{
        animation: "none",
        headerShown: false,
        tabBarItemStyle: { marginTop: 5 },
        tabBarStyle: {
          height: 65,
          elevation: 1,
          borderWidth: 0,
          borderColor: "transparent",
          backgroundColor: Colors.blueMedium,
        },

        tabBarBackground() {
          return (
            <BlurView
              intensity={0}
              tint="systemUltraThinMaterialDark"
              style={{
                flex: 1,
                overflow: "hidden",
              }}
              experimentalBlurMethod="dimezisBlurView"
            />
          );
        },

        tabBarLabelStyle: {
          fontFamily: "MulishBold",
          fontSize: 13.5,
        },
        tabBarActiveTintColor: "white",
        tabBarInactiveTintColor: "lightgray",
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Inicio",
          tabBarLabel: "Inicio",

          tabBarIcon: ({ focused, size }) => (
            <MaterialCommunityIcons
              name={focused ? "home-variant" : "home-variant-outline"}
              size={size}
              color={focused ? TAB_ACTIVE_COLOR : TAB_UNACTIVE_COLOR}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="students"
        options={{
          title: "Estudiantes",
          tabBarLabel: "Estudiantes",

          tabBarIcon: ({ focused, size }) => (
            <MaterialIcons
              name="escalator-warning"
              size={size}
              color={focused ? TAB_ACTIVE_COLOR : TAB_UNACTIVE_COLOR}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="payments"
        options={{
          title: "Pagos",
          tabBarLabel: "Pagos",
          tabBarBadgeStyle: {
            display: EXPIRED_PAYMENTS ? "flex" : "none",
            margin: -0.5,
            fontFamily: "MulishBold",
            height: 17,
            width: 17,
            textAlign: "center",
            alignItems: "center",
            justifyContent: "center",
          },
          tabBarBadge: EXPIRED_PAYMENTS,

          tabBarIcon: ({ focused, size }) => (
            <MaterialIcons
              name="paid"
              size={size}
              color={focused ? TAB_ACTIVE_COLOR : TAB_UNACTIVE_COLOR}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="account"
        options={{
          title: "Mi cuenta",
          tabBarIcon: ({ focused, size }) => (
            <MaterialIcons
              name="account-circle"
              size={size}
              color={focused ? TAB_ACTIVE_COLOR : TAB_UNACTIVE_COLOR}
            />
          ),
        }}
      />
    </Tabs>
  );
}
