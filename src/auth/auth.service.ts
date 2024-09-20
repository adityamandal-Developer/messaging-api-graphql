import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Request, Response } from 'express';
import { User } from 'src/users/entities/user.entity';
import { TokenPayload } from './token-payload.interface';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
  ) {}
  async login(user: User, response: Response) {
    const expires = new Date();
    expires.setSeconds(
      expires.getSeconds() + this.configService.getOrThrow('JWT_EXPIRATION'),
    );
    console.log(user);
    const tokenPayload: TokenPayload = {
      _id: user._id.toHexString(),
      email: user.email,
    };
    const token = this.jwtService.sign(tokenPayload);
    response.cookie('Authentication', token, {
      httpOnly: true,
      sameSite: 'none',
      secure: true,
      expires,
    });
  }
  verifyWs(request: Request): TokenPayload {
    const cookie: string[] = request.headers.cookie.split('; ');
    const authenticationCookie = cookie.find((cookie) =>
      cookie.includes('Authentication'),
    );
    const jwt = authenticationCookie.split('Authentication')[1];
    return this.jwtService.verify(jwt);
  }
}
