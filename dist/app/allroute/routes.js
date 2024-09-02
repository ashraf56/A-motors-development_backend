"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_route_1 = require("../module/user/user.route");
const car_route_1 = require("../module/car/car.route");
const booking_route_1 = require("../module/Booking/booking.route");
const router = (0, express_1.Router)();
const allroute = [
    {
        path: '/auth',
        route: user_route_1.Userroute
    },
    {
        path: '/cars',
        route: car_route_1.CarRoute
    },
    {
        path: '/bookings',
        route: booking_route_1.BookingRoute
    }
];
allroute.forEach(r => router.use(r.path, r.route));
exports.default = router;
