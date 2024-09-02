import { z } from "zod";
import { Status } from "./car.constant";


const createAcarValidationSchema = z.object({
    body: z.object({
        name: z.string(),
        description: z.string(),
        color: z.string(),
        status: z.enum([...Status] as [string, ...string[]]),
        features: z.array(z.string()),
        isDeleted: z.boolean().default(false),
        isElectric: z.boolean().optional(),
        pricePerHour: z.number(),
    })
})
const updateAcarValidationSchema = z.object({
    body: z.object({
        name: z.string().optional(),
        description: z.string().optional(),
        color: z.string().optional(),
        status: z.enum([...Status] as [string, ...string[]]).optional(),
        features: z.array(z.string()).optional(),
        isDeleted: z.boolean().default(false).optional(),
        isElectric: z.boolean().optional(),
        pricePerHour: z.number().optional(),
    })
})




export const CarValidatons = {
    createAcarValidationSchema,
    updateAcarValidationSchema,
}