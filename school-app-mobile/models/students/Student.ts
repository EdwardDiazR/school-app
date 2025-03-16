export interface Student {
  id: number;
  fullName: string;
  firstName: string;
  middleName?: string;
  lastName: string;
  secondLastName?: string;
  gender: "M" | "F";
  dateOfBirth: Date;
  actualGrade: string;
  pictureUrl: string;
}

export type StudentForTutor = Pick<Student, "id" | "fullName" | "actualGrade">;

export interface StudentApiResponseForTutor {
  data: StudentForTutor[];
}
export type StudentApiResponseForTeacher = Pick<Student, "fullName">;
