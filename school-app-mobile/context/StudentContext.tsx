import React, { useState, createContext, useEffect, useContext } from "react";
import * as _authService from "@/services/authService";
import * as _tutorService from "@/services/tutorService";
import { Student, StudentForTutor } from "@/models/students/Student";
import { AxiosError } from "axios";
import { useAuth } from "./AuthContext";

export type StudentContextType = {
  students: Student[] | StudentForTutor[] | null;
  isLoadingStudents: boolean;
  errorsList: ErrorList;
  getStudentForTutor: (tutorId: number) => void;
};

export interface Students {
  id: number;
  userName: string;
  role: UserRoles;
}

const StudentContext = createContext<StudentContextType | null>(null);

export const useStudentContext = () => {
  return useContext(StudentContext) as StudentContextType;
};

export enum UserRoles {
  Tutor = "Tutor",
  Admin = "Admin",
  Teacher = "Teacher",
}

export interface ErrorList {
  hasFetchListError?: boolean;
}

const StudentProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [students, setStudents] = useState<
    Student[] | StudentForTutor[] | null
  >(null);

  const { authState } = useAuth();

  const [errorsList, setErrorsList] = useState<ErrorList>({
    hasFetchListError: false,
  });

  const [isLoadingStudents, setIsLoadingStudents] = useState<boolean>(false);

  const getStudentForTutor = (tutorId: number) => {
    setIsLoadingStudents(true);
    setErrorsList({})

    return _tutorService
      .GetStudentsByTutorId(tutorId)
      .then((r) => {
        console.log(r.data.data);
        
        let students = r.data.data;
        setStudents(students);
      })
      .catch((e: AxiosError) => {
        setErrorsList({ hasFetchListError: true });
        console.log(e);
      })
      .finally(() => {
        setIsLoadingStudents(false);
      });

    console.log("Calling getStudentsForTutor");
  };

  useEffect(() => {
    if (!students) {
      if (authState?.user?.role == UserRoles.Tutor) {
        getStudentForTutor(authState.user.id);
      }
    }
  }, [authState, students]);

  return (
    <StudentContext.Provider
      value={{ students, getStudentForTutor, errorsList, isLoadingStudents }}
    >
      {children}
    </StudentContext.Provider>
  );
};

export { StudentProvider, StudentContext };
