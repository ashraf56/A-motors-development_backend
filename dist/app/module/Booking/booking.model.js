"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const BookingSchema = new mongoose_1.Schema({
    date: { type: String, required: true },
    user: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'User',
    },
    car: {
        type: mongoose_1.Schema.Types.ObjectId,
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
});
const Booking = (0, mongoose_1.model)('Booking', BookingSchema);
exports.default = Booking;
