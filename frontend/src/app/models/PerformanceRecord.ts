/**
 * this model specifies the format to exchange a PerformanceRecord with the backend
 */
export class PerformanceRecord {
  constructor(
    public sid: number | string,
    public description: string,
    public targetValue: number,
    public actualValue: number,
    public year: number,
  ) {}
}
