import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Types } from "mongoose";


export type MessageDocument = HydratedDocument<Message>

@Schema()
export class Message {

    @Prop({ required: true })
    message: string

    @Prop({ type: Types.ObjectId, ref: 'ChatRoom', required: true })
    chatRoom: string

    @Prop({ type: Types.ObjectId, ref: 'User', required: true })
    sender: string

    @Prop({ type: Types.ObjectId, ref: 'User', required: true })
    recipient: string

    @Prop({ default: Date.now })
    timestamp: Date;

    @Prop({ required: true })
    type: string; 
}

export const MessageSchema = SchemaFactory.createForClass(Message)