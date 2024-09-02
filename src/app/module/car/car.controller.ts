import { tryCatchWrapper } from "../../utills/tryCatchWrapper";
import { CarService } from "./car.service";


const createCarController = tryCatchWrapper(
    async (req, res) => {
        const payload = req.body;
        const result = await CarService.CreateCarDB(payload)

        res.status(200).json({
            success: true,
            statusCode: 201,
            message: "Car created successfully",
            data: result
        })
    }
)


const getAllCarController = tryCatchWrapper(
    async (req, res) => {
        const result = await CarService.getALlCarInfoFromDB();

        res.status(200).json({
            success: true,
            statusCode: 200,
            message: "Cars retrieved  successfully",
            data: result
        })

    }
)
const getSingleCarController = tryCatchWrapper(
    async (req, res) => {
        const { id } = req.params;
        const result = await CarService.getSIngleCArDB(id);

        res.status(200).json({
            success: true,
            statusCode: 200,
            message: "Car retrieved  successfully",
            data: result
        })

    }
)
const deleteSingleCarController = tryCatchWrapper(
    async (req, res) => {
        const { id } = req.params;
        const result = await CarService.deleteAcarDB(id);

        res.status(200).json({
            success: true,
            statusCode: 200,
            message: "Car deleted  successfully",
            data: result
        })

    }
)
const updateSingleCarController = tryCatchWrapper(
    async (req, res) => {
        const { id } = req.params;
        const data = req.body;
        const result = await CarService.updateAcarDB(id, data);

        res.status(200).json({
            success: true,
            statusCode: 200,
            message: "Car updated  successfully",
            data: result
        })

    }
)

const reTurnCarController = tryCatchWrapper(
    async (req, res) => {
        const { bookingId, endTime } = req.body
        const result = await CarService.returnCarDB(bookingId, endTime)
        res.status(200).json({
            success: true,
            statusCode: 200,
            message: "Car returned  successfully",
            data: result
        })

    }
)

export const CarContoller = {
    createCarController,
    getAllCarController,
    getSingleCarController,
    deleteSingleCarController,
    updateSingleCarController,
    reTurnCarController
}