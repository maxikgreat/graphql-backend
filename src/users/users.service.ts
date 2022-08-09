import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserInput } from './dto/create-user.input';
import { User } from 'src/users/entities/user.entity';

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

  create(createUserInput: CreateUserInput): User {
    const user: User = {
      ...createUserInput,
      id: this.users.length + 1,
    };

    this.users.push(user);

    return user;
  }

  findAll(): User[] {
    return this.users;
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
