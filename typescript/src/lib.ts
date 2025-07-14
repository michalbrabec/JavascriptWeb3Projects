import { IUser } from "./user"

export function log(user: IUser): string {
    console.log(user.userName())
    return user.userName()
}

export default log