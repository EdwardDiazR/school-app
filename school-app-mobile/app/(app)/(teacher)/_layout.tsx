import { View, Text } from "react-native";
import React, { useContext, useEffect } from "react";
import { Redirect, router, Stack } from "expo-router";
import { useAuth, UserRoles } from "@/context/AuthContext";

export default function _layout() {
  const { authState } = useAuth();
  console.log("Entering teacher");

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="(class)" />
      <Stack.Screen
        name="teacherCalendar"
        options={{
          presentation: "modal",
          animation: "slide_from_bottom",
          animationDuration: 100,
        }}
      />
    </Stack>
  );
}
