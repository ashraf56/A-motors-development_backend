import { Schema, model } from "mongoose";
import { BookingInterface } from "./booking.interface";


const BookingSchema = new Schema<BookingInterface>({
    date: { type: String, required: true },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    car: {
        type: Schema.Types.ObjectId,
        ref: 'Car',
        required: true
    },
    startTime: {
        type: String, required: true
    },
    endTime: { type: String, default: null },
    totalCost: { type: Number, default: 0 }

}, {
    timestamps: true
})




const Booking = model<BookingInterface>('Booking', BookingSchema)

export default Booking