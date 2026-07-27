"use server";

import { db } from "@/lib/db";
import { initialProperties, getAllProperties } from "@/data/properties";

export interface PropertyFilterParams {
  query?: string;
  purpose?: "BUY" | "RENT";
  type?: "RESIDENTIAL" | "COMMERCIAL" | "PLOT";
  locality?: string;
  bhk?: number[];
  minPrice?: number;
  maxPrice?: number;
}

export async function getProperties(params?: PropertyFilterParams) {
  try {
    const whereClause: any = {};

    if (params?.purpose) {
      whereClause.purpose = params.purpose;
    }
    if (params?.type) {
      whereClause.type = params.type;
    }
    if (params?.locality) {
      whereClause.locality = { contains: params.locality, mode: "insensitive" };
    }
    if (params?.maxPrice) {
      whereClause.price = { lte: params.maxPrice };
    }
    if (params?.bhk && params.bhk.length > 0) {
      whereClause.bhk = { in: params.bhk };
    }

    const dbProperties = await db.property.findMany({
      where: whereClause,
      include: {
        images: true,
        city: true,
        areaLocality: true,
        agent: true,
        builder: true,
      },
      take: 150,
    });

    if (dbProperties && dbProperties.length > 0) {
      return dbProperties.map((p) => ({
        ...p,
        name: p.title,
        locality: p.areaLocality?.name || p.address,
        city: p.city?.name || "Ahmedabad",
        priceString: p.price >= 10000000 ? `₹ ${(p.price / 10000000).toFixed(2)} Cr` : `₹ ${(p.price / 100000).toFixed(2)} Lakh`,
        images: p.images.map((img) => img.url),
      }));
    }
  } catch (error) {
    console.warn("Prisma query failed or database empty, using local fallback dataset:", error);
  }

  // Fallback to in-memory dataset including user posted properties
  const allProps = typeof window !== "undefined" ? getAllProperties() : initialProperties;
  let filtered = allProps.map((p) => ({
    ...p,
    purpose: (p.purpose || "BUY").toUpperCase() as "BUY" | "RENT",
    type: (p.type || "RESIDENTIAL").toUpperCase() as "RESIDENTIAL" | "COMMERCIAL" | "PLOT",
    category: p.subType || "Flat/Apartment",
  }));

  if (params?.purpose) {
    filtered = filtered.filter((p) => p.purpose === params.purpose);
  }
  if (params?.type) {
    filtered = filtered.filter((p) => p.type === params.type);
  }
  if (params?.locality) {
    const locLower = params.locality.toLowerCase();
    filtered = filtered.filter(
      (p) =>
        p.locality.toLowerCase().includes(locLower) ||
        p.city.toLowerCase().includes(locLower)
    );
  }
  if (params?.maxPrice) {
    filtered = filtered.filter((p) => p.price <= params.maxPrice!);
  }
  if (params?.bhk && params.bhk.length > 0) {
    filtered = filtered.filter((p) => p.bhk && params.bhk!.includes(p.bhk));
  }
  if (params?.query) {
    const qLower = params.query.toLowerCase();
    filtered = filtered.filter(
      (p) =>
        p.name.toLowerCase().includes(qLower) ||
        p.locality.toLowerCase().includes(qLower) ||
        p.city.toLowerCase().includes(qLower)
    );
  }

  return filtered;
}
