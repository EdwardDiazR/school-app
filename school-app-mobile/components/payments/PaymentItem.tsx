import { Colors } from "@/constants/Colors";
import React, { useRef, useState } from "react";
import { Pressable, Text, View } from "react-native";
import BouncyCheckbox, {
  BouncyCheckboxHandle,
  BouncyCheckboxProps,
} from "react-native-bouncy-checkbox";

export const PaymentItem = () => {
  const IsExpired = false;
  const bouncyCheckboxRef = useRef<BouncyCheckboxHandle>(null);

  const [IsChecked, SetIsChecked] = useState<boolean>(false);

  const handleSelect = () => {
    SetIsChecked(!IsChecked);
    if (bouncyCheckboxRef.current) {
      bouncyCheckboxRef.current.onCheckboxPress();
    }
  };
  return (
    <>
      <Pressable
        android_ripple={{
          color: Colors.brightOrange,
          borderless: true,
          foreground: true,
        }}
        onPress={handleSelect}
        style={{
          backgroundColor: "white",
          borderRadius: 10,
          padding: 10,
          elevation: 1,
          marginVertical: 5,
          gap: 7,
          minHeight: 100,
          maxHeight: 150,
          overflow: "hidden",
        }}
      >
        {IsExpired && (
          <Text
            style={{
              fontFamily: "MulishBold",
              color: "white",
              backgroundColor: "red",
              borderRadius: 6,
              width: 80,
              textAlign: "center",
              fontSize: 13,
            }}
          >
            En atraso
          </Text>
        )}
        <View style={{ flexDirection: "row", gap: 10, flex: 1 }}>
          <BouncyCheckbox
            isChecked={IsChecked}
            size={27}
            disableText
            useBuiltInState={false}
            innerIconStyle={{ borderWidth: 1.8 }}
            fillColor={Colors.brightOrange}
            bounceEffectIn={0.8}
            bounceVelocityOut={2}
            bounceVelocityIn={1}
            onPress={(checked: boolean) => {
              handleSelect();
            }}
          />
          <View
            style={{
              flexDirection: "column",
              justifyContent: "space-between",

              flex: 1,
            }}
          >
            <View
              style={{
                justifyContent: "center",
                flex: 1,
              }}
            >
              <Text style={{ fontFamily: "MulishBold", fontSize: 14 }}>
                (Jose) Mensualidad Febrero 2025
              </Text>
              <Text
                style={{
                  fontSize: 13.5,
                  fontFamily: "MulishSemiBold",
                }}
              >
                Vence: 28/02/25
              </Text>
            </View>
            <Text
              style={{
                fontFamily: "MulishBold",
                color: "green",
                fontSize: 14,
                alignSelf: "flex-end",
              }}
            >
              Total: RD$4,200
            </Text>
          </View>
        </View>
      </Pressable>
    </>
  );
};
