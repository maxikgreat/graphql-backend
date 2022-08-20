import { Field, ObjectType } from '@nestjs/graphql';
import { ClientUser } from 'src/users/entities/client-user.entity';

@ObjectType()
export class SignInOutput {
  @Field()
  accessToken: string;

  @Field()
  refreshToken: string;

  @Field(() => ClientUser)
  user: ClientUser;
}
