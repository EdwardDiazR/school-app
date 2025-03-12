import { StudentApiResponseForTutor } from "@/models/students/Student";
import axios, { AxiosResponse } from "axios";

const baseUr = "https://localhost:7251/api/tutors";
export const GetStudentsByTutorId = async (
  tutorId: Number
): Promise<AxiosResponse<StudentApiResponseForTutor[]>> => {
  return axios.get<StudentApiResponseForTutor[]>(
    `${baseUr}/${tutorId}/students`,
    {
      headers: {
        Bearer: "token",
      },
    }
  );
};
