import { Router } from "express";
import { CarContoller } from "./car.controller";
import authGuardValidator from "../../middleware/authGuard";
import validateRequest from "../../middleware/validateRequest";
import { CarValidatons } from "./car.validation";


const router = Router()

router.put('/return', authGuardValidator('admin'), CarContoller.reTurnCarController)

router.post('/create-car',
    authGuardValidator('admin'),
    validateRequest(CarValidatons.createAcarValidationSchema),
    CarContoller.createCarController)

router.get('/', CarContoller.getAllCarController)

router.get('/:id', CarContoller.getSingleCarController)

router.delete('/:id',
    authGuardValidator('admin'),
    CarContoller.deleteSingleCarController
)


router.put('/:id',
    authGuardValidator('admin'),
    validateRequest(CarValidatons.updateAcarValidationSchema),
    CarContoller.updateSingleCarController
)





export const CarRoute = router