import { View, Text, Image, Pressable } from "react-native";
import React from "react";
import { Feather } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";
import { StudentForTutor } from "@/models/students/Student";

export default function FeedCard({ Student }: { Student: StudentForTutor }) {
  const ImageSize = 60;

  return (
    <View
      style={{
        backgroundColor: "white",
        elevation: 2,
        borderRadius: 7,
        padding: 10,
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
        marginEnd: 7,
      }}
    >
      <View
        style={{
          borderColor: Colors.blueSky,
          borderWidth: 2,
          borderRadius: 100,
          overflow: "hidden",
          backgroundColor: "white",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <View
          style={{
            height: ImageSize,
            width: ImageSize,

            margin: 2,
          }}
        >
          <Image
            height={ImageSize}
            width={ImageSize}
            resizeMode="cover"
            style={{ borderRadius: 100 }}
            source={{
              uri: "https://static.vecteezy.com/system/resources/thumbnails/035/315/385/small_2x/ai-generated-young-child-with-blue-eyes-sitting-on-couch-generative-ai-photo.jpg",
            }}
          />
        </View>
      </View>
      <View style={{ flex: 1 }}>
        <Text style={{ fontFamily: "MulishBold" }}>
          {Student.fullName.split(" ")[0]}
        </Text>
        <Text style={{ fontFamily: "MulishRegular" }}>Pre-Kinder</Text>
      </View>

      <Pressable>
        <Feather name="chevrons-right" size={30} />
      </Pressable>
    </View>
  );
}
