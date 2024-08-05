import { Body, Controller, Get, Param, Post, Req, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import * as path from 'path';
import { Request } from 'express';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('messages')
export class MessagesController {

    constructor(private messageService: MessagesService){}

    // @UseGuards(JwtAuthGuard)
    // @Post()
    // newMessage(@Body() {message}: {message: string},  @Req() req: Request){
    //     return this.messageService.newMessageText(message, req)
    // }

    @UseGuards(JwtAuthGuard)
    @Post()
    newChatRoom(@Body("recipient") recipient: string,@Req() req: Request){
        return this.messageService.newChatRoom(recipient, req)
    }

    @UseGuards(JwtAuthGuard)
    @Get("chats")
    getChats(@Req() req: Request){
        return this.messageService.getChats(req)
    }

    @UseGuards(JwtAuthGuard)
    @Get(":chat")
    getMessages(@Req() req: Request, @Param("chat") chat:string){
        return this.messageService.getMessages(req, chat)
    }
}
