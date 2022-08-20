import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { UsersModule } from './users/users.module';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { AuthModule } from './auth/auth.module';
import { PetsModule } from 'src/pets/pets.module';
import { ConfigModule } from '@nestjs/config';
import { environmentValidationSchema } from 'src/environment.schema';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV}.env`,
      validationSchema: environmentValidationSchema,
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      sortSchema: true,
      cors: {
        origin: ['http://localhost:5173', 'http://127.0.0.1:5173'],
      },
    }),
    UsersModule,
    AuthModule,
    PetsModule,
  ],
})
export class AppModule {}
