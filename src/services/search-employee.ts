import { EmployeeModel } from "../models/Employee.model";

export default class SearchEmployeeService {
    public search(searchString: string) {
        const reList = this.getSearchRegExpList(searchString);

        const aggrList: any = [{
            $lookup: {
                from: "addresses",
                localField: "_id",
                foreignField: "employeeId",
                as: "addresses"
            }
        }];

        reList.forEach(re => {
            aggrList.push({
                $match: {
                    $or: [
                        { fullName: re },
                        { position: re },
                        { "addresses.address": re }
                    ]
                }
            });
        });

        aggrList.push({
            $sort: { fullName: 1 }
        });

        // aggrList.push({
        //     $project: {
        //         _id: 1,
        //         fullName: 1,
        //         department: 1,
        //         position: 1,
        //         address: { $arrayElemAt: ['$addresses.address', 0] }
        //     }
        // });

        return EmployeeModel.aggregate(aggrList);
    }

    public getSearchRegExpList(searchString: string) {
        return Array.from(new Set(searchString.toLowerCase().split(/\s+/))).map(w => new RegExp(w, "i"));
    }
}