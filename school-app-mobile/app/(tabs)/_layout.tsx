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
        tabBarStyle: { padding: 10, height: 60 },
        tabBarLabelStyle: { fontSize: 13, fontFamily: "MulishRegular" },
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
          tabBarIcon: () => (
            <MaterialIcons name="escalator-warning" size={30} />
          ),
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
