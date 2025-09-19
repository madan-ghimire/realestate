export type Property = {
  id: string;
  title: string;
  description: string;
  type: string;
  price: number;
  sizeSqFt: number;
  bedrooms: number;
  bathrooms: number;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  amenities: string[];
  images: string[];
  ownerId: string;
};

const BASE_URL = "http://localhost:8080/api/properties";

/**
 * Fetch all properties
 */
export async function getProperties(): Promise<Property[]> {
  const res = await fetch(BASE_URL, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
    cache: "no-store", // disable Next.js caching
  });

  if (!res.ok) {
    throw new Error("Failed to fetch properties");
  }

  return res.json();
}

/**
 * Create a new property
 */
export async function createProperty(data: Partial<Property>) {
  const res = await fetch(BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error("Failed to create property");
  }

  return res.json();
}

/**
 * Update a property
 */
export async function updateProperty(id: string, data: Partial<Property>) {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error("Failed to update property");
  }

  return res.json();
}

/**
 * Delete a property
 */
export async function deleteProperty(id: string) {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "DELETE",
  });

  if (!res.ok) {
    throw new Error("Failed to delete property");
  }

  return res.json();
}
