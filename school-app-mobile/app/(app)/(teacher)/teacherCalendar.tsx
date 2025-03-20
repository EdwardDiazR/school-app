import { View, Text, SafeAreaView } from "react-native";
import React from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";

export default function teacherCalendar() {
  const { top } = useSafeAreaInsets();
  return (
    <View style={{ paddingTop: top }}>
      <MaterialIcons
        name="close"
        size={30}
        color={'red'}
        style={{ position: "absolute", top: 50, right: 10 }}
        onPress={() => {
          router.back();
        }}
      />
      <Text>Calendario</Text>
    </View>
  );
}
