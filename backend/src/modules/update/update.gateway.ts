import { OnGatewayConnection, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { UpdateService } from './update.service';
import { Server, Socket } from 'socket.io';
import { verify } from 'jsonwebtoken';
import { env } from 'src/common/config';

@WebSocketGateway({ cors: true })
export class UpdateGateway implements OnGatewayConnection {
  constructor(private readonly updateService: UpdateService) {}

  @WebSocketServer()
  private server: Server;

  async handleConnection(client: Socket) {
    let bearer_token = client.handshake.headers.authorization;

    if (!bearer_token) {
      client.disconnect(true);
    }
    bearer_token = bearer_token.split(' ')[1];

    const user: any = verify(bearer_token, env.ACCESS_TOKEN_SECRET);
    if (!user) client.disconnect();

    client.data.user_id = user.id;

    const updates = await this.updateService.getUpdates(user.id);

    for (let update of updates) {
      client.emit(update.name, JSON.parse(update.data));
      await this.updateService.deleteUpdate(update.id);
    }
  }
}
