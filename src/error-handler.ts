import { NextFunction, Request, Response } from "express";

export default function errorHandler(err: any, req: Request, res: Response, next: NextFunction) {
    console.log(err);

    res.status(err.status ? err.status : 500);

    res.send({ error: err });
}