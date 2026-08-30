import { z } from 'zod';

export const brandBookingSchema = z.object({
  brand: z.string().optional(),
  name: z
    .string()
    .trim()
    .min(2, { message: 'Name must be at least 2 characters' })
    .max(100, { message: 'Name is too long' }),
  email: z
    .string()
    .trim()
    .min(1, { message: 'Email is required' })
    .email({ message: 'Please enter a valid email address' }),
  phone: z
    .string()
    .trim()
    .regex(/^[6-9]\d{9}$/, { message: 'Please enter a valid 10-digit mobile number' }),
  address: z
    .string()
    .trim()
    .min(5, { message: 'Please enter your address / locality in Delhi NCR' })
    .max(250, { message: 'Address is too long' }),
  service: z
    .string()
    .trim()
    .min(1, { message: 'Please select a service' }),
});

export type BrandBookingFormData = z.infer<typeof brandBookingSchema>;
