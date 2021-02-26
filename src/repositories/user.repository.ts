import { EntityRepository, Repository } from 'typeorm';
import { User } from '../entities/user.entity';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  public createNewUser(name: string, email: string) {
    return this.create({ name, email });
  }

  public saveNewUser(user: User) {
    this.save(user);
  }

  public findByEmail(email: string) {
    return this.findOne({ email });
  }
}
