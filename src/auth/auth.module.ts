import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from 'src/users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { JwtRefreshStrategy } from 'src/auth/strategies/jwt-refresh/jwt-refresh.strategy';
import { AuthLocalStrategy } from 'src/auth/strategies/auth-local/auth-local.strategy';
import { JwtAccessStrategy } from 'src/auth/strategies/jwt-access/jwt-access.strategy';

@Module({
  imports: [ConfigModule, PassportModule, UsersModule, JwtModule],
  providers: [
    AuthService,
    AuthResolver,
    AuthLocalStrategy,
    JwtAccessStrategy,
    JwtRefreshStrategy,
  ],
})
export class AuthModule {}
