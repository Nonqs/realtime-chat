import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Request } from 'express';

@Controller('user')
export class UserController {

    constructor(private userService: UserService){}

    @UseGuards(JwtAuthGuard)
    @Get()
    getUser(@Req() req: Request){
        return this.userService.getUser(req)
    }


    
}
