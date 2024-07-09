import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Request } from 'express';
import { Model } from 'mongoose';
import { Message, MessageDocument } from 'schemas/message.schema';
import { DecodeDto } from './dto/messages.dto';
import * as jwt from 'jsonwebtoken';
import { User, UserDocument } from 'schemas/user.schema';

@Injectable()
export class MessagesService {
  constructor(
    @InjectModel(Message.name) private messageModel: Model<MessageDocument>,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
  ) {}

  async newMessageImage(
    file: Express.Multer.File,
    req: Request,
  ) {

    const token = req.headers.authorization.split(' ')[1];
    const decodeToken = jwt.decode(token) as DecodeDto;

    const sender = decodeToken.name == "Tomas" ? "Tomas" : "Maya"
    const recipient = decodeToken.name == "Tomas" ? "Maya" : "Tomas"

    const newMessage = new this.messageModel({
      sender,
      recipient,
      message: file.filename,
      type: 'Image',
    });

    try {
      const savedMessage = await newMessage.save();
      console.log('Mensaje guardado en MongoDB:', savedMessage);
      return { message: 'Mensaje guardado correctamente', savedMessage };
    } catch (error) {
      console.error('Error guardando el mensaje en MongoDB:', error);
      throw error;
    }
  }

  async newMessageText(
    message: string,
    req: Request,
  ) {

    const token = req.headers.authorization.split(' ')[1];
    const decodeToken = jwt.decode(token) as DecodeDto;

    const sender = decodeToken.name == "Tomas" ? "Tomas" : "Maya"
    const recipient = decodeToken.name == "Tomas" ? "Maya" : "Tomas"

    const newMessage = new this.messageModel({
      sender,
      recipient,
      message,
      type: 'Text',
    });

    try {
      const savedMessage = await newMessage.save();
      console.log('Mensaje guardado en MongoDB:', savedMessage);
      return { message: 'Mensaje guardado correctamente', savedMessage };
    } catch (error) {
      console.error('Error guardando el mensaje en MongoDB:', error);
      throw error;
    }
  }

  async getChats(req: Request) {
    const token = req.headers.authorization.split(' ')[1];
    const decodeToken = jwt.decode(token) as DecodeDto;

    let user = await this.userModel.findOne({ name: decodeToken.name });

    if (user.name === 'Tomas') {
      return 'Maya';
    } else {
      return 'Tomas';
    }
  }

  async getMessages(req: Request) {
    const token = req.headers.authorization.split(' ')[1];
    const decodeToken = jwt.decode(token) as DecodeDto;

    let messages = await this.messageModel.find({
      $or: [
        { sender: decodeToken.name },
        { recipient: decodeToken.name }
      ]
    });

    return messages
  }
}
