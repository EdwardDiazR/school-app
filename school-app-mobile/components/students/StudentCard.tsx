import { View, Text, Pressable, Image } from "react-native";
import React from "react";
import { Colors } from "@/constants/Colors";
import { Divider } from "react-native-paper";
import { MaterialIcons } from "@expo/vector-icons";
import { Link, Navigator, router } from "expo-router";

export function StudentCard({ StudentName }: { StudentName: string }) {
  const ImageSize = 100;
  return (
    <Pressable style={{}}>
      <View
        style={{
          marginVertical: 8,
         
          padding: 10,
          backgroundColor: "white",
          borderRadius: 15,
          elevation: 1,
          flexDirection: "row",
          gap: 10,
        }}
      >
        <View style={{ flexDirection: "column", gap: 5 }}>
          <View
            style={{
              alignSelf: "center",
              borderColor: Colors.blueSky,
              borderWidth: 2,
              borderRadius: 100,
              overflow: "hidden",
              backgroundColor: "white",
              alignItems: "center",
              borderStyle: "solid",
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
          <Text
            style={{
              fontFamily: "MulishBold",
              textAlign: "center",
              fontSize: 16,
              color: "black",
            }}
          >
            {StudentName}
          </Text>
        </View>
        <View style={{ flexDirection: "column", flex: 1, gap: 5 }}>
          <View
            style={{
              backgroundColor: "#e9ecef",
              borderRadius: 10,
              padding: 10,
              gap: 5,
            }}
          >
            <View
              style={{ flexDirection: "row", alignItems: "center", gap: 2 }}
            >
              <Text style={{ fontFamily: "MulishBold" }}>Status:</Text>
              <View
                style={{
                  backgroundColor: "green",
                  borderRadius: 10,
                  paddingHorizontal: 5,
                }}
              >
                <Text
                  style={{
                    fontFamily: "MulishBold",
                    color: "white",
                  }}
                >
                  Activo
                </Text>
              </View>
            </View>
            <Divider style={{ borderWidth: 0.3, borderColor: "lightgray" }} />
            <Text style={{ fontFamily: "MulishBold" }}>Curso: 5to Grado</Text>
            <Divider style={{ borderWidth: 0.3, borderColor: "lightgray" }} />
            <Text style={{ fontFamily: "MulishBold" }}>Parentesco: Hijo</Text>
            <Divider style={{ borderWidth: 0.3, borderColor: "lightgray" }} />
            <Text style={{ fontFamily: "MulishBold" }}>
              Fecha Ingreso: 11/06/24
            </Text>
          </View>

          <Link
            href={{
              pathname: "/(tabs)/students/options",
              params: { name: StudentName },
            }}
            style={{ alignSelf: "center" }}
          >
            <View
              style={{
                alignSelf: "center",
                backgroundColor: "white",
                elevation: 2,
                borderRadius: 20,
                padding: 10,
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "row",
                gap: 5,
              }}
            >
              <Text
                style={{
                  fontFamily: "MulishSemiBold",
                  color: Colors.darkOrange,
                }}
              >
                Mas acciones
              </Text>
              <MaterialIcons
                name="arrow-forward"
                size={20}
                color={Colors.blueMedium}
              />
            </View>
          </Link>
        </View>
      </View>
    </Pressable>
  );
}
