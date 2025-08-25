import type { NextApiRequest, NextApiResponse } from "next";
import { shopifyAdminFetch } from "../../lib/shopifyAdmin";
import { Product } from "@/types/Product";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const query = `
    {
      products(first: 10) {
        edges {
          node {
            id
            title
            status
            totalInventory
            images(first: 1) {
              edges {
                node {
                  src: url
                  altText
                }
              }
            }
            variants(first: 10) {
              edges {
                node {
                  id
                  price
                }
              }
            }
          }
        }
      }
    }
  `;

  try {
    const data = await shopifyAdminFetch(query);
    res
      .status(200)
      .json(data.products.edges.map((e: { node: Product }) => e.node));
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: "Unknown error" });
    }
  }
}
