import { View, Text } from "react-native";
import React from "react";
import { Tabs } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";

export default function _layout() {
  return (
    <Tabs
      initialRouteName="home"
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          height: 60,
          position: "absolute",
          borderRadius: 15,
          borderTopWidth: 0,
          bottom: 10,
          left: 20,
          right: 20,
          marginHorizontal: 10,
          zIndex: 1000,
        },

        tabBarLabelStyle: {
          fontSize: 13,
          fontFamily: "MulishRegular",
          borderRadius: 10,
        },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Inicio",
          tabBarIcon: () => <MaterialIcons name="home" size={30} />,
        }}
      />
      <Tabs.Screen
        name="students"
        options={{
          title: "Estudiantes",
          tabBarIcon: ({ focused }) => (
            <MaterialIcons name="escalator-warning" size={30} />
          ),
        }}
      />
      <Tabs.Screen
        name="payments"
        options={{
          title: "Pagos",
          tabBarIcon: () => <MaterialIcons name="home" size={30} />,
        }}
      />
      <Tabs.Screen
        name="account"
        options={{
          title: "Mi cuenta",
          tabBarIcon: () => <MaterialIcons name="account-circle" size={30} />,
        }}
      />
    </Tabs>
  );
}
