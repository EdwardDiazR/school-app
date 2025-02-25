import { View, Text, Pressable } from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Colors } from "@/constants/Colors";
import { StudentCard } from "@/components/students/StudentCard";

import { Chip, Portal } from "react-native-paper";
import { StylesConstants } from "@/constants/Styles";
import { ScrollView } from "react-native-gesture-handler";
import { router } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";

export default function index() {
  const { top } = useSafeAreaInsets();

  return (
    <View style={{ flex: 1, paddingHorizontal: 5 }}>
      <LinearGradient
        colors={[Colors.blueMedium, Colors.blueSky, Colors.blueMedium]}
        start={{ x: 0.05, y: 0.9 }}
        end={{ x: 1.4, y: 0.01 }}
        dither
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: 0,
          height: "100%",
        }}
      />

      <ScrollView
        horizontal
        style={{ maxHeight: 40, marginTop: 7 }}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
      >
        <View style={{ flexDirection: "row", gap: 10 }}>
          <Pressable
            onPress={() => {
              router.push("/(tabs)/students/notificationCenter");
            }}
            style={{
              backgroundColor: Colors.brightOrange,
              padding: 5,
              borderRadius: 8,
              elevation: 2,
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "row",
              gap: 3,
            }}
          >
            <MaterialIcons name="notifications" size={25} color={"white"} />

            <Text style={{ color: "white", fontFamily: "MulishBold" }}>
              Ir al centro de notificaciones
            </Text>
          </Pressable>
        </View>
      </ScrollView>

      <View
        style={{
          flex: 1,
          paddingHorizontal: StylesConstants.paddingHorizontal - 5,
        }}
      >
        <StudentCard StudentName={"Juan Diaz"} />
        <StudentCard StudentName={"Zara Ramos"} />
      </View>
    </View>
  );
}
