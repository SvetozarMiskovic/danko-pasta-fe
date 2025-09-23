import z from 'zod';

export const registerSchema = z.object({
    email: z.email({error: 'Invalid email address'}).min(1, 'Email is required'),
    name: z.string(),
    password: z.string().min(6, {error: 'Password must be at least 6 characters long'}),
    confirmPassword: z.string().min(1, 'Confirm password is required'),
}).refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
});