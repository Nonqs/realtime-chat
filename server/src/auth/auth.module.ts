import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { jwtConstants } from './constants';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'schemas/user.schema';

@Module({
  providers: [AuthService],
  controllers: [AuthController],
  imports:[
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: "20h" }
    }),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }])
  ]
})
export class AuthModule {}
