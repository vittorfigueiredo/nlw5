import { getCustomRepository, Repository } from "typeorm";
import { Message } from "../entities/Message";
import { MessagesRepository } from "../repositories/MessagesRepository";

interface IMessageCreate {
  // A ? indica que ele é um atributo opcional
  admin_id?: string;
  text: string;
  user_id: string;
}

class MessagesService {
  // Private significa que o atributo criado vai estar disponivel somente para a classe
  // que estivermos declarando ele (MessagesService)
  private messagesRepository: Repository<Message>;

  constructor() {
    this.messagesRepository = getCustomRepository(MessagesRepository);
  }

  async create({ admin_id, text, user_id }: IMessageCreate) {
    const messagesRepository = getCustomRepository(MessagesRepository);

    const message = messagesRepository.create({
      admin_id,
      text,
      user_id,
    });

    await this.messagesRepository.save(message);

    return message;
  }

  // Função para retornar todas as menssagens do usuario
  async listByUser(user_id: string) {
    const messagesRepository = getCustomRepository(MessagesRepository);

    // Para fazer a busca
    const list = await this.messagesRepository.find({
      where: { user_id },  // Paasar o where dentro de um objeto
      relations: ["user"], // Traz as informações dos usuarios tmb (ter cuidado)
    });

    return list;
  }
}

export { MessagesService };