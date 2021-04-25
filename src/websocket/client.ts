import { io } from "../http";
import { ConnectionsService } from "../services/ConnectionsService";
import { UsersService } from "../services/UsersService";
import { MessagesService } from "../services/MessagesService";

interface Iparams {
  text: string;
  email: string;
}

io.on("connect", (socket) => {
  const connectionsService = new ConnectionsService();
  const usersService = new UsersService();
  const messagesService = new MessagesService();

  // Salvar a conexão com o socket_id, user_id, 
  socket.on("client_first_access", async (params) => {
    const socket_id = socket.id;
    const { text, email } = params as Iparams;
    let user_id = null;

    const userExists = await usersService.findByEmail(email);

    if(!userExists) {
      const user = await usersService.create(email);

      await connectionsService.create({
        socket_id,
        // Se o id do user não existir ele cria um
        user_id: user.id,
      });

      user_id = user.id;
    } else {
      user_id = userExists.id;
      const connection = await connectionsService.findByUserId(userExists.id);

      if (!connection) {
        // Criar connexão
        await connectionsService.create({
          socket_id,
          user_id: userExists.id
        });
      } else {
        connection.socket_id = socket_id;

        await connectionsService.create(connection);
      }
    }
    // Salvar as menssagens no DB
    await messagesService.create({
      text,
      user_id
    })

  });
});