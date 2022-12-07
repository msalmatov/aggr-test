import { NextFunction, Request, Response } from "express";
import SearchEmployeeService from "../services/search-employee";

export default async function searchEmployees(req: Request, res: Response, next: NextFunction) {
    try {
        const searchString = req.body.search;
        if (!searchString) {
            return next("Search text isn't specified");
        }

        const searcher = new SearchEmployeeService();
        const data = await searcher.search(searchString);
        return res.status(200).send({
            error: null,
            result: data
        });
    } catch (err) {
        return next(err.message);
    }
}