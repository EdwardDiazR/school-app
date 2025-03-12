export interface Payment{
    id:number,
    description:string,
    totalAmount:number,
    paidAmount:number,
    charge:number,
    pendingAmount:number,
    isPaid:boolean,
    lastPaymentDate:Date,
    expireDate:Date,
    studentId:number,
    paymentChannel:string,
    paymentMehod: "cash" | "card" | "transfer"
    isCompleted:boolean,
    isExonerated:boolean,

}