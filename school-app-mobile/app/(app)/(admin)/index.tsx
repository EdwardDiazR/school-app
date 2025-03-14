import { View, Text } from "react-native";
import React from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Button } from "react-native-paper";
import { router } from "expo-router";

export default function index() {
  const { top } = useSafeAreaInsets();
  return (
    <View style={{ paddingTop: top }}>
      <Text>Admin</Text>
      <Button onPress={() => router.push("/auth/login")} children={undefined} />
    </View>
  );
}
