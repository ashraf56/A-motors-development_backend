"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Userroute = void 0;
const express_1 = require("express");
const user_controller_1 = require("./user.controller");
const validateRequest_1 = __importDefault(require("../../middleware/validateRequest"));
const user_validation_1 = require("./user.validation");
const router = (0, express_1.Router)();
router.post('/signup', (0, validateRequest_1.default)(user_validation_1.UserValidations.createUservalidationSchema), user_controller_1.UserCOntrollers.CreateUserController);
router.post('/login', (0, validateRequest_1.default)(user_validation_1.UserValidations.LoginvalidationSchema), user_controller_1.UserCOntrollers.LoginController);
exports.Userroute = router;
