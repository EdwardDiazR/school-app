import { View, Text } from "react-native";
import React, { useContext, useEffect } from "react";
import { Redirect, router, Stack } from "expo-router";
import { useAuth, UserRoles } from "@/context/AuthContext";

export default function _layout() {
  useEffect(() => {}, []);
  const { authState } = useAuth();
  console.log("Entering teacher");
  
 
  return (
    <Stack>
      <Stack.Screen name="index" />
    </Stack>
  );
}
