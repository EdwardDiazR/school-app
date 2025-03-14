import { View, Text } from "react-native";
import React from "react";
import { Redirect, Stack } from "expo-router";
import { useAuth, UserRoles } from "@/context/AuthContext";

export default function _layout() {
  const StackLayout = () => {
    const { authState } = useAuth();

    return (
      <Stack screenOptions={{ headerShown: false }}>
        {authState?.user?.role == UserRoles.Tutor && (
          <Stack.Screen name="(tutor)" options={{ headerShown: false }} />
        )}

        {authState?.user?.role == UserRoles.Teacher && (
          <Stack.Screen name="(teacher)" options={{ headerShown: false }} />
        )}
        {authState?.user?.role == UserRoles.Admin && (
          <Stack.Screen name="(admin)" options={{ headerShown: false }} />
        )}
      </Stack>
    );
  };

  return <StackLayout />;
}
