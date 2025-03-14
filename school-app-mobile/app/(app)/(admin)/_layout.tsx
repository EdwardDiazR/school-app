import { View, Text } from "react-native";
import React from "react";
import { Redirect, Stack } from "expo-router";
import { useAuth, UserRoles } from "@/context/AuthContext";

export default function _layout() {
  const { authState } = useAuth();

  console.log("Entering admin");

  return (
    <Stack>
      <Stack.Screen name="index" />
    </Stack>
  );
}
