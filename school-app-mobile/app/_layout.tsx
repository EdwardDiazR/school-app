import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Href, Redirect, router, Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useContext, useEffect } from "react";
import { useColorScheme } from "@/hooks/useColorScheme";
import React from "react";
import "react-native-reanimated";
import { Gesture, GestureHandlerRootView } from "react-native-gesture-handler";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { BottomSheetProvider } from "@gorhom/bottom-sheet/lib/typescript/contexts";
import {
  AuthContext,
  AuthContextType,
  AuthProvider,
  useAuth,
  UserRoles,
} from "@/context/AuthContext";
import { StudentProvider } from "@/context/StudentContext";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    MulishRegular: require("../assets/fonts/Mulish-Regular.ttf"),
    MulishBold: require("../assets/fonts/Mulish-Bold.ttf"),
    MulishSemiBold: require("../assets/fonts/Mulish-SemiBold.ttf"),
  });

  useEffect(() => {
    if (loaded) {
       SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <AuthProvider>
      <StudentProvider>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <ThemeProvider
            value={colorScheme === "light" ? DarkTheme : DefaultTheme}
          >
            <Stack screenOptions={{ headerShown: false }}>
              <Stack.Screen name="index" options={{ headerShown: false }} />
              <Stack.Screen name="auth" options={{ headerShown: false }} />
              <Stack.Screen name="(app)" options={{ headerShown: false }} />
            </Stack>
            <StatusBar style="auto" />
          </ThemeProvider>
        </GestureHandlerRootView>
      </StudentProvider>
    </AuthProvider>
  );
}
