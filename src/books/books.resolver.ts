import { Resolver, Query } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { JwtAccessGuard } from 'src/auth/strategies/jwt-access/jwt-access.guard';

@Resolver(() => String)
export class BooksResolver {
  @Query(() => String, { name: 'books' })
  @UseGuards(JwtAccessGuard)
  findAll() {
    return 'hello';
  }
}
