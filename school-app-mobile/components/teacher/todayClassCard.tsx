import { View, Text, Pressable } from "react-native";
import React, { useEffect, useState } from "react";
import { SubjectClass } from "@/models/class/Class";
import { addHours, format, formatDistance, isFuture, isPast } from "date-fns";
import { es } from "date-fns/locale";
import { Link } from "expo-router";
import { Colors } from "@/constants/Colors";
import {
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import { Divider } from "react-native-paper";

export const TodayClassCard = ({ classInfo }: { classInfo: SubjectClass }) => {
  const [remainingTime, setRemainingTime] = useState<string>("");
  const [status, setStatus] = useState<
    "Waiting" | "Finished" | "InProgress" | null
  >(null);

  let count = 0;

  useEffect(() => {
    getRemainingTime();

    let intervalDuration = 5000; //5 Seconds
    const interval = setInterval(getRemainingTime, intervalDuration);

    if (status == "InProgress") {
      //Update interval to 10 Minutes
      intervalDuration = 10 * 60; //Mins por 60 secs
      return;
    }
    if (status == "Waiting") {
    }

    if (status == "Finished") {
      clearInterval(interval);
      return;
    }

    return () => clearInterval(interval);
  }, [remainingTime]);

  const getRemainingTime = () => {
    console.log("calling", classInfo.name);
    count += 1;
    console.log(count);

    const actualTime = new Date();
    const classStartTime = classInfo.startDate;
    const classEndTime = classInfo.endDate;

    const string = formatDistance(classStartTime, actualTime, {
      addSuffix: true,
      includeSeconds: false,
      locale: es,
    });

    if (isPast(classStartTime) && isPast(classEndTime)) {
      setRemainingTime("Finalizada");
      setStatus("Finished");
      return;
    }
    if (isPast(classStartTime) && isFuture(classEndTime)) {
      setRemainingTime("En curso");
      setStatus("InProgress");
      return;
    }
    if (isFuture(classStartTime) && isFuture(classEndTime)) {
      setRemainingTime(string);
      setStatus("Waiting");
    }
  };
  return (
    <View
      style={{
        backgroundColor: "white",
        opacity: status == "Finished" ? 0.75 : 1,
        borderRadius: 13,
        paddingHorizontal: 15,
        paddingVertical: 10,
        gap: 10,
        marginVertical: 5,
      }}
    >
      <View style={{ gap: 10 }}>
        <View
          style={{
            justifyContent: "space-between",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <View
            style={{
              backgroundColor: Colors.darkOrange,
              paddingVertical: 3,
              paddingHorizontal: 5,
              borderRadius: 10,
            }}
          >
            <Text
              style={{
                fontFamily: "MulishBold",
                fontSize: 15,
                textAlign: "left",
                flexWrap: "wrap",
                color: "white",
              }}
            >
              {classInfo.name}
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "flex-end",
              gap: 3,
              height: "100%",
              alignItems: "center",
            }}
          >
            <MaterialIcons name="schedule" size={16} />
            <Text style={{ fontFamily: "MulishBold", fontSize: 14 }}>
              {remainingTime}
            </Text>
          </View>
        </View>
        <Divider style={{ borderWidth: 0.4, borderColor: "lightgray" }} />
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-around",
            gap: 10,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              paddingVertical: 5,
              paddingHorizontal: 10,
              borderRadius: 10,
              gap: 5,
              minWidth: 100,
            }}
          >
            <MaterialIcons name="schedule" size={22} />
            <View>
              <Text
                style={{
                  fontFamily: "MulishBold",
                  fontSize: 14,
                  textAlign: "center",
                  color: "black",
                }}
              >
                {format(classInfo.startDate, "p")}
              </Text>

              <Text
                style={{
                  fontFamily: "MulishBold",
                  fontSize: 14,
                  textAlign: "center",
                  color: "black",
                }}
              >
                {format(classInfo.endDate, "p")}
              </Text>
            </View>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",

              paddingVertical: 5,
              paddingHorizontal: 10,
              borderRadius: 10,
              gap: 5,
            }}
          >
            <MaterialCommunityIcons name="school-outline" size={22} />
            <View>
              <Text
                style={{
                  fontFamily: "MulishBold",
                  fontSize: 14,
                  textAlign: "center",
                  color: "black",
                }}
              >
                Curso
              </Text>
              <Text
                style={{
                  fontFamily: "MulishBold",
                  fontSize: 14,
                  textAlign: "center",
                  color: "black",
                }}
              >
                {classInfo.grade}
              </Text>
            </View>
          </View>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              paddingVertical: 5,
              paddingHorizontal: 10,
              borderRadius: 10,
              gap: 5,
            }}
          >
            <Ionicons name="location-outline" size={23} />
            <View>
              <Text
                style={{
                  fontFamily: "MulishBold",
                  fontSize: 14,
                  textAlign: "center",
                  color: "black",
                }}
              >
                Aula
              </Text>
              <Text
                style={{
                  fontFamily: "MulishBold",
                  fontSize: 14,
                  textAlign: "center",
                  color: "black",
                }}
              >
                A-5
              </Text>
            </View>
          </View>
        </View>
      </View>
      <Link
        href={{
          pathname: "/(app)/(teacher)/(class)",
          params: { name: classInfo.name, days: classInfo.days },
        }}
        asChild
      >
        <Pressable
          style={{
            padding: 7,
            backgroundColor: Colors.blueSky,
            borderRadius: 5,
          }}
        >
          <Text
            style={{
              color: "white",
              fontFamily: "MulishBold",
              textAlign: "center",
            }}
          >
            Entrar
          </Text>
        </Pressable>
      </Link>
    </View>
  );
};
