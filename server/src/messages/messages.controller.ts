import { Body, Controller, Get, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import * as path from 'path';

@Controller('messages')
export class MessagesController {

    constructor(private messageService: MessagesService){}

    @Post()
    newMessage(@Body() {message, sender, recipient}: {message: string, sender: string, recipient: string}){
        return this.messageService.newMessageText(message, sender, recipient)
    }

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
    newMessageImage(@UploadedFile() file: Express.Multer.File, @Body() {sender, recipient}: {sender: string, recipient: string}){
        return this.messageService.newMessageImage(file, sender, recipient)
    }

    @Get()
    getMessages(){

    }
}
