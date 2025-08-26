import { GetServerSideProps } from "next";
import { client } from "../../lib/shopifyClient";
import { useState } from "react";
import Image from "next/image";

type Product = {
  id: string;
  title: string;
  status: string;
  totalInventory: number;
  handle: string;
  description: string;
  images: [{ src: string; altText?: string | null }];
  variants: [
    {
      id: string;
      price: {
        amount: number;
        currencyCode: string;
      };
    }
  ];
  category?: string;
  priceRange: {
    minVariantPrice: {
      amount: number;
      currencyCode: string;
    };
  };
};

export default function ProductPage({ product }: { product: Product }) {
  const [loading, setLoading] = useState(false);
  console.log(product);

  const addToCart = async () => {
    try {
      setLoading(true);

      // 1️⃣ Create checkout
      const checkout = await client.checkout.create();

      // 2️⃣ Add first variant (you can build a dropdown for multiple variants later)
      const lineItems = [
        {
          variantId: product.variants[0].id,
          quantity: 1,
        },
      ];

      const updatedCheckout = await client.checkout.addLineItems(
        checkout.id,
        lineItems
      );

      // 3️⃣ Redirect user to Shopify checkout page
      window.location.href = updatedCheckout.webUrl;
    } catch (err) {
      console.error("Error adding to cart:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 text-white">
      <h1 className="text-3xl font-bold">{product.title}</h1>

      {product.images[0] && (
        <Image
          width={100}
          height={100}
          src={product.images[0].src}
          alt={product.images[0].altText || product.title}
          className="mt-4 w-full max-w-md rounded"
        />
      )}

      <p className="mt-4 text-lg font-semibold">
        {product.variants[0].price.amount}{" "}
        {product.variants[0].price.currencyCode}
      </p>

      <p className="mt-2 text-gray-200">{product.description}</p>

      <button
        onClick={addToCart}
        disabled={loading}
        className="mt-6 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition cursor-pointer"
      >
        {loading ? "Adding..." : "Buy Now"}
      </button>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const handle = context.params?.handle as string;
  const product = await client.product.fetchByHandle(handle);

  return {
    props: {
      product: JSON.parse(JSON.stringify(product)),
    },
  };
};
