import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserInput } from './dto/create-user.input';
import { User } from 'src/users/entities/user.entity';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UsersService {
  private users: User[] = [
    {
      id: 1,
      username: 'mouse',
      password: 'test',
    },
    {
      id: 2,
      username: 'croco',
      password: 'test2',
    },
  ];

  constructor(private readonly prisma: PrismaService) {}

  create(createUserInput: CreateUserInput): User {
    const user: User = {
      ...createUserInput,
      id: this.users.length + 1,
    };

    this.users.push(user);

    return user;
  }

  findAll(): Promise<User[]> {
    return this.prisma.user.findMany({});
  }

  findOne(name: string): User | undefined {
    return this.users.find(({ username }) => username === name);
  }

  update(name: string, data: Partial<Omit<User, 'username'>>): User {
    const foundUser = this.findOne(name);

    if (!foundUser) {
      throw new NotFoundException();
    }

    this.users = this.users.map((user) =>
      user.username === foundUser.username
        ? ({ ...foundUser, ...data } as User)
        : user,
    );

    const updatedFoundUser = this.findOne(name);

    if (!updatedFoundUser) {
      throw new NotFoundException();
    }

    return updatedFoundUser;
  }
}
