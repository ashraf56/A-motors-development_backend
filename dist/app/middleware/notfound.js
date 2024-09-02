"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const noRoutefound = ((req, res, next) => {
    return res.status(400).json({
        success: false,
        statusCode: 404,
        message: "Not Found"
    });
});
exports.default = noRoutefound;
