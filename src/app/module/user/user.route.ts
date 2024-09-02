import { Router } from "express";
import { UserCOntrollers } from "./user.controller";
import validateRequest from "../../middleware/validateRequest";
import { UserValidations } from "./user.validation";



const router = Router()

router.post('/signup', validateRequest(UserValidations.createUservalidationSchema),
    UserCOntrollers.CreateUserController)

router.post('/login', validateRequest(UserValidations.LoginvalidationSchema), UserCOntrollers.LoginController)

export const Userroute = router;