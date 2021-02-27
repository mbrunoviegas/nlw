import { EntityRepository, AbstractRepository } from 'typeorm';
import { User } from '../entities/user.entity';

@EntityRepository(User)
export class UserRepository extends AbstractRepository<User> {
  public async createAndSaveNewUser(
    name: string,
    email: string
  ): Promise<User> {
    const newUser = this.manager.create(User, { name, email });
    await this.manager.save(newUser);
    return newUser;
  }

  public async saveNewUser(user: User) {
    await this.manager.save(user);
  }

  public async findByEmail(email: string): Promise<User> {
    return await this.manager.findOne(User, { email });
  }
}
