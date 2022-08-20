import { Query } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { JwtAccessGuard } from 'src/auth/strategies/jwt-access/jwt-access.guard';
import { Pet } from 'src/pets/dto/pet.entity';

export class PetsResolver {
  @Query(() => [Pet], { name: 'pets' })
  @UseGuards(JwtAccessGuard)
  findAll(): Pet[] {
    return [
      {
        name: 'Axe',
        id: Math.round(Math.random() * 10 * 10),
      },
    ];
  }
}
