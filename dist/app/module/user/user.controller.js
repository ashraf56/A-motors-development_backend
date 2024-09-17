"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserCOntrollers = void 0;
const tryCatchWrapper_1 = require("../../utills/tryCatchWrapper");
const user_service_1 = require("./user.service");
const CreateUserController = (0, tryCatchWrapper_1.tryCatchWrapper)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const payload = req.body;
    const result = yield user_service_1.Userservices.createUserDB(payload);
    res.status(200).json({
        success: true,
        statusCode: 200,
        message: "User registered successfully",
        data: result
    });
}));
const getAllUserController = (0, tryCatchWrapper_1.tryCatchWrapper)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_service_1.Userservices.getAllUserDB();
    res.status(200).json({
        success: true,
        statusCode: 200,
        message: "Users retrieved successfully",
        data: result
    });
}));
const getSingleuserController = (0, tryCatchWrapper_1.tryCatchWrapper)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield user_service_1.Userservices.getSingleUserDB(id);
    res.status(200).json({
        success: true,
        statusCode: 200,
        message: "User retrieved successfully",
        data: result
    });
}));
const makeAdminController = (0, tryCatchWrapper_1.tryCatchWrapper)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield user_service_1.Userservices.makeAdminDB(id);
    res.status(200).json({
        success: true,
        statusCode: 200,
        message: "User role updated successfully",
        data: result
    });
}));
const getUpdateuserController = (0, tryCatchWrapper_1.tryCatchWrapper)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const payload = req.body;
    const result = yield user_service_1.Userservices.getUpdateUserDB(id, payload);
    res.status(200).json({
        success: true,
        statusCode: 200,
        message: "User info updated successfully",
        data: result
    });
}));
const LoginController = (0, tryCatchWrapper_1.tryCatchWrapper)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_service_1.Userservices.LogInUserDB(req.body);
    const { token, users } = result;
    res.status(200).json({
        success: true,
        statusCode: 201,
        message: "User Logged in successfully",
        data: {
            users, token
        }
    });
}));
exports.UserCOntrollers = {
    CreateUserController,
    LoginController,
    getAllUserController,
    getSingleuserController,
    getUpdateuserController,
    makeAdminController
};
