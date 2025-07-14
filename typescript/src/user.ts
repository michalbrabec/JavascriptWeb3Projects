export interface IUser {
    userName(): string
}

export class User implements IUser {
    private name: string

    constructor(name: string) {
        this.name = name
    }

    userName(): string {
        return this.name
    }
}