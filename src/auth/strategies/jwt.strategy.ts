import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { TokenPayload } from '../token-payload.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: Request) => {
          const token = request.cookies.Authentication;
          request.cookies.Authentication;
          console.log('Token from cookie:', token);
          return token;
        },
      ]),
      secretOrKey: configService.getOrThrow('JWT_SECRET'),
    });
  }
  validate(payload: TokenPayload) {
    return payload;
  }
}
