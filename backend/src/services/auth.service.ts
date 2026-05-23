import * as userDal from '../dal/user.dal';
import { hashPassword, comparePassword } from '../utils/hash.util';
import { signToken } from '../utils/jwt.util';
import type { LoginDto } from '../types/dto';

export async function login(dto: LoginDto): Promise<{ token: string } | null> {
  const user = await userDal.findUserByEmail(dto.email);
  if (!user) return null;

  const valid = await comparePassword(dto.password, user.password);
  if (!valid) return null;

  const token = signToken({
    userId: (user._id as unknown as string).toString(),
    email: user.email,
    role: user.role,
  });

  return { token };
}

export async function seedAdmin(email: string, password: string, name: string): Promise<void> {
  const existing = await userDal.findUserByEmail(email);
  if (existing) return;

  const hashed = await hashPassword(password);
  await userDal.createUser({ email, password: hashed, name, role: 'admin' });
  console.log('✅ Admin user seeded');
}
