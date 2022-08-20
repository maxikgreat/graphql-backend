import { Resolver, Query, Args } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { NotFoundException, UseGuards } from '@nestjs/common';
import { ClientUser } from 'src/users/entities/client-user.entity';
import { JwtAccessGuard } from 'src/auth/strategies/jwt-access/jwt-access.guard';

@Resolver(() => ClientUser)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Query(() => [ClientUser], { name: 'users' })
  findAll() {
    return this.usersService.findAll();
  }

  @Query(() => ClientUser, { name: 'user' })
  @UseGuards(JwtAccessGuard)
  async findOne(@Args('username') username: string) {
    const user = await this.usersService.findOne(username);

    if (!user) {
      throw new NotFoundException();
    }

    return user;
  }
}
