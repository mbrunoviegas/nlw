import { EntityRepository, AbstractRepository } from 'typeorm';
import { User } from '../entities/user.entity';

@EntityRepository(User)
export class UserRepository extends AbstractRepository<User> {
  public createNewUser(name: string, email: string): User {
    return this.manager.create(User, { name, email });
  }

  public saveNewUser(user: User) {
    this.manager.save(user);
  }

  public findByEmail(email: string): Promise<User> {
    return this.manager.findOne(User, { email });
  }
}
