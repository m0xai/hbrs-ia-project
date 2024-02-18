/**
 * this model specifies the format to exchange a Bonus with the backend
 */
export class Bonus {
    constructor(
        public value: number | string,
        public year: number | string,
        public sid?: number | string,
        private _remark?: string,
        public verified?: boolean,
    ) {}

    get remark(): string {
        return this._remark;
    }

    set remark(value: string) {
        this._remark = value;
    }
}
