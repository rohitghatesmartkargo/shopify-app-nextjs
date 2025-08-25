import type { NextApiRequest, NextApiResponse } from "next";
import { shopifyAdminFetch } from "../../lib/shopifyAdmin";

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
    res.status(200).json(data.products.edges.map((e: any) => e.node));
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
}
