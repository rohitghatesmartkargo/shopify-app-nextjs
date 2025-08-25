import type { NextApiRequest, NextApiResponse } from "next";
import { shopifyAdminFetch } from "../../lib/shopifyAdmin";
import { Order } from "@/types/Order";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const query = `
    {
  orders(first: 10, sortKey: CREATED_AT, reverse: true) {
    edges {
      node {
        id
        name              # Order number (#1001)
        createdAt         # Date
        customer {        # Customer info
          displayName
          email
        }
        totalPriceSet {   # Total
          shopMoney {
            amount
            currencyCode
          }
        }
        displayFinancialStatus   # Payment status (e.g., PAID, PENDING)
        displayFulfillmentStatus # Fulfillment status (e.g., UNFULFILLED, FULFILLED)
        lineItems(first: 100) {  # Items count + details
          edges {
            node {
              title
              quantity
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
    res.status(200).json(data.orders.edges.map((e: { node: Order }) => e.node));
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: "Unknown error" });
    }
  }
}
