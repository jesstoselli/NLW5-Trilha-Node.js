import { io } from "../http";
import { ConnectionsService } from "../services/ConnectionsService";
import { UsersService } from "../services/UsersService";
import { MessagesService } from "../services/MessagesService";

io.on("connect", (socket) => {
  const connectionsService = new ConnectionsService();
  const usersService = new UsersService();
  const messagesService = new MessagesService();

  interface IParams {
    text: string;
    email: string;
  }

  socket.on("client_first_access", async ({ text, email }: IParams) => {
    const socket_id = socket.id;
    let user_id = null;

    const userExists = await usersService.findByEmail(email);

    console.log(userExists);

    if (!userExists) {
      const user = await usersService.create(email);

      await connectionsService.create({
        socket_id,
        user_id: user.id,
      });

      user_id = user.id;
    } else {
      user_id = userExists.id;

      const connection = await connectionsService.findByUserId(userExists.id);

      if (connection) {
        connection.socket_id = socket_id;

        await connectionsService.update(connection);
      } else {
        await connectionsService.create({
          socket_id,
          user_id: userExists.id,
        });
      }
    }

    await messagesService.create({
      text,
      user_id,
    });
  });
});
