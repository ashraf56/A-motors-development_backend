
import { Schema, model } from "mongoose";
import { CarInterface } from "./car.interface";
import { Status } from "./car.constant";


const Carschema = new Schema<CarInterface>({
    name: {
        type: String,
        required: [true, "name is required"],
    },
    description: {
        type: String,

    },
    color: {
        type: String,
    },
    status: { type: String, enum: { values: Status, message: `status is required` } },
    features: { type: [String], required: true },
    isDeleted: { type: Boolean, default: false },
    isElectric: { type: Boolean },
    pricePerHour: { type: Number, required: true }

}, {
    timestamps: true
})




const Car = model<CarInterface>('Car', Carschema)

export default Car