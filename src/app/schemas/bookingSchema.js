import { z } from 'zod';

export const createBookingSchema = (availableTimeSlots = []) => {
  const slots = availableTimeSlots.length > 0 ? availableTimeSlots : [''];
  
  return z.object({
    bookerName: z.string().min(2),
    bookerEmail: z.union([z.literal(''), z.string().email()]).optional(),
    eventName: z.string().min(2),
    eventDate: z.coerce.date().refine((date) => date > new Date()),
    numberOfGuests: z.coerce.number().int().min(1).max(10),
    timeSlot: z.enum(slots),
    eventLink: z.string().url()
  });
};