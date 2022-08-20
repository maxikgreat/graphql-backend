import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class Pet {
  @Field(() => Int)
  id: number;

  @Field()
  name: string;
}
