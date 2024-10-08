import { tryCatchWrapper } from "../../utills/tryCatchWrapper"
import { BookingServices } from "./booking.service"


const getmyBoookingController = tryCatchWrapper(
    async (req, res) => {
       
        
        const result = await BookingServices.getMybookingsDB(req.user.id)
        res.status(200).json({
            success: true,
            statusCode: 200,
            message: "My Bookings retrieved successfully",
            data: result
        })
    }
)

const getCencleBoookingController = tryCatchWrapper(
    async (req, res) => {
       
        const {id} = req.params
        const result = await BookingServices.CencleBooking(id)        
        res.status(200).json({
            success: true,
            statusCode: 200,
            message: "Booking cencled successfully",
            data: result
        })
    }
)
const setApproveBoookingController = tryCatchWrapper(
    async (req, res) => {
       
        const {id} = req.params
        const result = await BookingServices.SetapproveBooking(id)        
        res.status(200).json({
            success: true,
            statusCode: 200,
            message: "Booking Approved successfully",
            data: result
        })
    }
)






const createBoookingCOntroller = tryCatchWrapper(
    async (req, res) => {

        const result = await BookingServices.createBookingDB(req.body, req.user.id)
        res.status(200).json({
            success: true,
            statusCode: 200,
            message: "Car booked  successfully",
            data: result
        })
    }
)
const getALLBoookingCOntroller = tryCatchWrapper(
    async (req, res) => {
        const carId = req.query.carId as string
        const date = req.query.date as string
        const result = await BookingServices.getAllBookingsfromDB(carId, date)
        res.status(200).json({
            success: true,
            statusCode: 200,
            message: "Bookings retrieved successfully",
            data: result
        })
    }
)
const getSingleBoookingCOntroller = tryCatchWrapper(
    async (req, res) => {
      const id = req.params.id 
        const result = await BookingServices.getSinglebookingsDB(id)
        res.status(200).json({
            success: true,
            statusCode: 200,
            message: "Booking retrieved successfully",
            data: result
        })
    }
)




export const BookingController = {
    createBoookingCOntroller,
    getALLBoookingCOntroller,
    getmyBoookingController,
    getSingleBoookingCOntroller,
    getCencleBoookingController,
    setApproveBoookingController
}
