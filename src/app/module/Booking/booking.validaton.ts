import { z } from "zod";

const CreateBookingvzodschema = z.object({
    body: z.object({
        date: z.string(),
        license:z.string(),
        nid:z.string(),
        user: z.string().optional(),
        car: z.string(),
        status: z.string(),
        startTime: z.string({
            invalid_type_error: "startTime must be String"
        }),
        endTime: z.string().optional(),
        totalCost: z.number().optional()

    })
})



export const BookingValidations = {
    CreateBookingvzodschema,
}