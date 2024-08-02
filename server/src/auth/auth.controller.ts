import { Body, Controller, Post, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Response } from 'express';

@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService){}

    @Post("register")
    createUser(@Body() {name, password}: {name: string, password:string}, @Res()res: Response){
        return this.authService.createUser(name, password, res)
    }

    @Post("login")
    loginUser(@Body() {name, password}: {name: string, password: string}, @Res()res: Response){
        return this.authService.login(name, password, res)
    }
}
