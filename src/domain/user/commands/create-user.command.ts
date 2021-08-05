import { User } from '../../../domain/user/models/user';
import { UserRepository } from '../../../db/user/user.repository';
import { IUserRepository } from '../repositories/user-repository.interface';

export class CreateUserCommand {
    private userRepository: IUserRepository;
    constructor () {
      this.userRepository = new UserRepository();
    }

    async execute (user: User): Promise<void> {
      await this.userRepository.createUser(user);
    }
}
