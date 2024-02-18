/**
 * this model specifies the format to exchange a salesman with the backend
 */
export class Salesman {
  constructor(
    public governmentid: number,
    public employeeid: string | number,
    public firstname: string,
    public lastname: string,
    public unit?: string,
  ) {}
}
