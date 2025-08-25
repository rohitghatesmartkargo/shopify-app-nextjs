import ProductsPage from "@/components/ProductsPage";
import { shopifyFetch } from "@/lib/shopify";
import { Product } from "@/types/Product";
import { GetServerSideProps } from "next";
import React from "react";

interface ProductsPageProps {
  products: Product[];
}

const Products = ({ products }: ProductsPageProps) => {
  return <ProductsPage products={products} />;
};

export const getServerSideProps: GetServerSideProps = async () => {
  const query = `
    {
      products(first: 10) {
        edges {
          node {
            id
            title
            description
            handle
            images(first: 1) {
              edges {
                node {
                  src: url
                  altText
                }
              }
            }
            priceRange {
              minVariantPrice {
                amount
                currencyCode
              }
            }
          }
        }
      }
    }
  `;

  const data = await shopifyFetch(query);
  const products = data.products.edges.map(
    (edge: { node: Product }) => edge.node
  );
  return { props: { products } };
};

export default Products;
