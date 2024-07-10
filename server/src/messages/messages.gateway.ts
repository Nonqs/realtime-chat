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
import { MessagesService } from './messages.service';
import { MessageDataDto } from './dto/messages.dto';

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

  constructor(private readonly messageService: MessagesService) {}

  handleConnection(client: Socket) {
    console.log('New client connected', client.id);
  }

  handleDisconnect(client: Socket) {
    console.log('Client disconnected', client.id);
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

    this.server.emit('message', data);
  }
}
