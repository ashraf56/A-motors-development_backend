/* eslint-disable @typescript-eslint/no-explicit-any */
import trhowErrorHandller from "../../utills/trhowErrorHandller";
import Car from "../car/car.model";
import { BookingInterface } from "./booking.interface";
import Booking from "./booking.model";
import User from "../user/user.model";
import { startSession } from "mongoose";


const getMybookingsDB = async (id: string) => {

    const result = await Booking.find({ user: id }).populate('user').populate('car')


    return result
}





const createBookingDB = async (payload: BookingInterface, userID: string) => {

    const newdata: Partial<BookingInterface> = {}


    const carid = await Car.findById(payload.car)

    if (!carid) {
        trhowErrorHandller('car not found')
    }

    // find user id from db
    const user = await User.findById(userID)

    newdata.user = user?._id
    newdata.car = carid?._id
    newdata.startTime = payload.startTime
    newdata.totalCost = payload.totalCost
    newdata.endTime = payload.endTime
    newdata.date = payload.date
    const session = await startSession()
    try {
        session.startTransaction()

        if (carid?.status === 'unavailable') {
            trhowErrorHandller('Booking not success')
        }



        const createABook = await Booking.create([newdata], { session })

        if (!createABook) {
            trhowErrorHandller('Booking not success')
        }


        const updateSatatus = await Car.findByIdAndUpdate({ _id: payload.car }, {
            $set: {
                status: 'unavailable'
            }

        },
            { upsert: true, new: true, session }
        )

        if (!updateSatatus) {
            trhowErrorHandller('Booking not success')

        }


        await session.commitTransaction()
        await session.endSession()
        const Bookdata = await Booking.findById(createABook[0]?._id).populate('user').populate('car')



        return Bookdata

    } catch (error) {
        await session.abortTransaction()
        await session.endSession()
        trhowErrorHandller('Booking not success')


    }


}

const getAllBookingsfromDB = async (carId: string, date: string) => {

    let query: any = {}

    if (carId && date) {
        query = { $and: [{ car: carId }, { date: date }] }
    }
    const result = await Booking.find(query).populate('user').populate('car')
    if (result.length === 0) {
        trhowErrorHandller('no data found')
    }
    return result
}



export const BookingServices = {
    createBookingDB,
    getAllBookingsfromDB,
    getMybookingsDB

}