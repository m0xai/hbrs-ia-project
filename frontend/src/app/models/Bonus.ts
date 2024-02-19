/**
 * this model specifies the format to exchange a Bonus with the backend
 */
export class Bonus {
    constructor(
        public value: number | string,
        public year: number | string,
        public sid?: number | string,
        public remark?: string,
        public verified?: boolean,
    ) {}
}
