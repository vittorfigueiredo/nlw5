import { UsersRepository } from "../repositories/UsersRepository";
import { getCustomRepository, Repository } from "typeorm";
import { User } from "../entities/Users";



class UsersService {
  private usersRepository: Repository<User>

  constructor() {
    this.usersRepository = getCustomRepository(UsersRepository);
  }
  async create(email: string) {
    const usersRepository = getCustomRepository(UsersRepository);
    // Verificar se usuario existe
    const userExists = await this.usersRepository.findOne({
      email
    });

    // Se existir, retornar user
    if(userExists) {
      return userExists;
    }
    
    const user = this.usersRepository.create({
      email
    });

    
    await this.usersRepository.save(user);
    // Se não existir, salvar no DB
    return user;


  }
}

export { UsersService };