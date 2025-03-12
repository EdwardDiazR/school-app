import axios from "axios";

const baseUr= "https://localhost:7251/api/students";
export const GetStudentsByTutorId = () => {
    axios.get(`${baseUr}/`)
};
