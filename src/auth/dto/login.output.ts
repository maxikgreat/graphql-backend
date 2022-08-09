import { Field, ObjectType } from '@nestjs/graphql';
import { ClientUser } from 'src/users/entities/client-user.entity';

@ObjectType()
export class LoginOutput {
  @Field()
  accessToken: string;

  @Field()
  refreshToken: string;

  @Field(() => ClientUser)
  user: ClientUser;
}
