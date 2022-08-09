import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class ClientUser {
  @Field(() => Int)
  id: number;

  @Field()
  username: string;
}
