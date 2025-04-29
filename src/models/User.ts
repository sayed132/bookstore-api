import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import db from '../config/database';

export interface User {
  id: number;
  username: string;
  email: string;
  password: string;
  role: 'admin' | 'user';
  created_at: Date;
  updated_at: Date;
}

export const createUser = async (
  user: Omit<User, 'id' | 'created_at' | 'updated_at'>,
): Promise<Omit<User, 'password'>> => {
  const hashedPassword = await bcrypt.hash(user.password, 10);
  const userData = {
    ...user,
    password: hashedPassword,
    created_at: new Date(),
    updated_at: new Date(),
  };
  const [newUser] = await db('users').insert(userData).returning('*');
  const { password, ...userWithoutPassword } = newUser;
  return userWithoutPassword;
};

export const findUserByEmail = async (email: string): Promise<User | undefined> => {
  return db('users').where({ email }).first();
};

export const generateToken = (user: Omit<User, 'password'>): string => {
  return jwt.sign(
    { id: user.id, email: user.email, role: user.role },
    process.env.JWT_SECRET || 'your-secret-key',
    { expiresIn: '1d' },
  );
};

export const verifyToken = (token: string): any => {
  return jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');
};
