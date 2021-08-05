import { User } from '../../domain/user/models/user';
import { IUserRepository } from '../../domain/user/repositories/user-repository.interface';
import { IMapper } from '../shared/mapper.interface';
import UserEntity from './user';
import { IUser } from './user.interface';
import { UserMapper } from './user.mapper';

export class UserRepository implements IUserRepository {
  private mapper: IMapper<User, IUser>;
  constructor () {
    this.mapper = new UserMapper();
  }

  async createUser (user: User) {
    const createdUser = new UserEntity(this.mapper.mapToEntity(user));
    await createdUser.save();
  }
}
