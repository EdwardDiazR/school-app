import { View, Text, Pressable } from "react-native";
import React from "react";
import {
  Stack,
  useGlobalSearchParams,
  useLocalSearchParams,
} from "expo-router";
import { SubjectClass } from "@/models/class/Class";
import { StylesConstants } from "@/constants/Styles";

export default function index() {
  const { name, days } = useLocalSearchParams();
  return (
    <View style={{ paddingHorizontal: StylesConstants.paddingHorizontal }}>
      <Stack.Screen options={{ headerTitle: "" }} />
      <Text>{name ? name : "Vacio"}</Text>
      <Text>{days ? days : "Vacio"}</Text>

      <Pressable
        style={{ backgroundColor: "orange", padding: 5, borderRadius: 10 }}
      >
        <Text
          style={{
            fontFamily: "MulishSemiBold",
            color: "white",
            textAlign: "center",
          }}
        >
          Pasar asistencia
        </Text>
      </Pressable>

      <Pressable
        style={{ backgroundColor: "orange", padding: 5, borderRadius: 10 }}
      >
        <Text
          style={{
            fontFamily: "MulishSemiBold",
            color: "white",
            textAlign: "center",
          }}
        >
          Digitalizar calificaciones
        </Text>
      </Pressable>
    </View>
  );
}
