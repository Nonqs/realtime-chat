import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Response } from 'express';
import { Model } from 'mongoose';
import { User, UserDocument } from 'schemas/user.schema';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
  ) {}

  async createUser(name: string, password: string, res: Response) {
    const newUser = new this.userModel({
      name,
      password,
    });

    try {
      const savedUser = await newUser.save();
      console.log('Usuario guardado en MongoDB:', savedUser);

      const payload = { name: newUser.name };
      const token = this.jwtService.sign(payload);

      res.cookie('token', token, {
        sameSite: 'lax',
        httpOnly: true,
      });

      const data = {
        newUser,
        token,
      };

      return data;
    } catch (e) {
      console.error('Error guardando el usuario en MongoDB:', e);
      throw e;
    }
  }

  async login(name: string, res: Response) {
    try {

      let user = await this.userModel.findOne({ name, password: 'prueba123' });

      if (!user) {
        
        user = new this.userModel({ name, password: 'prueba123' });
        user = await user.save();
        console.log('Usuario guardado en MongoDB:', user);
      }

      const payload = { name: user.name };
      const token = this.jwtService.sign(payload);

      res.cookie('token', token, {
        sameSite: 'lax',
        httpOnly: true,
      });

      const data = {
        user,
        token,
      };
      
      res.status(200).json(data);
    } catch (e) {

      console.error('Error procesando el login:', e);
      res.status(500).json({ message: 'Error procesando el login' });
    }
  }
}
