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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Userservices = void 0;
const config_1 = __importDefault(require("../../config/config"));
const trhowErrorHandller_1 = __importDefault(require("../../utills/trhowErrorHandller"));
const user_model_1 = __importDefault(require("./user.model"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const createUserDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const isUserexist = yield user_model_1.default.findOne({ email: payload.email });
    if (isUserexist) {
        (0, trhowErrorHandller_1.default)('User already found');
    }
    const result = yield user_model_1.default.create(payload);
    return result;
});
const getAllUserDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.default.find();
    return result;
});
const getSingleUserDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.default.findById(id);
    return result;
});
const getUpdateUserDB = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.default.findByIdAndUpdate({ _id: id }, payload, { new: true });
    return result;
});
const makeAdminDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.default.findByIdAndUpdate({ _id: id }, {
        $set: {
            role: 'admin'
        }
    }, { new: true });
    return result;
});
const LogInUserDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield user_model_1.default.findOne({ email: payload.email });
    if (!users) {
        (0, trhowErrorHandller_1.default)('User not found');
    }
    const passwordMatcher = yield user_model_1.default.isPasswordmatch(payload.password, users === null || users === void 0 ? void 0 : users.password);
    if (!passwordMatcher) {
        (0, trhowErrorHandller_1.default)('password not match');
    }
    const tokenplayload = {
        id: users === null || users === void 0 ? void 0 : users._id,
        role: users === null || users === void 0 ? void 0 : users.role
    };
    const token = jsonwebtoken_1.default.sign(tokenplayload, config_1.default.JWT_sec_Token, { expiresIn: '365D' });
    return {
        token, users
    };
});
exports.Userservices = {
    createUserDB,
    LogInUserDB,
    getAllUserDB,
    getSingleUserDB,
    getUpdateUserDB,
    makeAdminDB
};
