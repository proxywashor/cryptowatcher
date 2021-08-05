import { User } from '../../domain/user/models/user';
import { IMapper } from '../shared/mapper.interface';
import UserEntity from './user';
import { IUser } from './user.interface';

export class UserMapper implements IMapper<User, IUser> {
  mapToEntity (model: User): IUser {
    return new UserEntity((model.rpc, model.pk, model.network, model.userName, model.address) as Partial<IUser>);
  }
}
