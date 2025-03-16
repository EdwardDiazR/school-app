import { LoginDto } from "@/models/Auth";
import axios, { AxiosError } from "axios";
import { router } from "expo-router";
import * as SecureStore from "expo-secure-store";

const baseUrl = "http://192.168.1.28:7252/api/auth";

export const login = (loginDto: LoginDto) => {
  axios
    .post(`${baseUrl}/login`, loginDto)
    .then((r) => {
      console.log(loginDto);
      //For test delete token
      //   SecureStore.deleteItemAsync("token");

      const token = r.data.token;
      SecureStore.setItem("token", token);
      console.log(r.data);

      console.log("Tu token es:", SecureStore.getItem("token"));

      // router.push("/(app)/(tutor)/(tabs)/home")
    })

    .catch((e) => console.log(e));
};

export const logout = () => {
  axios
    .post(`${baseUrl}/logout`, 1)
    .then((r) => {
      SecureStore.deleteItemAsync("token");
      console.log(r.data);
    })

    .catch((e) => console.log(e));
};
