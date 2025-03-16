import { View, Text, GestureResponderEvent, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { Colors } from "@/constants/Colors";
import { Chip } from "react-native-paper";
import { Link } from "expo-router";
import NotificationCard from "@/components/notifications/NotificationCard";
import { NotificationCardInfo } from "@/models/Notification";
import { StylesConstants } from "@/constants/Styles";

export default function notificationCenter() {
  const [filterMode, SetFilterMode] = useState<"all" | "read" | "unread">(
    "all"
  );
  useEffect(()=>{console.log("En notifica");
  },[])
  const date = new Date();
  const SpanishDate = new Intl.DateTimeFormat("es-ES", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(date);
  const Notifications: NotificationCardInfo[] = [
    {
      Category: "Salud",
      Date: date.toLocaleDateString("es-ES"),
      Description: "El niño Alan ha estado presentando fiebre el dia de hoy",
      student: "Alan Ramos",
      From: "Maria Perez",
      SubmitterPosition: "Prof. de Matematicas",
      IsRead: false,
    },
    {
      Category: "Notas",
      Date: date.toLocaleDateString("es-ES"),
      Description: "Tenemos entrega de notas para el dia 5 de marzo",
      student: "Alan Ramos",
      From: "Maria Perez",
      SubmitterPosition: "Prof. de Matematicas",
      IsRead: true,
    },
    {
      Category: "Reunion",
      Date: date.toLocaleDateString("es-ES"),
      Description: "Tenemos entrega de notas para el dia 5 de marzo",
      student: "Alan Ramos",
      From: "Luisa Diaz",
      SubmitterPosition: "Directora",
      IsRead: true,
    },
    {
      Category: "Reunion",
      Date: date.toLocaleDateString("es-ES"),
      Description: "Tenemos entrega de notas para el dia 5 de marzo",
      student: "Alan Ramos",
      From: "Luisa Diaz",
      SubmitterPosition: "Directora",
      IsRead: false,
    },
  ];
  return (
    <View style={{ flex: 1, backgroundColor: "red", gap: 10 }}>
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
      <View
        style={{
          flexDirection: "row",
          gap: 10,
          justifyContent: "space-between",
          padding: 5,
          marginTop: 10,
        }}
      >
        <Chip
          mode="outlined"
          selected={filterMode == "all"}
          selectedColor="white"
          disabled={filterMode == "all"}
          rippleColor={"white"}
          onPress={(e: GestureResponderEvent) => SetFilterMode("all")}
          compact
          theme={{
            roundness: 10,
          }}
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor:
              filterMode == "all" ? Colors.brightOrange : "white",
            borderWidth: 0,
          }}
          textStyle={{
            fontFamily: "MulishSemiBold",
            color: filterMode == "all" ? "white" : Colors.brightOrange,
            fontSize: 16,
          }}
        >
          <Text>Todas</Text>
        </Chip>
        <Chip
          mode="outlined"
          selected={filterMode == "read"}
          selectedColor="white"
          disabled={filterMode == "read"}
          rippleColor={"white"}
          onPress={(e: GestureResponderEvent) => SetFilterMode("read")}
          compact
          theme={{
            roundness: 10,
          }}
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor:
              filterMode == "read" ? Colors.brightOrange : "white",
            borderWidth: 0,
          }}
          textStyle={{
            fontFamily: "MulishSemiBold",
            color: filterMode == "read" ? "white" : Colors.brightOrange,
            fontSize: 16,
          }}
        >
          Leidas
        </Chip>
        <Chip
          mode="outlined"
          selected={filterMode == "unread"}
          selectedColor="white"
          disabled={filterMode == "unread"}
          rippleColor={"white"}
          onPress={(e: GestureResponderEvent) => SetFilterMode("unread")}
          compact
          theme={{
            roundness: 10,
            colors: { accent: "white" },
          }}
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor:
              filterMode == "unread" ? Colors.brightOrange : "white",
            borderWidth: 0,
          }}
          textStyle={{
            fontFamily: "MulishSemiBold",
            color: filterMode == "unread" ? "white" : Colors.brightOrange,
            fontSize: 16,
            textAlign: "center",
            justifyContent: "center",
          }}
        >
          Sin leer
        </Chip>
      </View>
      <View
        style={{
          paddingHorizontal: StylesConstants.paddingHorizontal - 5,
          flex: 1,
        }}
      >
        <FlatList
          style={{ flex: 1 }}
          data={Notifications}
          renderItem={({ item, index }) => {
            return (
              <NotificationCard
                NotificationInfo={item}
                key={index}
                IsLastVisible={false}
                fadeAmount={1}
              />
            );
          }}
          ListFooterComponent={() => <></>}
        />
      </View>
    </View>
  );
}
