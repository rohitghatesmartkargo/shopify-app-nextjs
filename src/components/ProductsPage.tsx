// pages/products.tsx
import { GetServerSideProps } from "next";
import { shopifyFetch } from "../lib/shopify";
import Link from "next/link";

type Product = {
  id: string;
  title: string;
  description: string;
  handle: string;
  images: { edges: { node: { src: string; altText: string } }[] };
  priceRange: {
    minVariantPrice: {
      amount: string;
      currencyCode: string;
    };
  };
};

type ProductsPageProps = {
  products: Product[];
};

export default function ProductsPage({ products }: ProductsPageProps) {
  console.log(products);
  return (
    <div className="max-w-screen-xl mx-auto py-3">
      <h1 className="text-3xl font-bold mb-6">Products</h1>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {products.map((product) => (
          <Link  key={product.id} href={`/products/${product.handle}`}>
            <div
              key={product.id}
              className="border rounded-xl p-4 shadow bg-white w-64 h-96 flex flex-col"
            >
              {product.images.edges[0] && (
                <img
                  src={product.images.edges[0].node.src}
                  alt={product.images.edges[0].node.altText || product.title}
                  className="w-full h-56 object-cover rounded"
                />
              )}
              <h2 className="text-lg font-semibold mt-3 text-slate-950">
                {product.title}
              </h2>
              <p className="text-gray-600 text-sm mt-1 line-clamp-2">
                {product.description}
              </p>
              <p className="text-lg font-bold text-slate-700 mt-2">
                {product.priceRange.minVariantPrice.amount}{" "}
                {product.priceRange.minVariantPrice.currencyCode}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
