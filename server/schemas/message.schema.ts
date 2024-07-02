import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Types } from "mongoose";


export type MessageDocument = HydratedDocument<Message>

@Schema()
export class Message {

    @Prop({required: true})
    message: string

    @Prop({ type: Types.ObjectId, ref: 'User', required: true })
    sender: string

    @Prop({ type: Types.ObjectId, ref: 'User', required: true })
    recipent: string

    @Prop({ default: Date.now })
    timestamp: Date;
}

export const MessageSchema = SchemaFactory.createForClass(Message)