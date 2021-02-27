import { getCustomRepository } from 'typeorm';
import { User } from '../entities/user.entity';
import { UserRepository } from '../repositories/user.repository';

export class UserService {
  private userRepository: UserRepository;

  createUser = async (name: string, email: string): Promise<boolean | User> => {
    this.userRepository = getCustomRepository(UserRepository);
    const existentUser: User = await this.userRepository.findByEmail(email);

    if (existentUser) {
      return existentUser instanceof User;
    }

    const newUser = this.userRepository.createNewUser(name, email);
    try {
      this.userRepository.saveNewUser(newUser);
      return newUser;
    } catch (error: any) {
      console.log(__filename + error);
    }
  };
}
