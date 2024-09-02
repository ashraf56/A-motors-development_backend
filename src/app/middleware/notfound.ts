/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import { NextFunction, Request, Response } from "express";

const noRoutefound = ((req: Request, res: Response, next: NextFunction) => {

    return res.status(400).json({
        success: false,
        statusCode: 404,
        message: "Not Found"
    })
})



export default noRoutefound