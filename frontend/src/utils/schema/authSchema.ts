import { z, ZodType } from 'zod';
import { LoginType } from '../../global/types/auth/auth.types';

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const loginSchema: ZodType<LoginType> = z.object({
  email: z.string()
    .min(1, 'Email is required')
    .email('Invalid email address')
    .regex(emailRegex, 'Invalid email address'),
  password: z.string()
    .min(1, 'Password is required')
    .min(4, 'Password must have at least 4 characters')
});
