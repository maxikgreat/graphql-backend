import { Injectable } from '@nestjs/common';
import { CreateUserInput } from './dto/create-user.input';
import { User } from 'src/users/entities/user.entity';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  get user() {
    return this.prisma.user;
  }

  create(createUserInput: CreateUserInput): Promise<User> {
    return this.user.create({
      data: createUserInput,
    });
  }

  findAll(): Promise<User[]> {
    return this.user.findMany({});
  }

  findOne(username: string): Promise<User | null> {
    return this.user.findUnique({
      where: {
        username,
      },
    });
  }

  update(
    username: string,
    data: Partial<Omit<User, 'username'>>,
  ): Promise<User> {
    return this.user.update({
      where: {
        username,
      },
      data,
    });
  }
}
