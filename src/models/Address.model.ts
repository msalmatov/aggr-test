import { getModelForClass, modelOptions, prop, Ref } from "@typegoose/typegoose";
import { Employee } from "./Employee.model";

@modelOptions({ schemaOptions: { collection: "addresses" } })
class Address {
    @prop({ ref: () => Employee, index: 1 })
    public employeeId!: Ref<Employee>

    @prop({ required: true })
    public address!: string;
}

const AddressModel = getModelForClass(Address);

export { Address, AddressModel };