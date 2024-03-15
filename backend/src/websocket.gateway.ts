import { SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway()
export class WebSocket {
  @WebSocketServer() server: Server;

  @SubscribeMessage('message')
  handleMessage(client: any, payload: any): void {
    this.server.emit('message', payload); // Broadcast message to all connected clients
  }
}