"use server"

import { db } from '@/db';
import { organizationsTable } from '@/db/schema';
import { createChurchSchema } from '@/utils/types';
import { auth } from '@clerk/nextjs/server';
import { z } from 'zod';

type CreateOrgData = z.infer<typeof createChurchSchema>;

export async function createOrganization(data: CreateOrgData) {
  try {
    const { userId } = auth();
    
    if (!userId) {
      throw new Error("Unauthorized");
    }

    const organization = await db.insert(organizationsTable).values({
      userId: userId,
      orgName: data.org_name,
      orgSite: data.org_site,
      orgEmail: data.org_email,
      orgPhone: data.org_phone,
      orgAddress: data.org_address,
      orgCity: data.org_city,
      orgState: data.org_state,
      orgZip: data.org_zip,
      orgCountry: data.org_country,
      orgDescription: data.org_description,
      orgLogo: data.org_logo,
    }).returning();

    return {
      success: true,
      message: "Organization created successfully",
      data: organization[0]
    };
  } catch (error) {
    console.error("Error creating organization:", error);
    return {
      success: false,
      message: "Failed to create organization"
    };
  }
} 