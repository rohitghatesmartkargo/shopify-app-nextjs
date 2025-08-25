// lib/shopifyAdmin.ts
const endpoint = process.env.SHOPIFY_ADMIN_API_URL!;
const adminToken = process.env.SHOPIFY_ADMIN_API_TOKEN!;

export async function shopifyAdminFetch(query: string, variables = {}) {
  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Access-Token": adminToken,
    },
    body: JSON.stringify({ query, variables }),
  });

  const json = await response.json();
  if (json.errors) {
    console.error(json.errors);
    throw new Error("Shopify Admin API Error");
  }
  return json.data;
}
