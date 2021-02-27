import { Connection, getCustomRepository } from 'typeorm';
import { User } from '../entities/user.entity';
import { UserRepository } from '../repositories/user.repository';

export class UserService {
  private userRepository: UserRepository;

  constructor(connection: Connection) {
    this.userRepository = connection.getCustomRepository(UserRepository);
  }

  public async createUser(
    name: string,
    email: string
  ): Promise<boolean | User> {
    try {
      const existentUser: User = await this.userRepository.findByEmail(email);

      if (existentUser) {
        return true;
      }
      const newUser = this.userRepository.createAndSaveNewUser(name, email);
      return newUser;
    } catch (error: any) {
      console.log(__filename + error);
    }
  }

  public async findUserByEmail(email: string): Promise<User> {
    return await this.userRepository.findByEmail(email);
  }
}
