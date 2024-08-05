import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type ChatRoomDocument = HydratedDocument<ChatRoom>;

@Schema()
export class ChatRoom {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  sender: string;

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  recipient: string;

  @Prop({ default: Date.now })
  timestamp: Date;
}

export const ChatRoomSchema = SchemaFactory.createForClass(ChatRoom);
