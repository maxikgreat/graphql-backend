import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtPayloadType } from 'src/auth/strategies/jwt-payload.decorator';
import { EnvironmentVariables } from 'src/environment.schema';

export const name = 'jwt-access';

@Injectable()
export class JwtAccessStrategy extends PassportStrategy(Strategy, name) {
  constructor(private configService: ConfigService<EnvironmentVariables>) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get('ACCESS_TOKEN_SECRET'),
    });
  }

  async validate({ sub, username }: JwtPayloadType) {
    return {
      id: sub,
      username,
    };
  }
}
