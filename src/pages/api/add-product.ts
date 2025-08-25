import { NextApiRequest, NextApiResponse } from "next";

// pages/api/add-product.ts
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const mutation = `
    mutation {
    productCreate(product: {title: "Cool socks", productOptions: [{name: "Color", values: [{name: "Red"}, {name: "Blue"}]}, {name: "Size", values: [{name: "Small"}, {name: "Large"}]}]}) {
      product {
        id
        title
        options {
          id
          name
          position
          optionValues {
            id
            name
            hasVariants
          }
        }
      }
      userErrors {
        field
        message
      }
    }
  }
  `;

  try {
    const response = await fetch(`${process.env.SHOPIFY_ADMIN_API_URL}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Access-Token": process.env.SHOPIFY_ADMIN_API_TOKEN!,
      },
      body: JSON.stringify({ query: mutation }),
    });

    const data = await response.json();
    res.status(200).json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error creating product" });
  }
}
