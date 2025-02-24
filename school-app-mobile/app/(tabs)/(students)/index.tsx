import { View, Text, Pressable } from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Colors } from "@/constants/Colors";
import { StudentCard } from "@/components/students/StudentCard";

import { Portal } from "react-native-paper";

export default function index() {
  const { top } = useSafeAreaInsets();

  return (
    <View style={{ flex: 1 }}>
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

      <StudentCard StudentName={"Juan Diaz"} />
      <StudentCard StudentName={"Zara Ramos"} />
    </View>
  );
}
