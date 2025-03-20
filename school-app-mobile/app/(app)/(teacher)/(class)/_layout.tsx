import { View, Text } from "react-native";
import React, { useEffect } from "react";
import { Stack } from "expo-router";

export default function _layout() {
  useEffect(() => {
    console.log("class");
    
  }, []);
  return (
    <Stack>
      <Stack.Screen name="index" />
    </Stack>
  );
}
