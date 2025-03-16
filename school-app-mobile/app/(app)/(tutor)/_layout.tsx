import { View, Text } from "react-native";
import React from "react";
import { Stack } from "expo-router";

export default function _layout() {
  console.log("entering tutor");

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen
        name="studentDetails"
        options={{
          headerShown: false,
          animation: "none",
          animationDuration: 700,
        }}
      />
      <Stack.Screen
        name="notificationCenter"
        options={{
          headerShown: true,
          title: "Centro de notificaciones ",
          headerTitleStyle: { fontFamily: "MulishBold" },
          animation: "none",
          animationDuration: 700
        }}
      />
    </Stack>
  );
}
