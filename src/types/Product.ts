export type Product = {
  id: string;
  title: string;
  status: string;
  totalInventory: number;
  images: {
    edges: Array<{
      node: {
        src: string;
        altText?: string | null;
      };
    }>;
  };
  variants: {
    edges: Array<{
      node: {
        id: string;
        price: string;
      };
    }>;
  };
  category?: string;
  handle: string;
  description: string;
  priceRange: {
    minVariantPrice: {
      amount: number;
      currencyCode: string;
    };
  };
};
