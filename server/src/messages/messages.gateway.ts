import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import * as jwt from 'jsonwebtoken';
import { MessagesService } from './messages.service';
import { DecodeDto } from './dto/messages.dto';

@WebSocketGateway({
  cors: {
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST'],
    credentials: true,
  },
})
export class MessagesGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer()
  server: Server;

  private users: Map<string, string> = new Map();

  constructor(private readonly messageService: MessagesService) {}

  async handleConnection(client: Socket) {
    try {
      const cookies = client.handshake.headers.cookie;
      const token = cookies
        .split('; ')
        .find((c) => c.startsWith('token='))
        .split('=')[1];
      const decoded = jwt.decode(token) as DecodeDto;
      if (this.users.has(decoded.name)) {
        const existingSocketId = this.users.get(decoded.name);
        const existingSocket =
          this.server.sockets.sockets.get(existingSocketId);
        if (existingSocket) {
          existingSocket.disconnect();
        }
      }
      this.users.set(decoded.name, client.id);
      console.log(`User ${decoded.name} connected with socket ${client.id}`);
    } catch (error) {
      console.log('Unauthorized', error.message);
      client.disconnect();
    }
  }

  handleDisconnect(client: Socket) {
    console.log('Client disconnected', client.id);
    this.users.forEach((value, key) => {
      if (value === client.id) {
        this.users.delete(key);
      }
    });
  }

  @SubscribeMessage('message')
  async handleMessage(
    @MessageBody() data: { message: string; recipient: string; sender: string },
    @ConnectedSocket() client: Socket,
  ): Promise<void> {
    console.log('Mensaje recibido:', data);

    await this.messageService.newMessageText(
      data.message,
      data.sender,
      data.recipient,
    );

    const recipientSocketId = this.users.get(data.recipient);
    if (recipientSocketId) {
      this.server.to(recipientSocketId).emit('message', data);
    }
  }
}
