import { NextFunction, Request, Response } from "express";

export default function errorHandler(err: any, req: Request, res: Response, next: NextFunction) {
    console.log(err);

    if (err.status) {
        res.status(err.status);
    }

    res.send({errors: [err.message]});
}