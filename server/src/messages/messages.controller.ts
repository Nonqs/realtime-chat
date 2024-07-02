import { Controller, Get, Post } from '@nestjs/common';
import { MessagesService } from './messages.service';

@Controller('messages')
export class MessagesController {

    constructor(private messageService: MessagesService){}

    @Post()
    newMessage(){
        
    }

    @Get()
    getMessages(){

    }
}
