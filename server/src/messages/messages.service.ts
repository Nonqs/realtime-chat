import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Message, MessageDocument } from 'schemas/message.schema';

@Injectable()
export class MessagesService {

    constructor(@InjectModel(Message.name) private messageModel: Model<MessageDocument>) {}

    async newMessageImage(file: Express.Multer.File, sender: string, recipient:string){
        const newMessage = new this.messageModel({
            sender,
            recipient,
            message: file.filename,
            type: "Image"
        })

        try {
            const savedMessage = await newMessage.save();
            console.log('Mensaje guardado en MongoDB:', savedMessage);
            return { message: 'Mensaje guardado correctamente', savedMessage };
        } catch (error) {
            console.error('Error guardando el mensaje en MongoDB:', error);
            throw error;
        }
    }

    async newMessageText(message: string, sender: string, recipient:string){
        const newMessage = new this.messageModel({
            sender,
            recipient,
            message,
            type: "Text"
        })

        try {
            const savedMessage = await newMessage.save();
            console.log('Mensaje guardado en MongoDB:', savedMessage);
            return { message: 'Mensaje guardado correctamente', savedMessage };
        } catch (error) {
            console.error('Error guardando el mensaje en MongoDB:', error);
            throw error;
        }
    }


}
