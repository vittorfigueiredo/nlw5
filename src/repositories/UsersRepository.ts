import { Repository, EntityRepository } from "typeorm";
import { User } from "../entities/Users";




@EntityRepository(User)
class UsersRepository extends Repository<User> {

}

export { UsersRepository };