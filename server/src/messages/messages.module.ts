import { Module } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { MessagesController } from './messages.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Message, MessageSchema } from 'schemas/message.schema';
import { MessagesGateway } from './messages.gateway';
import { ChatRoom, ChatRoomSchema } from 'schemas/chatroom.schema';
import { User, UserSchema } from 'schemas/user.schema';

@Module({
  providers: [MessagesService, MessagesGateway],
  controllers: [MessagesController],
  imports: [
    MongooseModule.forFeature([{ name: Message.name, schema: MessageSchema }]),
    MongooseModule.forFeature([{ name: ChatRoom.name, schema: ChatRoomSchema }]),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),

  ],
})
export class MessagesModule {}
