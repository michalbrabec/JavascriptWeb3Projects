import log from './lib.js'
import { IUser, User } from './user.js'

const user: IUser = new User("john")

log(user)