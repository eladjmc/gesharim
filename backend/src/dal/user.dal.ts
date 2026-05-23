import { User, IUser } from '../models/user.model';

export async function findUserByEmail(email: string): Promise<IUser | null> {
  return User.findOne({ email });
}

export async function createUser(data: {
  email: string;
  password: string;
  name: string;
  role: string;
}): Promise<IUser> {
  return User.create(data);
}

export async function countUsers(): Promise<number> {
  return User.countDocuments();
}
