import { UsersRepository } from "../repositories/UsersRepository";
import { getCustomRepository } from "typeorm";



class UsersService {
  async create(email: string) {
    const usersRepository = getCustomRepository(UsersRepository);
    // Verificar se usuario existe
    const userExists = await usersRepository.findOne({
      email
    });

    // Se existir, retornar user
    if(userExists) {
      return userExists;
    }
    
    const user = usersRepository.create({
      email
    });

    
    await usersRepository.save(user);
    // Se não existir, salvar no DB
    return user;


  }
}

export { UsersService };