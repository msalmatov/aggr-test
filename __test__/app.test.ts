import app from "../src/app";
import { closeDb, initDb } from "../src/db";
import { EmployeeModel } from "../src/models/Employee.model";
import { AddressModel } from "../src/models/Address.model";

const supertest = require('supertest');

const request = supertest(app);

class Seeder {
    static readonly empId1 = "638f48a1fc13ae5d9c00084b";
    static readonly empId2 = "638f48a1fc13ae5d9c00084c";
    static readonly empId3 = "638f48a1fc13ae5d9c00084d";
    static readonly empId4 = "638f48a1fc13ae5d9c00084e";

    static readonly addId1 = "638f48a1fc13ae5d9c000850";
    static readonly addId2 = "638f48a1fc13ae5d9c000851";
    static readonly addId3 = "638f48a1fc13ae5d9c000852";
    static readonly addId4 = "638f48a1fc13ae5d9c000853";

    public static seedEmployees() {
        return EmployeeModel.create([
            {
                _id: Seeder.empId1,
                fullName: "Назаров Зафар",
                department: "IT",
                position: "Дизайнер"
            },
            {
                _id: Seeder.empId2,
                fullName: "Набиев Сафар",
                department: "IT",
                position: "Замдиректор"
            },
            {
                _id: Seeder.empId3,
                fullName: "Афандиев Наби",
                department: "IT",
                position: "Методист"
            },
            {
                _id: Seeder.empId4,
                fullName: "Дилмурадов Музафар",
                department: "IT",
                position: "Криминалист"
            },
        ]);
    }

    public static seedAddresses() {
        return AddressModel.create([
            {
                _id: Seeder.addId1,
                employeeId: Seeder.empId1,
                address: "Ташкент"
            },
            {
                _id: Seeder.addId2,
                employeeId: Seeder.empId2,
                address: "Фергана"
            },
            {
                _id: Seeder.addId3,
                employeeId: Seeder.empId3,
                address: "Наманган"
            },
            {
                _id: Seeder.addId4,
                employeeId: Seeder.empId4,
                address: "Бухара"
            }
        ]);
    }
}

describe("App", function () {

    beforeAll(async function () {
        await initDb();
    });

    afterAll(async function () {
        await closeDb();
    });

    beforeEach(async function () {
        await AddressModel.deleteMany();
        await EmployeeModel.deleteMany();
        await Seeder.seedEmployees();
        await Seeder.seedAddresses();
    });

    describe("search", function () {

        const req = async (data: Record<string, any>) => {
            return request
                .post('/employees/search')
                .set('Accept', 'application/json')
                .send(data);
        }

        it("should return employees with valid params", async function () {
            const res = await req({
                search: "на Афа ди"
            });

            expect(res.status).toEqual(200);
            expect(res.body).toBeDefined();
            expect(res.body.error).toBeNull();
            expect(res.body.result).toEqual([
                expect.objectContaining({
                    _id: Seeder.empId3,
                }),
                expect.objectContaining({
                    _id: Seeder.empId4,
                }),
                expect.objectContaining({
                    _id: Seeder.empId2,
                }),
                expect.objectContaining({
                    _id: Seeder.empId1,
                })
            ]);
        });

        it("should return empty list with partially matched keywords", async function () {
            const res = await req({
                search: "афа ди блабла"
            });

            expect(res.status).toEqual(200);
            expect(res.body).toBeDefined();
            expect(res.body.error).toBeNull();
            expect(res.body.result).toEqual([]);
        });

        it("should return empty list with unmatched keywords", async function () {
            const res = await req({
                search: "no keywords exists"
            });

            expect(res.status).toEqual(200);
            expect(res.body).toBeDefined();
            expect(res.body.error).toBeNull();
            expect(res.body.result).toEqual([]);
        });

        it("should return error with empty keywords", async function () {
            const res = await req({});

            expect(res.status).toEqual(500);
            expect(res.body.error).toEqual("Search text isn't specified");
        });
    });
});
