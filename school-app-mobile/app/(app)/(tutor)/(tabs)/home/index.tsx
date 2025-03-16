import {
  Alert,
  Button,
  Dimensions,
  FlatList,
  Image,
  ImageBackground,
  NativeScrollEvent,
  NativeSyntheticEvent,
  Pressable,
  RefreshControl,
  RefreshControlComponent,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { StylesConstants } from "@/constants/Styles";
import { ScrollView } from "react-native";
import StudentFeedCard from "@/components/students/FeedCard";
import FeedCard from "@/components/students/FeedCard";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { ActivityIndicator, Badge, Divider } from "react-native-paper";
import NotificationCard from "@/components/notifications/NotificationCard";
import { NotificationCardInfo } from "@/models/Notification";
import { Colors } from "@/constants/Colors";
import { LinearGradient } from "expo-linear-gradient";
import Animated, {
  FadeIn,
  FadeInLeft,
  useSharedValue,
  Easing,
  withTiming,
  useAnimatedStyle,
  withSpring,
  FadeOut,
  ScrollEvent,
  FadeInDown,
  FadeInUp,
  BounceInUp,
  BounceOutUp,
  BounceIn,
  BounceInDown,
  FlipInXDown,
  FlipInEasyX,
  FlipInXUp,
  FlipInYRight,
  PinwheelIn,
  RotateInDownLeft,
  RotateInUpLeft,
  StretchInX,
  ZoomIn,
} from "react-native-reanimated";
import { Link, router, Stack } from "expo-router";
import FeedPaymentCard from "@/components/payments/FeedPaymentCard";
import * as _tutorService from "@/services/tutorService";
import { useAuth } from "@/context/AuthContext";
import { AxiosError } from "axios";
import { StudentForTutor } from "@/models/students/Student";
import { useStudentContext } from "@/context/StudentContext";
import Carousel, { Pagination } from "react-native-reanimated-carousel";
import { BlurView } from "expo-blur";

export default function index() {
  const [atTop, setAtTop] = useState<boolean>(true);
  const [atBottom, setAtBottom] = useState<boolean>(false);
  const { top } = useSafeAreaInsets();
  const MAX_VISIBLE_ITEMS = 1;

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
      Description: "Maria ha estado presentando fiebre el dia de hoy.",
      student: "Maria",
      From: "Maria Perez",
      SubmitterPosition: "Prof. de Matematicas",
      IsRead: false,
    },
    {
      Category: "Notas",
      Date: date.toLocaleDateString("es-ES"),
      Description: "Tenemos entrega de notas para el dia 5 de marzo",
      student: "Maria",
      From: "Maria Perez",
      SubmitterPosition: "Prof. de Matematicas",
      IsRead: false,
    },
    {
      Category: "Reunion",
      Date: date.toLocaleDateString("es-ES"),
      Description: "Tenemos entrega de notas para el dia 5 de marzo",
      student: "Maria",
      From: "Luisa Diaz",
      SubmitterPosition: "Directora",
      IsRead: false,
    },
    {
      Category: "Reunion",
      Date: date.toLocaleDateString("es-ES"),
      Description: "Tenemos entrega de notas para el dia 5 de marzo",
      student: "Maria",
      From: "Luisa Diaz",
      SubmitterPosition: "Directora",
      IsRead: true,
    },
  ];

  Notifications.sort((a, b) => Number(a.IsRead) - Number(b.IsRead));
  const randomWidth = useSharedValue(10);

  const config = {
    duration: 500,
    easing: Easing.bezier(0.5, 0.01, 0, 1),
  };

  const style = useAnimatedStyle(() => {
    return {
      width: withTiming(randomWidth.value, config),
    };
  });

  useEffect(() => {
    // console.log(atTop, atBottom);
  }, [atTop, atBottom]);

  const [IsShowingBanner, SetIsShowingBanner] = useState<boolean>(false);

  const { authState } = useAuth();
  const { students, getStudentForTutor, errorsList, isLoadingStudents } =
    useStudentContext();

  const refreshStudentsList = () => {
    if (authState?.user) getStudentForTutor(authState.user.id);
  };

  const reloadStudents = () => {
    if (authState?.user) {
      getStudentForTutor(authState.user?.id);
    }
  };

  const goToStudentDetails = (id: number) => {};
  const width = Dimensions.get("window").width;

  return (
    <View style={{ flex: 1, backgroundColor: "" }}>
      <Stack.Screen
        options={{
          headerShown: true,
          headerStyle: {},
          header: () => (
            <View
              style={{
                backgroundColor: Colors.blueMedium,
              }}
            >
              <View
                style={{
                  paddingTop: top + 5,
                  backgroundColor: "white",
                  borderWidth: 0,
                  borderBottomEndRadius: 20,
                  borderBottomStartRadius: 20,
                  paddingHorizontal: StylesConstants.paddingHorizontal,
                  paddingVertical: 10,
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <View style={{ flexDirection: "column" }}>
                  <Text
                    style={{
                      fontFamily: "MulishSemiBold",
                      fontSize: 19,
                    }}
                  >
                    Hola, {authState?.user?.userName}
                  </Text>
                  <Text
                    style={{
                      fontFamily: "MulishRegular",
                      fontSize: 17,
                      color: "gray",
                    }}
                  >
                    {SpanishDate[0].toUpperCase().concat(SpanishDate.slice(1))}
                  </Text>
                </View>
                <Ionicons name="menu-sharp" size={30} />
              </View>
            </View>
          ),
        }}
      />
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
      <ScrollView style={{}} showsVerticalScrollIndicator={false}>
        <View style={[styles.container, { marginBottom: 10, gap: 10 }]}>
          {/* Aviso banner */}
          {IsShowingBanner && (
            <Animated.View
              entering={FadeInUp.duration(900)}
              style={{
                backgroundColor: "white",
                borderRadius: 8,
                paddingHorizontal: 15,
                paddingTop: 10,
                paddingBottom: 17,
                marginTop: 10,
                gap: 5,
                elevation: 5,
                shadowColor: "red",
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <View
                  style={{ flexDirection: "row", alignItems: "center", gap: 5 }}
                >
                  <MaterialIcons
                    name="lightbulb"
                    color={Colors.brightOrange}
                    size={20}
                  />
                  <Text
                    style={{
                      fontFamily: "MulishBold",
                      fontSize: 17,
                      color: Colors.darkOrange,
                    }}
                  >
                    Anuncio
                  </Text>
                </View>
                <MaterialIcons
                  name="close"
                  color={Colors.brightOrange}
                  size={23}
                />
              </View>
              <Text
                style={{
                  fontFamily: "MulishRegular",
                  fontSize: 16,
                  color: "black",
                }}
              >
                Han sido publicadas las notas correspondientes al periodo
                Agosto-Diciembre 2025
              </Text>
            </Animated.View>
          )}

          {/* ----------------------------Students-section----------------------------  */}
          <View
            style={{
              flexDirection: "column",
              marginTop: IsShowingBanner ? 5 : 15,
              gap: 10,
              minHeight: 130,
            }}
          >
            <View
              style={{ flexDirection: "row", alignItems: "center", gap: 5 }}
            >
              <MaterialIcons
                name="escalator-warning"
                size={25}
                color={"white"}
              />
              <Text
                style={{
                  fontFamily: "MulishBold",
                  fontSize: 16.5,
                  color: "white",
                }}
              >
                Tus estudiantes activos
              </Text>
            </View>

            <View
              style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {!isLoadingStudents &&
                !errorsList.hasFetchListError &&
                students && (
                  <FlatList
                    data={students}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    showsVerticalScrollIndicator={false}
                    fadingEdgeLength={30}
                    refreshControl={
                      <RefreshControl
                        refreshing={false}
                        colors={[Colors.blueSky, Colors.brightOrange]}
                        progressBackgroundColor={"white"}
                        onRefresh={refreshStudentsList}
                      />
                    }
                    renderItem={({ item, index }) => {
                      return (
                        <FeedCard
                          Student={item}
                          key={index}
                          goToDetails={goToStudentDetails}
                        />
                      );
                    }}
                    ListEmptyComponent={() => (
                      <View
                        style={{
                          flex: 1,
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <Text
                          style={{
                            fontSize: 14,
                            color: "white",
                            fontFamily: "MulishSemiBold",
                          }}
                        >
                          Aun no tienes estudiantes activos!
                        </Text>
                      </View>
                    )}
                  />
                )}
              {/* -----------------------Loading-Students-Animation----------------------- */}
              {isLoadingStudents && !errorsList.hasFetchListError && (
                <Animated.View
                  entering={ZoomIn.duration(230).easing(Easing.linear)}
                  style={{
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <ActivityIndicator
                    size={30}
                    color="white"
                    style={{ margin: 10 }}
                  />
                  <Text style={{ color: "white", fontFamily: "MulishBold" }}>
                    Cargando tus estudiantes
                  </Text>
                </Animated.View>
              )}
              {/*-----------------------Fetch-Error-Msj-&-TryAgain-----------------------*/}
              {!isLoadingStudents &&
                !students &&
                errorsList.hasFetchListError && (
                  <Pressable
                    style={{
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "center",
                      gap: 5,
                    }}
                    onPress={reloadStudents}
                  >
                    <Text
                      style={{
                        fontSize: 15,
                        fontFamily: "MulishSemiBold",
                        color: "white",
                      }}
                    >
                      Hubo un error al cargar
                    </Text>
                    <View
                      style={{
                        backgroundColor: "white",
                        elevation: 5,
                        borderRadius: 20,
                        padding: 10,
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Ionicons
                        name="reload"
                        size={19}
                        color={Colors.blueMedium}
                      />
                    </View>
                  </Pressable>
                )}
            </View>
          </View>
          {/* --------------------------Notifications-Section------------------------- */}
          <View style={{ flexDirection: "column", marginTop: 7, gap: 7 }}>
            <View
              style={{
                justifyContent: "space-between",
                alignItems: "center",
                flexDirection: "row",
              }}
            >
              <View
                style={{ flexDirection: "row", alignItems: "center", gap: 5 }}
              >
                <MaterialIcons name="notifications" size={25} color={"white"} />
                <Text
                  style={{
                    fontFamily: "MulishBold",
                    fontSize: 16.5,
                    color: "white",
                  }}
                >
                  Notificaciones
                </Text>
              </View>
              <Link
                href={{
                  pathname: "/(app)/(tutor)/notificationCenter",
                }}
                asChild
              >
                <Pressable
                  style={{ flexDirection: "row", gap: 3, alignItems: "center" }}
                >
                  <View
                    style={{
                      backgroundColor: "red",
                      borderRadius: 50,
                      height: 20,
                      width: 20,
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Text style={{ color: "white", fontFamily: "MulishBold" }}>
                      {Notifications.reduce((count, notification) => {
                        return notification.IsRead == false ? count + 1 : count;
                      }, 0)}
                    </Text>
                  </View>
                  <Text
                    style={{
                      fontFamily: "MulishBold",
                      fontSize: 16,
                      color: "white",
                    }}
                  >
                    Ver mas
                  </Text>
                  <MaterialIcons
                    name="chevron-right"
                    size={25}
                    color={"white"}
                  />
                </Pressable>
              </Link>
            </View>
            <FlatList
              scrollEnabled={false}
              data={Notifications.slice(0, MAX_VISIBLE_ITEMS + 1)}
              renderItem={({ item, index }) => {
                let fadeAmount = index === MAX_VISIBLE_ITEMS ? 0.3 : 1; // Más transparente en el último
                return (
                  <NotificationCard
                    NotificationInfo={item}
                    key={index}
                    IsLastVisible={index === MAX_VISIBLE_ITEMS}
                    fadeAmount={fadeAmount}
                  />
                );
              }}
              ListFooterComponent={() => (
                <>
                  {/* {Notifications.length > 3 && (
                    <Pressable
                      onPress={() =>
                        router.push(
                          "/(tutor)/(tabs)/students/notificationCenter"
                        )
                      }
                      style={{
                        backgroundColor: "white",
                        borderRadius: 15,
                        width: 100,
                        height: 30,
                        alignItems: "center",
                        justifyContent: "center",
                        alignSelf: "center",
                        marginTop: 10,
                        marginBottom: 5,
                        elevation: 5,
                      }}
                    >
                      <Text
                        style={{
                          fontFamily: "MulishSemibold",
                          color: Colors.blueSky,
                        }}
                      >
                        Ver todas
                      </Text>
                    </Pressable>
                  )} */}
                </>
              )}
            />
          </View>

          {/* --------------------------Events-Section------------------------- */}
          <View style={{ flexDirection: "column", marginTop: 7, gap: 7 }}>
            <View
              style={{
                justifyContent: "space-between",
                alignItems: "center",
                flexDirection: "row",
              }}
            >
              <View
                style={{ flexDirection: "row", alignItems: "center", gap: 5 }}
              >
                <MaterialIcons name="event" size={25} color={"white"} />
                <Text
                  style={{
                    fontFamily: "MulishBold",
                    fontSize: 16.5,
                    color: "white",
                  }}
                >
                  Actividades recientes
                </Text>
              </View>
              <Pressable
                style={{ flexDirection: "row", gap: 2, alignItems: "center" }}
                onPress={() =>
                  router.push(
                    "/(app)/(tutor)/(tabs)/students/notificationCenter"
                  )
                }
              >
                <Text
                  style={{
                    fontFamily: "MulishBold",
                    fontSize: 16,
                    color: "white",
                  }}
                >
                  Ver mas
                </Text>
                <MaterialIcons name="chevron-right" size={25} color={"white"} />
              </Pressable>
            </View>

            <Carousel
              data={[
                {
                  link: "https://www.merakilane.com/wp-content/uploads/2023/08/First-Day-of-School-Activities-for-Kindergarten-featured.png",
                },
                {
                  link: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSG0AdMj1RZJWdclEw4PP0bfkkW9foVS4yYUA&s",
                },
              ]}
              width={width - StylesConstants.paddingHorizontal - 5}
              style={{
                alignSelf: "center",
                justifyContent: "center",
                borderRadius: 10,
                overflow: "hidden",
              }}
              height={155}
              snapEnabled
              loop={true}
              autoPlay
              autoPlayInterval={3000}
              renderItem={({ item, index }) => (
                <View style={{}}>
                  <ImageBackground
                    style={{ height: "100%", overflow: "hidden" }}
                    source={{
                      uri: item.link,
                    }}
                    resizeMode="cover"
                  >
                    <BlurView
                      intensity={25}
                      tint="systemMaterialDark"
                      experimentalBlurMethod="dimezisBlurView"
                      style={{
                        position: "absolute",
                        bottom: 0,
                        left: 0,
                        right: 0,
                        overflow: "hidden",
                        borderTopEndRadius: 10,
                        borderTopStartRadius: 10,
                      }}
                    >
                      <View
                        style={{
                          padding: 7,
                          flex: 1,
                          overflow: "hidden",
                        }}
                      >
                        <Text
                          style={{
                            fontFamily: "MulishBold",
                            color: "white",
                            fontSize: 14,
                          }}
                        >
                          12/3/25 Evento de colores
                        </Text>
                      </View>
                    </BlurView>
                  </ImageBackground>
                </View>
              )}
            />
          </View>

          {/* ----------------------------Payments-Section---------------------------- */}
          <View style={{ flexDirection: "column", marginTop: 7, gap: 7 }}>
            <View
              style={{
                justifyContent: "space-between",
                alignItems: "center",
                flexDirection: "row",
              }}
            >
              <View
                style={{ flexDirection: "row", alignItems: "center", gap: 5 }}
              >
                <MaterialIcons name="attach-money" size={25} color={"white"} />
                <Text
                  style={{
                    fontFamily: "MulishBold",
                    fontSize: 16.5,
                    color: "white",
                  }}
                >
                  Proximos pagos
                </Text>
              </View>
              <Pressable
                style={{ flexDirection: "row", gap: 2, alignItems: "center" }}
                onPress={() => router.push("/(app)/(tutor)/(tabs)/payments")}
              >
                <Text
                  style={{
                    fontFamily: "MulishBold",
                    fontSize: 16,
                    color: "white",
                  }}
                >
                  Ver mas
                </Text>
                <MaterialIcons name="chevron-right" size={25} color={"white"} />
              </Pressable>
            </View>

            <FlatList
              scrollEnabled={false}
              data={[false, true]}
              renderItem={({ item, index }) => {
                return <FeedPaymentCard IsExpired={item} key={index} />;
              }}
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: StylesConstants.paddingHorizontal - 5,
  },
  partialItem: {
    position: "relative",
    overflow: "hidden",
    height: 40,
  },
  text: {
    fontSize: 16,
  },
});
