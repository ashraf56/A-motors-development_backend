import { Router } from "express";
import { UserCOntrollers } from "./user.controller";
import validateRequest from "../../middleware/validateRequest";
import { UserValidations } from "./user.validation";
import authGuardValidator from "../../middleware/authGuard";



const router = Router()

router.post('/signup', validateRequest(UserValidations.createUservalidationSchema),
    UserCOntrollers.CreateUserController)
router.get('/', authGuardValidator('admin'),
    UserCOntrollers.getAllUserController)

router.post('/login', validateRequest(UserValidations.LoginvalidationSchema), UserCOntrollers.LoginController)

export const Userroute = router;