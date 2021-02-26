import { getCustomRepository } from 'typeorm';
import { User } from '../entities/user.entity';
import { UserRepository } from '../repositories/user.repository';

export class UserService {
  private userRepository: UserRepository;

  constructor() {
    // this.userRepository = getCustomRepository(UserRepository);
  }

  public async createUser(name: string, email: string) {
    const existentUser: User = await this.userRepository.findByEmail(email);

    if (!existentUser) {
      return existentUser;
    }

    const newUser = this.userRepository.createNewUser(name, email);
    try {
      this.userRepository.saveNewUser(newUser);
      return newUser;
    } catch (error: any) {
      console.error(__filename + error);
    }
  }
}
