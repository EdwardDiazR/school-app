import { StudentApiResponseForTutor } from "@/models/students/Student";
import axios, { AxiosResponse } from "axios";
import * as secureStore from "expo-secure-store";

const baseUr = "http://192.168.1.31:7252/api/tutors";
export const GetStudentsByTutorId = async (
  tutorId: Number
): Promise<AxiosResponse<StudentApiResponseForTutor>> => {
  const token = secureStore.getItem("token");

  return axios.get<StudentApiResponseForTutor>(
    `${baseUr}/${tutorId}/students`,
    {
      params: { tutorId: tutorId },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};
