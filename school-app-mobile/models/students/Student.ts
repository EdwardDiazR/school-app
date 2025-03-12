export interface Student{
    id:number,
    fullName:string,
    firstName:string,
    middleName?:string
    lastName:string,
    secondLastName?:string,
    gender:'M'|'F',
    dateOfBirth:Date,
    actualGrade:string,
    
    pictureUrl:string,
    
}

 export type StudentApiResponseForTutor= Pick<Student,"fullName">
 export type StudentApiResponseForTeacher= Pick<Student,"fullName">

