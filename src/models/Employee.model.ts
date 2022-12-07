import { getModelForClass, modelOptions, prop } from "@typegoose/typegoose";

@modelOptions({ schemaOptions: { collection: "employees" } })
class Employee {
    @prop({ required: true, index: 1 })
    public fullName!: string;

    @prop({ required: true })
    public department!: string;

    @prop({ required: true })
    public position!: string;
}

const EmployeeModel = getModelForClass(Employee);

export { Employee, EmployeeModel };