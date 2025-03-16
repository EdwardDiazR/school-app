import { View, Text, Image, Pressable, Alert } from "react-native";
import React, { useState } from "react";
import { Feather } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";
import { StudentForTutor } from "@/models/students/Student";
import { Link, router } from "expo-router";

export default function FeedCard({
  Student,
  goToDetails,
}: {
  Student: StudentForTutor;
  goToDetails: (id: number) => void;
}) {
  const ImageSize = 60;
  const [isNavigating, setIsNavigating] = useState<boolean>(false);
  const handleGoToDetails = () => {
    goToDetails(Student.id);
  };
  return (
    <Link
      href={{
        pathname: "/(app)/(tutor)/studentDetails",
        params: { id: Student.id },
      }}
      style={{
        borderRadius: 40,
        overflow: "hidden",
      }}
      asChild
    >
      <Pressable
        style={{
          flex: 1,
          backgroundColor: "white",
          elevation: 5,
          padding: 13,
          flexDirection: "row",
          alignItems: "center",
          gap: 10,
          marginEnd: 7,
        }}
      >
        <View
          style={{
            borderColor: Colors.brightOrange,
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
          <Feather
            name="chevrons-right"
            size={30}
            color={Colors.brightOrange}
          />
        </Pressable>
      </Pressable>
    </Link>
  );
}
