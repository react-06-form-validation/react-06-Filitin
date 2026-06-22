import { z } from 'zod';

export const createBookingSchema = (availableTimeSlots = []) => {
  const slots = availableTimeSlots.length > 0 ? availableTimeSlots : [''];

  return z.object({
    bookerName: z.string().min(2, { message: 'Booker name must be at least 2 characters long' }),
    bookerEmail: z.union([
      z.literal(''),
      z.string().email({ message: 'Invalid email address' })
    ]).optional(),
    eventName: z.string().min(2, { message: 'Event name must be at least 2 characters long' }),
    eventDate: z.coerce.date({ invalid_type_error: 'Invalid input' })
      .refine((date) => date > new Date(), { message: 'Event date must be in the future' }),
    numberOfGuests: z.coerce.number()
      .int()
      .min(1)
      .max(10, { message: 'Number of Guests must be less than or equal to 10' }),
    timeSlot: z.enum(slots, {
      error: () => 'Selected time slot is unavailable'
    }),
    eventLink: z.string().url({ message: 'Invalid URL. Please enter a valid event link' })
  });
};