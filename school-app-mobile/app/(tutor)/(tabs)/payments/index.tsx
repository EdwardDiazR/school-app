import { View, Text, Pressable, Alert } from "react-native";
import React, { useEffect, useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { Colors } from "@/constants/Colors";
import { ScrollView } from "react-native-reanimated/lib/typescript/Animated";
import FeedPaymentCard from "@/components/payments/FeedPaymentCard";
import { StylesConstants } from "@/constants/Styles";
import { MaterialIcons } from "@expo/vector-icons";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { PaymentItem } from "@/components/payments/PaymentItem";
import { ActivityIndicator } from "react-native-paper";
import Animated, {
  BounceIn,
  BounceInDown,
  BounceInRight,
  Easing,
  FadeIn,
  FlipInEasyX,
  interpolateColor,
  LightSpeedInLeft,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from "react-native-reanimated";
import { router, useNavigation } from "expo-router";

export default function index() {
  const [IsLoadingPayments, SetIsLoadingPayments] = useState<boolean>(false);
  const SelectedPayments = 0;
  const IsExpired = true;
  const LoadingSpinner = () => {
    const opacity = useSharedValue(0.1); // Opacidad inicial baja
    const progress = useSharedValue(0);

    useEffect(() => {
      progress.value = withRepeat(
        withTiming(1, { duration: 1000 }), // Duración de cada ciclo
        -1, // Infinito
        false // No invierte
      );
      opacity.value = withRepeat(
        withSequence(
          withTiming(1, { duration: 1000 }), // Aumenta a full en 1s
          withTiming(0.05, { duration: 1000 }) // Baja a 0.3 en 1s
        ),
        -1, // Repetir infinito
        true
      );
    }, []);
    const animatedStyle = useAnimatedStyle(() => ({
      opacity: opacity.value,
    }));

    return (
      <Animated.View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          gap: 15,
        }}
      >
        <Animated.View
          entering={FlipInEasyX.duration(700).easing(Easing.bounce)}
        >
          {/* Usamos Animated.View aquí */}
          <ActivityIndicator size={50} color={"white"} />
        </Animated.View>
        <Animated.Text
          style={[
            animatedStyle,

            {
              fontSize: 19,
              fontFamily: "MulishBold",
              color: "white",
            },
          ]}
        >
          Cargando tus pagos...
        </Animated.Text>
      </Animated.View>
    );
  };
  const navigation = useNavigation();

  // useEffect(() => {
  //   navigation.addListener("blur", (e) => {
  //     if (true) {
  //       return;
  //     }
  //   });
  // }, [navigation]);
  return (
    <View style={{ flex: 1 }}>
      <LinearGradient
        colors={[Colors.blueMedium, Colors.blueSky, Colors.blueMedium]}
        start={{ x: 0.1, y: 0.9 }}
        end={{ x: 0.4, y: 0.01 }}
        dither
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: 0,
          height: "100%",
        }}
      />

      {!IsLoadingPayments ? (
        <>
          <View style={{ padding: StylesConstants.paddingHorizontal }}>
            <Text
              style={{
                fontFamily: "MulishSemiBold",
                color: "white",
                fontSize: 17,
              }}
            >
              Tus proximos pagos:
            </Text>
            <PaymentItem />
            <PaymentItem />
          </View>
          <Pressable
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              borderRadius: 20,
              elevation: 2,
              margin: 10,
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "row",
              gap: 5,
              overflow: "hidden",
              height: 50,
              backgroundColor: "white",
            }}
          >
            <MaterialIcons
              name="credit-card"
              size={20}
              color={Colors.darkOrange}
            />
            <Text
              style={{
                fontFamily: "MulishBold",
                textAlign: "center",
                color: Colors.darkOrange,
              }}
            >
              Pagar
            </Text>
          </Pressable>
        </>
      ) : (
        <LoadingSpinner />
      )}
    </View>
  );
}
