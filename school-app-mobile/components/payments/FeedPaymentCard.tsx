import { View, Text, Pressable } from "react-native";
import React from "react";
import { MaterialIcons } from "@expo/vector-icons";

export default function FeedPaymentCard({ IsExpired }: { IsExpired: boolean }) {
  return (
    <Pressable
      style={{
        backgroundColor: "white",
        borderRadius: 5,
        paddingVertical: 8,
        paddingHorizontal: 10,

        elevation: 1,
        marginVertical: 5,
        gap: 3,
      }}
    >
      {IsExpired && (
        <Text
          style={{
            fontFamily: "MulishBold",
            color: "white",
            backgroundColor: "red",
            borderRadius: 6,
            width: 80,
            textAlign: "center",
            fontSize: 13,
          }}
        >
          En atraso
        </Text>
      )}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <View>
          <Text style={{ fontFamily: "MulishBold", fontSize: 14 }}>
            (Jose) Mensualidad Febrero 2025
          </Text>
          <Text
            style={{
              fontSize: 13.5,
              fontFamily: "MulishSemiBold",
            }}
          >
            Vence: 28/02/25
          </Text>
        </View>
        <Text
          style={{ fontFamily: "MulishBold", color: "green", fontSize: 14 }}
        >
          RD$ 4,200
        </Text>
      </View>
    </Pressable>
  );
}
