import { startSession } from "mongoose";
import trhowErrorHandller from "../../utills/trhowErrorHandller";
import { CarInterface } from "./car.interface";
import Car from "./car.model";
import Booking from "../Booking/booking.model";



const CreateCarDB = async (payload: CarInterface) => {

    const existCar = await Car.findOne({ name: payload.name })
    if (existCar) {
        trhowErrorHandller("Already  created")
    }


    const cars = await Car.create(payload)
    return cars;
}



const getALlCarInfoFromDB = async () => {
    const result = await Car.find()
    return result
}


const getSIngleCArDB = async (id: string) => {
    const result = await Car.findById({ _id: id })
    return result
}

const deleteAcarDB = async (id: string) => {
    const result = await Car.findByIdAndUpdate({ _id: id },
        {
            isDeleted: true
        },
        { new: true })

    return result
}


const returnCarDB = async (bookingId: string, endTime: string) => {

    const bookings = await Booking.findById(bookingId)
    if (bookings?.endTime !== null) {
        trhowErrorHandller(' Faild to return');
    }
    const session = await startSession()
    try {
        session.startTransaction()

        const carId = bookings?.car._id.toString()
        const carsinfo = await Car.findById(carId)

        const [startHour, startMin] = bookings?.startTime.split(":").map(Number) as number[]
        const [currentEndHour, endmin] = endTime.split(":").map(Number) as number[]
        const currentPricePerHour = carsinfo?.pricePerHour as number
        const totalCurrentcost = bookings?.totalCost as number

        // converting current  startTime an endtime into hours
        const totalStartTime = startHour + startMin / 60
        const totalEndTime = currentEndHour + endmin / 60

        const totalHours = totalEndTime - totalStartTime
        const rideCost = currentPricePerHour * totalHours
        const FinalCost = rideCost + totalCurrentcost

        const totalFinalcost = Math.ceil(FinalCost)

        // updating booking info .
        const Bookingdata = await Booking.findByIdAndUpdate(
            { _id: bookingId },
            { $set: { endTime: endTime, totalCost: totalFinalcost } },
            { upsert: true, new: true, session })

        if (!Bookingdata) {
            trhowErrorHandller('Failed to return')

        }
        // Updating the car status
        const updateCarstatus = await Car.findByIdAndUpdate({ _id: carId }, {
            $set: {
                status: 'available',

            }
        }, {
            new: true, session
        })

        if (!updateCarstatus) {
            trhowErrorHandller('Failed to return')

        }



        await session.commitTransaction()
        await session.endSession()
        const ReturnedCar = await Booking.findById(bookingId).populate('user').populate('car')
        return ReturnedCar

    } catch (error: string | unknown) {
        await session.abortTransaction()
        await session.endSession()
        trhowErrorHandller('Failed to return')
    }

}





const updateAcarDB = async (id: string, payload: Partial<CarInterface>) => {

    const { features, ...data } = payload
    const session = await startSession()

    try {
        session.startTransaction()
        const updateinfo = await Car.findByIdAndUpdate({ _id: id }, data, { new: true, session })

        if (!updateinfo) {
            trhowErrorHandller('Failed to update')
        }
        if (features && features?.length > 0) {
            //  find car features from DB
            const dbFeatures = await Car.findById(id).select('features')
            // storing current DB Features
            const currentFeatures = dbFeatures?.features || []

            // add a new feture in the fetures array. filtering the payload feature where no currentFeatures exist.  
            const addNewFeature = features.filter((f) => !currentFeatures.includes(f))

            // remove  a new feture from fetures array. 

            const removedFeature = currentFeatures.filter((cf) => features.includes(cf))



            // feature remove  logic

            const featureremove = await Car.findByIdAndUpdate({ _id: id },
                { $pull: { features: { $in: removedFeature } } },
                {
                    new: true,
                    session
                }
            )



            if (!featureremove) {
                trhowErrorHandller('Failed to update')
            }

            // feature add logic

            const featuresupdate = await Car.findByIdAndUpdate({ _id: id },
                {
                    $addToSet: {
                        features: {
                            $each: addNewFeature
                        }
                    }
                },
                {
                    new: true,
                    session
                }
            )


            if (!featuresupdate) {
                trhowErrorHandller('Failed to update')
            }




        }



        await session.commitTransaction()
        await session.endSession()

        const result = await Car.findById(id)
        return result

    } catch (error) {
        await session.abortTransaction()
        await session.endSession()
        trhowErrorHandller('Failed to update')
    }




}





export const CarService = {
    CreateCarDB,
    getALlCarInfoFromDB,
    getSIngleCArDB,
    deleteAcarDB,
    updateAcarDB,
    returnCarDB
}

