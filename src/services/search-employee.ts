import { EmployeeModel } from "../models/Employee.model";

export default class SearchEmployeeService {
    public search(searchString: string) {
        const search = this.getSearchRegExp(searchString);
        console.log("111:", search);
        return EmployeeModel.aggregate([
            {
                $lookup: {
                    from: "addresses",
                    localField: "_id",
                    foreignField: "employeeId",
                    as: "addresses"
                }
            },
            {
                $match: {
                    $or: [
                        {
                            fullName: search
                        },
                        {
                            position: search
                        },
                        {
                            "addresses.address": search
                        }
                    ]
                }
            },
            {
                $sort: {
                    fullName: 1
                }
            },
            // {
            //     $project: {
            //         _id: 1,
            //         fullName: 1,
            //         department: 1,
            //         position: 1,
            //         address: { $arrayElemAt: [ '$addresses.address', 0 ] }
            //     }
            // }
        ]);
    }

    private getSearchRegExp(searchString: string) {
        return new RegExp(Array.from(new Set(searchString.toLowerCase().split(/\s+/))).join('|'), 'i');
    }
}