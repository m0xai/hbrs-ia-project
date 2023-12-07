import {BaseModel} from "./_core/BaseModel";

export class Employee extends BaseModel<Employee> {
  public firstName?: string;
  public lastName?: string;
  public age?: number;
  public department?: string;

  constructor(model?: Partial<Employee>) {
    super(model);
  }
}
