import { View, Text } from "react-native";
import React, { useCallback } from "react";
import { LinearGradient } from "expo-linear-gradient";

import { Stack, useFocusEffect, useLocalSearchParams } from "expo-router";
import { Colors } from "@/constants/Colors";
import { MaterialIcons } from "@expo/vector-icons";
import { OptionButton } from "@/components/studentOptions/optionButton";

export default function options() {
  const params = useLocalSearchParams();
  const { name } = params;
  useFocusEffect(
    useCallback(() => {
      // Forzar renderizado cuando se navega a este screen
    }, [])
  );
  return (
    <View style={{ flex: 1 }}>
      <Stack.Screen options={{ title: "Mas opciones | " + name?.toString() }} />
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
      <View style={{ flex: 1, padding: 10, gap: 15 }}>
        <Text
          style={{
            fontFamily: "MulishBold",
            color: "white",
            fontSize: 24,
            textAlign: "center",
          }}
        >
          Que deseas realizar?
        </Text>

        <View
          style={{
            display: "flex",
            flexWrap: "wrap",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            flex: 1,
          }}
        >
          <OptionButton
            options={{
              iconName: "medical-services",
              title: "Excusa medica",
              route: "/(tabs)/(students)",
              iconColor: "red",
            }}
          />
          <OptionButton
            options={{
              iconName: "medication-liquid",
              title: "Registrar condicion medica",
              route: "/(tabs)/(students)",
              iconColor: "#09a6f3",
            }}
          />
          <OptionButton
            options={{
              iconName: "schedule",
              title: "Solicitar permiso",
              route: "/(tabs)/(students)",
              iconColor: "#fa6100",
            }}
          />
          <OptionButton
            options={{
              iconName: "school",
              title: "Ver calificaciones",
              route: "/(tabs)/(students)",
              iconColor: "#ffdd00",
            }}
          />
          <OptionButton
            options={{
              iconName: "summarize",
              title: "Ver reportes del estudiante",
              route: "/(tabs)/(students)",
              iconColor: "#04e762",
            }}
          />
          <OptionButton
            options={{
              iconName: "attach-money",
              title: "Pagos",
              route: "/(tabs)/(students)",
              iconColor: "#59d102",
            }}
          />
        </View>
      </View>
    </View>
  );
}
