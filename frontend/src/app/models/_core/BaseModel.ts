import IResource from './IModel';

export abstract class BaseModel<T> implements IResource {
    public id?: number;
    public createdAt?: Date;
    public updatedAt?: Date;

    constructor(model?: Partial<T>) {
        if (model) {
            Object.assign(this, model);
        }
    }

    static isEqual(objA: any, objB: any): boolean {
        const keysA = Object.keys(objA);
        const keysB = Object.keys(objB);

        // Check if the number of keys is the same
        if (keysA.length !== keysB.length) {
            return false;
        }

        // Check if all keys in objA exist in objB and have the same values
        for (const key of keysA) {
            if (!keysB.includes(key) || objA[key] !== objB[key]) {
                return false;
            }
        }

        return true;
    }

    getId(): number {
        return this.id!;
    }

    public toJson(): any {
        return JSON.parse(JSON.stringify(this));
    }

    public isValid(): boolean {
        for (const member in this) {
            if (this[member] == null) {
                return false;
            }
        }
        return true;
    }
}
