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
router.get('/:id', authGuardValidator('admin', 'user'),
    UserCOntrollers.getSingleuserController)
router.put('/:id', authGuardValidator('admin', 'user'),
    UserCOntrollers.getUpdateuserController)
router.patch('/:id', authGuardValidator('admin'),
    UserCOntrollers.makeAdminController)

router.post('/login', validateRequest(UserValidations.LoginvalidationSchema), UserCOntrollers.LoginController)

export const Userroute = router;