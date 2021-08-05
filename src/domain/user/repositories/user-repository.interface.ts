import { User } from '../../../domain/user/models/user';

export interface IUserRepository {
    createUser (user: User): Promise<void>;
}
