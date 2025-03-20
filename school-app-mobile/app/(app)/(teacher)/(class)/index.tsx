import { View, Text, Pressable } from "react-native";
import React from "react";
import {
  Stack,
  useGlobalSearchParams,
  useLocalSearchParams,
} from "expo-router";
import { SubjectClass } from "@/models/class/Class";
import { StylesConstants } from "@/constants/Styles";
import {
  Foundation,
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";
import { LinearGradient } from "expo-linear-gradient";
import { ScrollView } from "react-native-gesture-handler";

export default function index() {
  const { name, days } = useLocalSearchParams();
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
      <Stack.Screen options={{ headerTitle: "" }} />
      <ScrollView style={{ flex: 1 }}>
        <View
          style={{
            paddingHorizontal: StylesConstants.paddingHorizontal,
            marginTop: 10,
            gap: 10,
            flex: 1,
          }}
        >
          <View style={{ gap: 10 }}>
            {/* ----------------------------header-card-info---------------------------- */}
            <View
              style={{
                backgroundColor: "white",
                borderRadius: 10,
                elevation: 1,
                padding: 10,
              }}
            >
              <Text
                style={{
                  backgroundColor: Colors.blueAqua,
                  borderRadius: 10,
                  fontFamily: "MulishBold",
                  fontSize: 19,
                  textAlign: "center",
                  color: "white",
                  padding: 5,
                }}
              >
                {name}
              </Text>
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
                      5to - B
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
            <View
              style={{
                backgroundColor: "white",
                borderRadius: 10,
                elevation: 1,
                padding: 10,
                gap: 3,
              }}
            >
              <View
                style={{ flexDirection: "row", alignItems: "center", gap: 5 }}
              >
                <MaterialIcons name="calendar-month" size={20} />
                <Text style={{ fontFamily: "MulishBold", fontSize: 16 }}>
                  Dias de clase en este curso
                </Text>
              </View>
              <Text
                style={{
                  fontFamily: "MulishBold",
                  fontSize: 15,
                  color: Colors.blueAqua,
                }}
              >
                {days}
              </Text>
            </View>
          </View>

          <View style={{ gap: 5 }}>
            <Pressable
              style={{
                backgroundColor: "orange",
                padding: 10,
                borderRadius: 10,
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "row",
                gap: 5,
              }}
            >
              <Foundation name="clipboard-notes" size={20} color={"white"} />
              <Text
                style={{
                  fontFamily: "MulishSemiBold",
                  color: "white",
                  textAlign: "center",
                  fontSize: 15,
                }}
              >
                Pasar asistencia
              </Text>
            </Pressable>

            <Pressable
              style={{
                backgroundColor: "orange",
                padding: 10,
                borderRadius: 10,
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "row",
                gap: 5,
              }}
            >
              <MaterialIcons name="edit-note" size={20} color={"white"} />
              <Text
                style={{
                  fontFamily: "MulishSemiBold",
                  color: "white",
                  textAlign: "center",
                  fontSize: 15,
                }}
              >
                Digitalizar calificaciones
              </Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
