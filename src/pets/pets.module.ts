import { Module } from '@nestjs/common';
import { PetsResolver } from './pets.resolver';

@Module({
  providers: [PetsResolver],
})
export class PetsModule {}
