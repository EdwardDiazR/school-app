import { View, Text, SafeAreaView, Image, Pressable } from "react-native";
import React, { useEffect, useMemo, useState } from "react";
import {
  Link,
  router,
  Stack,
  useLocalSearchParams,
  useNavigation,
} from "expo-router";
import { Colors } from "@/constants/Colors";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { StylesConstants } from "@/constants/Styles";
import {
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { ScrollView } from "react-native-gesture-handler";
import axios from "axios";
import * as SecureStore from "expo-secure-store";
import { StudentForTutor } from "@/models/students/Student";
import { ActivityIndicator, Divider } from "react-native-paper";
import Animated, {
  BounceIn,
  BounceInDown,
  BounceInUp,
  FadeIn,
} from "react-native-reanimated";
import { StatusBar } from "expo-status-bar";

export default function StudentDetail() {
  const { id } = useLocalSearchParams();
  const [student, setStudent] = useState<StudentForTutor | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigation = useNavigation();

  const fetchStudent = (studentId: number) => {
    setIsLoading(true);
    const token = SecureStore.getItem("token");
    axios
      .get(`http://192.168.1.28:7252/api/students/${studentId}`, {
        params: { id: studentId },
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((r) => {
        console.log(r.data.data.result);
        setStudent(r.data.data.result);
      })
      .catch((e) => {
        console.log(e);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    setStudent(null);
    fetchStudent(Number.parseInt(id.toString()));
  }, [id]);

  useEffect(() => {
    console.log(navigation.getState());
  }, [navigation]);

  const profSquare = 130;
  const { top } = useSafeAreaInsets();
  const handleGoBack = () => {
    router.back();
  };
  return (
    <SafeAreaView style={{ paddingTop: top, flex: 1,backgroundColor:'white' }}>
      <StatusBar translucent />
      <Pressable
        style={{ position: "absolute", left: 10, top: 60, zIndex: 1000 }}
        onPress={handleGoBack}
      >
        <Ionicons name="chevron-back" size={35} color={"white"} />
      </Pressable>

      <ScrollView style={{}}>
        <View style={{ flex: 1,backgroundColor:'white' }}>
          {/* ---------------------------------Header--------------------------------- */}
          <View
            style={{
              height: 150,
              marginBottom: 70,
            }}
          >
            <LinearGradient
              colors={[Colors.blueMedium, "#00b4d8"]}
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
            <View
              style={{
                height: profSquare,
                width: profSquare,
                backgroundColor: "white",
                position: "absolute",
                bottom: "-40%",
                left: 15,
                borderRadius: 100,
                overflow: "hidden",
              }}
            >
              <Image
                height={profSquare}
                width={profSquare}
                resizeMode="cover"
                style={{}}
                source={{
                  uri: "https://static.vecteezy.com/system/resources/thumbnails/035/315/385/small_2x/ai-generated-young-child-with-blue-eyes-sitting-on-couch-generative-ai-photo.jpg",
                }}
              />
            </View>
          </View>

          {isLoading && (
            <Animated.View
              entering={FadeIn.duration(600)}
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                gap: 10,
              }}
            >
              <ActivityIndicator size={40} color={Colors.blueMedium} />
              <Text>Cargando...</Text>
            </Animated.View>
          )}
          {!isLoading && student && (
            <View
              style={{
                flex: 1,
                paddingHorizontal: StylesConstants.paddingHorizontal,
              }}
            >
              <View>
                <Text style={{ fontFamily: "MulishBold", fontSize: 24 }}>
                  {student?.fullName}
                </Text>
                <Text
                  style={{
                    fontFamily: "MulishRegular",
                    color: "gray",
                    fontSize: 16,
                  }}
                >
                  5to Grado
                </Text>
              </View>

              <Divider
                style={{
                  borderWidth: 0.5,
                  borderColor: "lightgray",
                  marginVertical: 3,
                }}
              />
              {/* ------------------------------Fast-Actions------------------------------ */}
              <View style={{ gap: 5, flexDirection: "column" }}>
                <Text
                  style={{
                    fontFamily: "MulishBold",
                    fontSize: 18,
                  }}
                >
                  Acciones rapidas
                </Text>

                <View style={{ flexDirection: "row", gap: 15 }}>
                  <Link
                    href={{
                      pathname: "/(app)/(tutor)/(tabs)/students/options",
                      params: { name: student.fullName, id: student.id },
                    }}
                    asChild
                  >
                    <Pressable
                      style={{
                        maxWidth: 100,
                        borderRadius: 15,
                        justifyContent: "center",
                        alignItems: "center",
                        padding: 10,
                        backgroundColor: "rgba(0, 180, 216, 0.2)",
                      }}
                    >
                      <MaterialIcons name="local-hospital" size={24} />
                      <Text
                        style={{ fontFamily: "MulishSemiBold", fontSize: 15 }}
                      >
                        Excusa medica
                      </Text>
                    </Pressable>
                  </Link>

                  <Link
                    href={{
                      pathname: "/(app)/(tutor)/(tabs)/students/options",
                      params: { name: student.fullName, id: student.id },
                    }}
                    asChild
                  >
                    <Pressable
                      style={{
                        maxWidth: 100,
                        borderRadius: 15,
                        justifyContent: "center",
                        alignItems: "center",
                        padding: 10,
                        backgroundColor: "rgba(0, 180, 216, 0.2)",
                      }}
                    >
                      <MaterialIcons name="attach-money" size={24} />
                      <Text
                        style={{ fontFamily: "MulishSemiBold", fontSize: 15 }}
                      >
                        Pagos
                      </Text>
                    </Pressable>
                  </Link>

                  <Link
                    href={{
                      pathname: "/(app)/(tutor)/(tabs)/students/options",
                      params: { name: student.fullName, id: student.id },
                    }}
                    asChild
                  >
                    <Pressable
                      style={{
                        maxWidth: 100,
                        borderRadius: 15,
                        justifyContent: "center",
                        alignItems: "center",
                        padding: 10,
                        backgroundColor: "rgba(0, 180, 216, 0.2)",
                      }}
                    >
                      <MaterialIcons name="dashboard-customize" size={23} />
                      <Text
                        style={{ fontFamily: "MulishSemiBold", fontSize: 15 }}
                      >
                        Ver todas
                      </Text>
                    </Pressable>
                  </Link>
                </View>
              </View>
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
