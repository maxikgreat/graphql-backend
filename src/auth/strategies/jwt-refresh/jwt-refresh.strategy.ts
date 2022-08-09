import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { EnvironmentVariables } from 'src/types';
import { JwtPayloadType } from 'src/auth/strategies/jwt-payload.decorator';

export const name = 'jwt-refresh';

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(Strategy, name) {
  constructor(private configService: ConfigService<EnvironmentVariables>) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get('REFRESH_TOKEN_SECRET'),
    });
  }

  async validate({ sub, username }: JwtPayloadType) {
    return {
      id: sub,
      username,
    };
  }
}
