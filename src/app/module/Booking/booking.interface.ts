import { Types } from "mongoose";


export interface BookingInterface {
    date: string;
    nid:string;
    license:string; 
    user: Types.ObjectId;
    car: Types.ObjectId;
    startTime: string;
    endTime: string;
    totalCost: number;
    paymentStatus:string;
    bookingStatus:string;
}