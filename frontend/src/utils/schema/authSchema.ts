import { z, ZodType } from 'zod';
import { LoginType } from '../../global/types/auth/auth.types';

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const loginSchema:ZodType<LoginType> = z.object({
  email: z.string().email().regex(emailRegex, 'Invalid email address'),
  password: z.string().min(4, 'Password mush have 4 characters')
}) 