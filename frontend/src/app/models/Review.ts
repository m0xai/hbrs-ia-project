import { BaseModel } from './_core/BaseModel';
import { Employee } from './Employee';

export class Review extends BaseModel<Review> {
    public period_start?: Date;
    public period_end?: Date;
    public due?: Date;
    public status?: ReviewStatus;
    public employee?: Employee;
    public reviewer?: Employee;

    constructor(model?: Partial<Employee>) {
        super(model);
    }
}

export enum ReviewStatus {
    ACTIVATED = 'ACTIVATED',
    DISABLED = 'DISABLED',
}
