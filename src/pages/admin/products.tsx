import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import AdminLayout from "@/common/AdminLayout";
import { Product } from "@/types/Product";
import Image from "next/image";


export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch("/api/fetchProductsQuery")
      .then((res) => res.json())
      .then(setProducts);
  }, [loading]);

  const handleAddProduct = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/add-product", { method: "POST" });
      const data = await res.json();
      console.log(data)
      setLoading(false);
    } catch (error) {
      console.error("Error adding product", error);
      setLoading(false);
    }
  };

  const columns = [
    {
      name: "Product",
      selector: (row: Product) => row.title,
      sortable: true,
      cell: (row: Product) => (
        <div className="flex items-center space-x-3">
          {row.images && (
            <Image
              width={100}
              height={100}
              src={row.images.edges[0]?.node.src ?? ""}
              alt={row.title}
              className="w-10 h-10 object-cover rounded"
            />
          )}
          <span>{row.title}</span>
        </div>
      ),
    },
    {
      name: "Status",
      selector: (row: Product) => row.status,
      cell: (row: Product) => (
        <span
          className={`px-2 py-1 rounded text-xs font-semibold ${
            row.status === "Active"
              ? "bg-green-100 text-green-700"
              : "bg-gray-200 text-gray-600"
          }`}
        >
          {row.status}
        </span>
      ),
    },
    {
      name: "Inventory",
      selector: (row: Product) => row.totalInventory,
    },
    {
      name: "Category",
      selector: (row: Product) => row.category || "Uncategorized",
    },
  ];

  return (
    <AdminLayout>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Products</h1>
        <button
          className="bg-black text-white px-4 py-2 rounded-md"
          onClick={handleAddProduct}
        >
          {loading ? "Adding..." : "Add product"}
        </button>
      </div>
      <DataTable
        columns={columns}
        data={products}
        pagination
        highlightOnHover
        striped
      />
    </AdminLayout>
  );
}
