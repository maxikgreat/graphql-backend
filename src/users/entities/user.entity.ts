import { ObjectType, Field } from '@nestjs/graphql';
import { ClientUser } from 'src/users/entities/client-user.entity';

@ObjectType()
export class User extends ClientUser {
  @Field()
  password: string;
}
