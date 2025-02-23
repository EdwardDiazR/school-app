import { View, Text, Pressable } from "react-native";
import React from "react";
import { MaterialIcons } from "@expo/vector-icons";

export default function FeedPaymentCard() {
  return (
    <Pressable>
      <View
        style={{
          backgroundColor: "white",
          borderRadius: 5,
          paddingVertical: 8,
          paddingHorizontal: 10,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          elevation: 1,
        }}
      >
        <View>
          <Text style={{ fontFamily: "MulishBold", fontSize: 15 }}>
            (Jose) Mensualidad Febrero 2025
          </Text>
          <Text
            style={{
              fontSize: 14,
              fontFamily: "MulishSemiBold",
            }}
          >
            Vence: 28/02/25
          </Text>
        </View>
        <Text
          style={{ fontFamily: "MulishSemiBold", color: "green", fontSize: 14 }}
        >
          RD$ 4,200
        </Text>
      </View>
    </Pressable>
  );
}
