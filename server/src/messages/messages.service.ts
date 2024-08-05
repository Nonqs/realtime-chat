import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Request } from 'express';
import { Model } from 'mongoose';
import { Message, MessageDocument } from 'schemas/message.schema';
import { DecodeDto } from './dto/messages.dto';
import * as jwt from 'jsonwebtoken';
import { ChatRoom, ChatRoomDocument } from 'schemas/chatroom.schema';
import { User, UserDocument } from 'schemas/user.schema';

@Injectable()
export class MessagesService {
  constructor(
    @InjectModel(Message.name) private messageModel: Model<MessageDocument>,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @InjectModel(ChatRoom.name) private chatModel: Model<ChatRoomDocument>,
  ) {}

  async newChatRoom(recipient: string, req: Request) {
    const token = req.headers.authorization.split(' ')[1];
    const decodeToken = jwt.decode(token) as DecodeDto;

    if (!decodeToken || !decodeToken.name) {
      throw new Error('Invalid token');
    }

    const newChat = new this.chatModel({
      sender: decodeToken.name,
      recipient,
      timestamp: new Date(),
    });

    const saveChatRoom = await newChat.save();

    const user = await this.userModel.findOne({ name: recipient }, 'name');

    if (!user) {
      throw new Error('Recipient not found');
    }

    return user;
  }

  async newMessage(message: string, sender: string, recipient: string, type: string) {

    const chatRoom = await this.chatModel.findOne(
      {
        $or: [
          { sender, recipient },
          { sender: recipient, recipient: sender },
        ],
      },
      '_id',
    );


    const newMessage = new this.messageModel({
      
      chatRoom: chatRoom._id,
      sender,
      recipient,
      message,
      type,
    });

    try {
      const savedMessage = await newMessage.save();
      console.log('Mensaje guardado en MongoDB:', savedMessage);
      return savedMessage
    } catch (error) {
      console.error('Error guardando el mensaje en MongoDB:', error);
      throw error;
    }
  }

  async getChats(req: Request) {
    const token = req.headers.authorization.split(' ')[1];
    const decodeToken = jwt.decode(token) as DecodeDto;

    const userChats = await this.chatModel.find({
      $or: [{ sender: decodeToken.name }, { recipient: decodeToken.name }],
    });

    const otherUsers = userChats.map((chat) => {
      if (chat.sender === decodeToken.name) {
        return chat.recipient;
      } else {
        return chat.sender;
      }
    });

    return otherUsers;
  }

  async getMessages(req: Request, chat: string) {
    const token = req.headers.authorization.split(' ')[1];
    const decodeToken = jwt.decode(token) as DecodeDto;

    if (!decodeToken || !decodeToken.name) {
      throw new Error('Invalid token');
    }

    const chatRoom = await this.chatModel.findOne({
      $or: [
        { sender: decodeToken.name, recipient: chat },
        { sender: chat, recipient: decodeToken.name },
      ],
    }, "_id");

    if (!chatRoom) {
      throw new Error('Chat room not found');
    }

    const messages = await this.messageModel.find({
      chatRoom: chatRoom._id,
    });

    return messages;
  }
}
