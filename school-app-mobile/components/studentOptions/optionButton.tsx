import { StudentOptionButton } from "@/models/student/StudentOptions";
import { MaterialIcons } from "@expo/vector-icons";
import React from "react";
import { View, Text, Pressable } from "react-native";

export const OptionButton = ({ options }: { options: StudentOptionButton }) => (
  <Pressable
    onPress={() => {}}
    style={{
      backgroundColor: "white",
      borderRadius: 15,
      elevation:1,
      alignItems: "center",
      justifyContent: "center",
      width: 150,
      height: 110,
      padding: 10,
      margin: 10,
      flexWrap: "nowrap",
      flexDirection: "column",
    }}
  >
    <MaterialIcons
      name={options.iconName}
      size={50}
      color={options.iconColor}
    />
    <Text style={{ textAlign: "center", fontFamily: "MulishSemiBold" }}>
      {options.title}
    </Text>
  </Pressable>
);
