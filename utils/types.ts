import { z } from "zod";

export const createChurchSchema = z.object({
  org_name: z.string(),
  org_site: z.string(),
  org_email: z.string(),
  org_phone: z.string(),
  org_address: z.string(),
  org_city: z.string(),
  org_state: z.string(),
  org_zip: z.string(),
  org_country: z.string(),
  org_description: z.string(),
  org_logo: z.string(),
  userId: z.string(),
  currentStep: z.number().min(1).max(4),
  sustainability_data: z.object({
    transport: z.object({
      mode: z.enum(['car', 'train', 'plane', 'bus']),
      distance: z.number(),
      frequency: z.enum(['daily', 'weekly', 'monthly', 'yearly']),
      fuelType: z.enum(['petrol', 'diesel', 'electric', 'hybrid']).optional(),
    }),
    energy: z.object({
      electricity: z.number(),
      renewable_percentage: z.number().min(0).max(100),
    }),
    waste: z.object({
      recycling_rate: z.number().min(0).max(100),
      waste_volume: z.number(),
    }),
  }).optional(),
});

export const updateChurchSchema = z.object({
  church_id: z.string().optional(),
  org_name: z.string(),
  org_site: z.string(),
  org_email: z.string(),
  org_logo: z.string(),
  org_description: z.string(),
  org_address: z.string(),
  org_city: z.string(),
  org_state: z.string(),
  org_zip: z.string(),
  org_country: z.string(),
  org_phone: z.string(),
});