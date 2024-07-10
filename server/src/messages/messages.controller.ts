import { Body, Controller, Get, Post, Req, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
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
    @Post("image")
    @UseInterceptors(FileInterceptor('file', {
        storage: diskStorage({
            destination: './uploads',
            filename: (req, file, cb) => {
                const filename = `${Date.now()}${path.extname(file.originalname)}`
                cb(null, filename);
            },
        }),
    }))
    newMessageImage(@UploadedFile() file: Express.Multer.File, @Req() req: Request){
        return this.messageService.newMessageImage(file, req)
    }

    @UseGuards(JwtAuthGuard)
    @Get("chats")
    getChats(@Req() req: Request){
        return this.messageService.getChats(req)
    }

    @UseGuards(JwtAuthGuard)
    @Get()
    getMessages(@Req() req: Request){
        return this.messageService.getMessages(req)
    }
}
