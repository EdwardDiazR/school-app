import { View, Text } from "react-native";
import React from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { NotificationCardInfo } from "@/models/Notification";
import { StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Animated, { BounceIn, BounceInDown } from "react-native-reanimated";

export default function NotificationCard({
  NotificationInfo,
  IsLastVisible,
  fadeAmount,
}: {
  NotificationInfo: NotificationCardInfo;
  IsLastVisible: boolean;
  fadeAmount: number;
}) {
  const date = new Date();
  const SpanishDate = new Intl.DateTimeFormat("es-ES", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(date);

  const CategoryColors: Record<string, string> = {
    Salud: "red",
    Reunion: "green",
    Notas: "blue",
  };
  return (
    <Animated.View
      style={[
        IsLastVisible ? styles.partialItem : styles.item,
        {
          opacity: NotificationInfo.IsRead ? 0.6 : 1,
        },
      ]}
    >
      {IsLastVisible && (
        <LinearGradient
          colors={["white", "gray"]}
          style={[styles.gradient]}
          start={{ x: 0.5, y: 0.0 }}
        />
      )}
      <View style={{ padding: 10 }}>
        <View style={{}}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <View style={{ flexDirection: "row", gap: 5 }}>
              <Text style={{ fontFamily: "MulishBold", fontSize: 14 }}>
                {NotificationInfo.student}
              </Text>
              <Text>|</Text>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 5,
                }}
              >
                <MaterialIcons
                  name="circle"
                  size={9}
                  color={CategoryColors[NotificationInfo.Category]}
                />
                <Text style={{ fontSize: 14, fontFamily: "MulishRegular" }}>
                  {NotificationInfo.Category}
                </Text>
              </View>
            </View>
            <Text
              style={{
                fontSize: 14,
                fontFamily: "MulishRegular",
                color: "gray",
              }}
            >
              {date.toLocaleDateString("es-ES")}
            </Text>
          </View>
          <Text
            style={{ fontFamily: "MulishRegular", color: "gray", fontSize: 13 }}
          >
            De: {NotificationInfo.From} | {NotificationInfo.SubmitterPosition}{" "}
          </Text>
        </View>
        <Text style={{ fontSize: 13.5 }}>{NotificationInfo.Description}</Text>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  item: {
    backgroundColor: "white",
    borderRadius: 10,
    gap: 5,
    marginVertical: 5,
    elevation: 1,
  },
  partialItem: {
    position: "relative",
    overflow: "hidden",
    height: 25,
    borderTopEndRadius: 6,
    borderTopStartRadius: 6,
    borderBottomEndRadius: 3,
    borderBottomStartRadius: 3,
    opacity: 0,
    elevation: 0,
  },

  gradient: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    height: 30,
  },
});
