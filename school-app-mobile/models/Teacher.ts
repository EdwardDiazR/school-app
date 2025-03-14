import { Class } from "./Class";

export interface Teacher {
  fullName: string;
  classes: Class[];
}

export type TeacherInfo = Pick<Teacher, "fullName">;
