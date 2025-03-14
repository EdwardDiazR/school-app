import { View, Text } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { router, SplashScreen, Stack } from "expo-router";
import {
  AuthContext,
  AuthContextType,
  useAuth,
  UserRoles,
} from "@/context/AuthContext";

export default function _layout() {
  const StackLayout = () => {
    const { authState } = useAuth();

    useEffect(() => {
      console.log(authState);

      if (authState?.isAuthenticated && authState.user) {
        switch (authState.user?.role) {
          case UserRoles.Teacher:
            router.replace("/(app)/(teacher)");
            return;
          case UserRoles.Tutor:
            router.replace("/(app)/(tutor)/(tabs)/home");
            return;
          case UserRoles.Admin:
            router.replace("/(app)/(admin)");
            return;
        }
      }
      SplashScreen.hideAsync();

      console.log("El state");
    }, [authState]);

    return (
      <Stack>
        <Stack.Screen name="login" options={{ headerShown: false }} />
      </Stack>
    );
  };

  return <StackLayout />;
}
