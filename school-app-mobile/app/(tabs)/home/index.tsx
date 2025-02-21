import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { StylesConstants } from "@/constants/Styles";
import { ScrollView } from "react-native";
import StudentFeedCard from "@/components/students/FeedCard";
import FeedCard from "@/components/students/FeedCard";
import { MaterialIcons } from "@expo/vector-icons";
import { Divider } from "react-native-paper";
import NotificationCard from "@/components/notifications/NotificationCard";
import { NotificationCardInfo } from "@/models/Notification";
import { Colors } from "@/constants/Colors";
import { LinearGradient } from "expo-linear-gradient";
import Animated, {
  FadeIn,
  FadeInLeft,
  useSharedValue,
} from "react-native-reanimated";
export default function index() {
  const { top } = useSafeAreaInsets();
  const MAX_VISIBLE_ITEMS = 3;

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

  Notifications.sort((a, b) => Number(a.IsRead) - Number(b.IsRead));

  const opacity = useSharedValue(0);
  const handleOpacity = () => {
    opacity.value += 1;
  };

  return (
    <View style={{ flex: 1, backgroundColor: Colors.blueSky }}>
      <ScrollView>
        <View
          style={[
            styles.container,
            {
              paddingTop: top + 10,
              paddingHorizontal: StylesConstants.paddingHorizontal,
            },
          ]}
        >
          <Animated.View
            style={{
              backgroundColor: "white",
              borderTopEndRadius: 10,
              borderTopStartRadius: 10,
              borderBottomEndRadius: 5,
              borderBottomStartRadius: 5,
              padding: 10,
              elevation: 10,
              opacity: opacity
            }}
          >
            <Text
              style={{
                fontFamily: "MulishSemiBold",
                fontSize: 19,
              }}
            >
              Hola July,
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
          </Animated.View>
          <View style={{ flexDirection: "column", marginTop: 10, gap: 5 }}>
            <Text
              style={{
                fontFamily: "MulishSemiBold",
                fontSize: 16,
                color: "white",
              }}
            >
              Tus estudiantes activos
            </Text>
            <FeedCard />
          </View>

          <View style={{ flexDirection: "column", marginTop: 10, gap: 5 }}>
            <Text
              style={{
                fontFamily: "MulishSemiBold",
                fontSize: 16,
                color: "white",
              }}
            >
              Notificaciones
            </Text>
            <Animated.View entering={FadeInLeft.duration(2000)}>
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
                    {Notifications.length > 3 && (
                      <Pressable
                        style={{
                          backgroundColor: "transparent",
                          padding: 5,
                          borderRadius: 10,
                        }}
                      >
                        <Text
                          style={{
                            fontFamily: "MulishSemibold",
                            color: Colors.blueSky,
                            textAlign: "center",
                          }}
                        >
                          Ver todas
                        </Text>
                      </Pressable>
                    )}
                  </>
                )}
              />
            </Animated.View>
          </View>

          <View style={{ flexDirection: "column", marginTop: 10, gap: 5 }}>
            <Text
              style={{
                fontFamily: "MulishSemiBold",
                fontSize: 16,
                color: "white",
              }}
            >
              Pagos
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  partialItem: {
    position: "relative",
    overflow: "hidden",
    height: 40, // Hacemos el último item más pequeño para mostrar solo una parte
  },
  text: {
    fontSize: 16,
  },
  gradient: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    height: 40, // Controla la altura del degradado
  },
});
