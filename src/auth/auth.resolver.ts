import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AuthService } from 'src/auth/auth.service';
import { SignInOutput } from 'src/auth/dto/sign-in.output';
import { SignInInput } from 'src/auth/dto/sign-in.input';
import { UseGuards } from '@nestjs/common';
import { SignUpInput } from 'src/auth/dto/sign-up.input';
import { ClientUser } from 'src/users/entities/client-user.entity';
import { AuthLocalGuard } from 'src/auth/strategies/auth-local/auth-local.guard';
import { JwtRefreshGuard } from 'src/auth/strategies/jwt-refresh/jwt-refresh.guard';
import { CurrentUser } from 'src/auth/strategies/currect-user.decorator';
import { User } from 'src/users/entities/user.entity';
import { JwtPayload, JwtUser } from 'src/auth/strategies/jwt-payload.decorator';
import { JwtAccessGuard } from 'src/auth/strategies/jwt-access/jwt-access.guard';

@Resolver()
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @Mutation(() => SignInOutput)
  @UseGuards(AuthLocalGuard)
  signIn(
    @Args('authCredentials') authCredentials: SignInInput,
    @CurrentUser() user: User,
  ) {
    return this.authService.login(user);
  }

  @Mutation(() => ClientUser)
  signUp(@Args('authCredentials') authCredentials: SignUpInput) {
    return this.authService.signUp(authCredentials);
  }

  @Mutation(() => SignInOutput)
  @UseGuards(JwtRefreshGuard)
  refresh(@JwtPayload() jwtUser: JwtUser) {
    return this.authService.refresh(jwtUser.username);
  }

  @Query(() => ClientUser)
  @UseGuards(JwtAccessGuard)
  checkToken(@JwtPayload() jwtUser: JwtUser): JwtUser {
    return jwtUser;
  }
}
