import z from 'zod';

export const loginSchema = z.object({
    email: z.email({error: 'Invalid email address'}).min(1, 'Email is required'),
    password: z.string().min(1, 'Password is required').min(6, {error: 'Password must be at least 6 characters long'}),
})