import { tryCatchWrapper } from "../../utills/tryCatchWrapper";
import { Userservices } from "./user.service";

const CreateUserController = tryCatchWrapper(
    async (req, res) => {
        const payload = req.body;
        const result = await Userservices.createUserDB(payload)

        res.status(200).json({
            success: true,
            statusCode: 200,
            message: "User registered successfully",
            data: result
        })
    }
)


const LoginController = tryCatchWrapper(
    async (req, res) => {

        const result = await Userservices.LogInUserDB(req.body)
        const { token, users } = result
        res.status(200).json({
            success: true,
            statusCode: 201,
            message: "User Logged in successfully",
            data: {
                users, token
            }
        })
    }
)


export const UserCOntrollers = {
    CreateUserController,
    LoginController
}