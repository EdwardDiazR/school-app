import { View, Text } from "react-native";
import React, { useContext, useEffect, useMemo, useState } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { AuthContext, AuthContextType } from "@/context/AuthContext";
import { Pressable, ScrollView } from "react-native-gesture-handler";
import { StylesConstants } from "@/constants/Styles";
import { Href, Link, Stack } from "expo-router";
import { Colors } from "@/constants/Colors";
import { LinearGradient } from "expo-linear-gradient";
import Animated, { LinearTransition } from "react-native-reanimated";
import { SubjectClass } from "@/models/class/Class";
import {
  addDays,
  addHours,
  addMinutes,
  closestTo,
  formatDistance,
  formatDistanceToNow,
  isFuture,
  isPast,
} from "date-fns";
import { es } from "date-fns/locale";

import {
  EvilIcons,
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import { Divider } from "react-native-paper";
import { TodayClassCard } from "@/components/teacher/todayClassCard";

export default function index() {
  const { top } = useSafeAreaInsets();
  const { authState } = useContext(AuthContext) as AuthContextType;

  const getGreetingByTime = () => {
    const date = new Date();
    const hour = date.getHours();
    if (hour >= 0 && hour <= 11) {
      return "Buenos dias";
    }
    if (hour >= 12 && hour <= 18) {
      return "Buenas tardes";
    }
    if (hour >= 19) {
      return "Buenas noches";
    } else {
      return "Hola";
    }
  };

  const date = new Date();
  const SpanishDate = new Intl.DateTimeFormat("es-ES", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(date);

  const d = new Date().setHours(9, 45);
  const list: SubjectClass[] = [
    {
      name: "Biologia",
      grade: "3ro A",

      days: ["Monday", "Tuesday"],
      startDate: addHours(new Date(), 3),
      endDate: addHours(new Date(), 4),
    },
    {
      name: "Matematicas",
      grade: "5to B",

      days: ["Monday", "Tuesday"],
      startDate: addHours(new Date(), -1),
      endDate: addHours(new Date(), -0.5),
    },
  ];

  const classDetail = {
    name: "Math",
  };

  return (
    <View style={{ flex: 1 }}>
      <LinearGradient
        colors={["#00b4d8", "#00b4d8", Colors.blueMedium]}
        start={{ x: 1.6, y: 1.8 }}
        end={{ x: 0.1, y: 0.01 }}
        dither
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: 0,
          height: "100%",
        }}
      />

      <Stack.Screen
        options={{
          headerShown: true,
          header: () => (
            <View
              style={{
                backgroundColor: "white",
                paddingHorizontal: StylesConstants.paddingHorizontal,
                flexDirection: "row",
                alignItems: "center",
                paddingTop: top + 5,
                paddingBottom: 12,
                gap: 20,
              }}
            >
              <MaterialIcons name="menu" size={28} />
              <View>
                <Text
                  style={{
                    fontFamily: "MulishBold",
                    fontSize: 18,
                    color: "black",
                  }}
                >
                  {getGreetingByTime()}, {authState?.user?.userName}
                </Text>
                <Text
                  style={{
                    fontFamily: "MulishSemiBold",
                    fontSize: 17,
                    color: "black",
                  }}
                >
                  {SpanishDate[0].toUpperCase().concat(SpanishDate.slice(1))}
                </Text>
              </View>
            </View>
          ),
        }}
      />
      <ScrollView
        style={{
          paddingHorizontal: StylesConstants.paddingHorizontal,
          paddingTop: 10,
        }}
      >
        <View style={{ flex: 1, gap: 10 }}>
          {/*-----------------------------Today's-classes----------------------------*/}
          <View style={{ backgroundColor: "transparent", gap: 5 }}>
            <View
              style={{
                justifyContent: "space-between",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  fontFamily: "MulishBold",
                  fontSize: 17,
                  color: "white",
                }}
              >
                Tus clases de hoy
              </Text>
              <Link href={"/(app)/(teacher)/teacherCalendar"} asChild>
                <Pressable
                  style={{ flexDirection: "row", alignItems: "center", gap: 3 }}
                >
                  <MaterialIcons name="calendar-month" color={"white"} />
                  <Text style={{ fontFamily: "MulishBold", color: "white" }}>
                    Ver calendario
                  </Text>
                </Pressable>
              </Link>
            </View>
            <Animated.FlatList
              data={list}
              style={{}}
              nestedScrollEnabled={true}
              itemLayoutAnimation={LinearTransition}
              renderItem={({ item, index }) => (
                <TodayClassCard classInfo={item} key={index} />
              )}
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
