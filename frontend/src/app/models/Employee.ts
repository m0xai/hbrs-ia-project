import { BaseModel } from './_core/BaseModel';

export class Employee extends BaseModel<Employee> {
    public _id?: string;
    public eid?: number; // Artificial Employee id, given by company
    public firstName?: string;
    public lastName?: string;
    public title?: string;
    public department?: string;
    public supervisor?: Employee;

    constructor(model?: Partial<Employee>) {
        super(model);
    }
}
