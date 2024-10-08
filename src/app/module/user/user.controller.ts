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
const getAllUserController = tryCatchWrapper(
    async (req, res) => {
        const result = await Userservices.getAllUserDB()

        res.status(200).json({
            success: true,
            statusCode: 200,
            message: "Users retrieved successfully",
            data: result
        })
    }
)
const getSingleuserController = tryCatchWrapper(
    async (req, res) => {
        const {id}= req.params
        const result = await Userservices.getSingleUserDB(id)

        res.status(200).json({
            success: true,
            statusCode: 200,
            message: "User retrieved successfully",
            data: result
        })
    }
)
const makeAdminController = tryCatchWrapper(
    async (req, res) => {
        const {id}= req.params
        const result = await Userservices.makeAdminDB(id)

        res.status(200).json({
            success: true,
            statusCode: 200,
            message: "User role updated successfully",
            data: result
        })
    }
)
const getUpdateuserController = tryCatchWrapper(
    async (req, res) => {
        const {id}= req.params
        const payload = req.body
        const result = await Userservices.getUpdateUserDB(id,payload)

        res.status(200).json({
            success: true,
            statusCode: 200,
            message: "User info updated successfully",
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
    LoginController,
    getAllUserController,
    getSingleuserController,
    getUpdateuserController,
    makeAdminController
}