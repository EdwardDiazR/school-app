import { View, Text, Platform } from "react-native";
import React from "react";
import { Stack } from "expo-router";

export default function _layout() {
  return (
    <Stack
      screenOptions={{
        animation: "none",
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          headerShown: true,
          title: "Mis estudiantes",
          headerTitleStyle: { fontFamily: "MulishBold" },
        }}
      />
      <Stack.Screen
        name="options"
        options={{
          headerShown: true,
          title: "Mas opciones",
          headerTitleStyle: { fontFamily: "MulishBold" },
        }}
      />
      <Stack.Screen
        name="notificationCenter"
        options={{
          headerShown: true,
          title: "Centro de notificaciones ",
          headerTitleStyle: { fontFamily: "MulishBold" },
        }}
      />
    </Stack>
  );
}
