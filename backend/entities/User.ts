export class User {
    public readonly _id: string;
    public name: string;

    constructor(_id: string, name: string) {
        this._id = _id;
        this.name = name;
    }
}