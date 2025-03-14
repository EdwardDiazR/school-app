import { View, Text } from "react-native";
import React, { useContext } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { AuthContext, AuthContextType } from "@/context/AuthContext";

export default function index() {
  const { top } = useSafeAreaInsets();
  const { authState } = useContext(AuthContext) as AuthContextType;
  return (
    <View style={{ paddingTop: top }}>
      <Text>Teacher</Text>
      <Text>{authState?.user?.userName}</Text>
    </View>
  );
}
