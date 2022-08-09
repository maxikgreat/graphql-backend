import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthService } from 'src/auth/auth.service';
import { LoginOutput } from 'src/auth/dto/login.output';
import { LoginInput } from 'src/auth/dto/login.input';
import { UseGuards } from '@nestjs/common';
import { SignUpInput } from 'src/auth/dto/sign-up.input';
import { ClientUser } from 'src/users/entities/client-user.entity';
import { AuthLocalGuard } from 'src/auth/strategies/auth-local/auth-local.guard';
import { JwtRefreshGuard } from 'src/auth/strategies/jwt-refresh/jwt-refresh.guard';
import { CurrentUser } from 'src/auth/strategies/currect-user.decorator';
import { User } from 'src/users/entities/user.entity';
import {
  JwtPayload,
  JwtPayloadType,
} from 'src/auth/strategies/jwt-payload.decorator';

@Resolver()
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @Mutation(() => LoginOutput)
  @UseGuards(AuthLocalGuard)
  login(
    @Args('authCredentials') authCredentials: LoginInput,
    @CurrentUser() user: User,
  ) {
    return this.authService.login(user);
  }

  @Mutation(() => ClientUser)
  signUp(@Args('authCredentials') authCredentials: SignUpInput) {
    return this.authService.signUp(authCredentials);
  }

  @Mutation(() => LoginOutput)
  @UseGuards(JwtRefreshGuard)
  refresh(@JwtPayload() jwtPayload: JwtPayloadType) {
    return this.authService.refresh(jwtPayload.username);
  }
}
