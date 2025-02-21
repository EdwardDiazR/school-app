import { View, Text, StyleSheet, Pressable, Alert } from "react-native";
import React, { useState } from "react";
import { StylesConstants } from "@/constants/Styles";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { TextInput } from "react-native-paper";
import { MaterialIcons, Octicons } from "@expo/vector-icons";
import { Image } from "react-native";
import { Colors } from "@/constants/Colors";

export default function login() {
  const CanAccessWithBiometrics = true;
  const [IsPasswordVisible, SetIsPasswordVisible] = useState<Boolean>(false);
  const { top } = useSafeAreaInsets();
  const paddingHorizontalValue = 15;

  const TogglePasswordVisibility = () => {
    SetIsPasswordVisible(!IsPasswordVisible);
  };
  return (
    <View
      style={{
        backgroundColor: "white",
        paddingTop: top,
        flex: 1,
        gap: 10,
        flexDirection: "column",
        paddingHorizontal: paddingHorizontalValue,
      }}
    >
      <View
        style={[
          style.HeaderBanner,
          { marginTop: top + 5, marginHorizontal: paddingHorizontalValue },
        ]}
      >
        <Image
          source={require("@/assets/images/logo-school.jpg")}
          style={{
            resizeMode: "contain",
            height: 180,
            width: "100%",
          }}
        />
      </View>
      <View style={[style.LoginSection]}>
        <Text
          style={[
            { textAlign: "center", fontSize: 22, fontFamily: "MulishBold" },
          ]}
        >
          Iniciar sesion
        </Text>
        <TextInput
          mode="outlined"
          label={"Usuario"}
          placeholder="Usuario, email o cedula"
          autoCapitalize="none"
          autoCorrect={false}
          autoComplete="off"
          clearButtonMode="unless-editing"
          left={
            <TextInput.Icon icon={() => <Octicons name="person" size={20} />} />
          }
          outlineColor="lightgray"
          activeOutlineColor={Colors.darkOrange}
          outlineStyle={{ borderRadius: 10, borderWidth: 2 }}
          textContentType="username"
        />
        <TextInput
          mode="outlined"
          label={"Contraseña"}
          placeholder="Ingrese su contraseña"
          autoCapitalize="none"
          autoCorrect={false}
          autoComplete="off"
          secureTextEntry={!IsPasswordVisible}
          textContentType="password"
          left={
            <TextInput.Icon
              icon={() => <MaterialIcons name="lock" size={22} />}
            />
          }
          right={
            <TextInput.Icon
              icon={() => (
                <Pressable onPress={TogglePasswordVisibility}>
                  <MaterialIcons
                    name={IsPasswordVisible ? "visibility-off" : "visibility"}
                    size={22}
                  />
                </Pressable>
              )}
            />
          }
          outlineColor="lightgray"
          activeOutlineColor={Colors.darkOrange}
          outlineStyle={{ borderRadius: 10, borderWidth: 2 }}
        />
        <View
          style={{
            flexDirection: "row",
            gap: 10,
            alignItems: "center",
            paddingVertical: 5,
          }}
        >
          <Pressable
            style={{ height: StylesConstants.Login.buttonHeight, flex: 1 }}
          >
            <View
              style={{
                flex: 1,
                elevation: 1,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                gap: 5,
                borderRadius: StylesConstants.Login.buttonRadius,
                backgroundColor: Colors.blueMedium,
                padding: StylesConstants.Login.buttonPadding,
              }}
            >
              <Text
                style={{
                  color: "white",
                  fontFamily: "MulishSemiBold",
                  fontSize: 16,
                }}
              >
                Acceder
              </Text>
            </View>
          </Pressable>
          <Pressable
            style={{ height: StylesConstants.Login.buttonHeight }}
            disabled={!CanAccessWithBiometrics}
            onPress={() => {
              Alert.alert("Able");
            }}
          >
            <View
              style={{
                flex: 1,
                elevation: 1,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                gap: 5,
                borderRadius: 100,
                backgroundColor: CanAccessWithBiometrics
                  ? Colors.blueSky
                  : "lightgray",
                padding: StylesConstants.Login.buttonPadding,
              }}
            >
              <MaterialIcons
                name="fingerprint"
                size={28}
                color={CanAccessWithBiometrics ? "white" : "gray"}
              />
            </View>
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const style = StyleSheet.create({
  HeaderBanner: {
    backgroundColor: "white",
    borderRadius: 10,
    overflow: "hidden",
  },

  LoginSection: {
    flex: 1,
    paddingTop: 35,
    flexDirection: "column",
    gap: 6,
  },
});
