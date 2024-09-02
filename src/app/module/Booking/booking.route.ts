import { Router } from "express"
import { BookingController } from "./booking.controller"
import validateRequest from "../../middleware/validateRequest"
import { BookingValidations } from "./booking.validaton"
import authGuardValidator from "../../middleware/authGuard"


const router = Router()

router.get('/my-bookings', authGuardValidator('user'), BookingController.getmyBoookingController)
router.post('/book-car', authGuardValidator('user'), validateRequest(BookingValidations.CreateBookingvzodschema), BookingController.createBoookingCOntroller)

router.get('/', authGuardValidator('admin'), BookingController.getALLBoookingCOntroller)


export const BookingRoute = router