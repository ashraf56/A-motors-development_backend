import { Router } from "express";
import { Userroute } from "../module/user/user.route";
import { CarRoute } from "../module/car/car.route";
import { BookingRoute } from "../module/Booking/booking.route";

const router = Router();

const allroute = [
    {
        path: '/auth',
        route: Userroute

    },
    {
        path: '/cars',
        route: CarRoute

    },
    {
        path: '/bookings',
        route: BookingRoute

    }
]


allroute.forEach(r => router.use(r.path, r.route))

export default router;