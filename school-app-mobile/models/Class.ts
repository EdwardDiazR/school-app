export interface Class {
  id: number;
  name: string;
  grade: string;
  teacherId: string;
  teacherName: string;
  createdDate: string;
}

export interface StudentClass {
  id: number;
  studentId: number;
  teacherId: number;
  classId:number;
}
