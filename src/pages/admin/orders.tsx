import AdminLayout from "@/common/AdminLayout";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import DataTable from "react-data-table-component";

export default function AdminOrders() {
  const [orders, setOrders] = useState<any[]>([]);

  useEffect(() => {
    fetch("/api/orders")
      .then((res) => res.json())
      .then(setOrders);
  }, []);

  const columns = [
    {
      name: "Order",
      selector: (row: any) => row.name,
      sortable: true,
    },
    {
      name: "Date",
      selector: (row: any) => new Date(row.createdAt).toLocaleString(),
      sortable: true,
    },
    {
      name: "Customer",
      selector: (row: any) => row.customer?.displayName || "No customer",
    },
    {
      name: "Total",
      selector: (row: any) =>
        `${row.totalPriceSet.shopMoney.amount} ${row.totalPriceSet.shopMoney.currencyCode}`,
      sortable: true,
    },
    {
      name: "Payment status",
      selector: (row: any) => row.displayFinancialStatus || "Pending",
      cell: (row: any) => (
        <span className="px-2 py-1 rounded bg-yellow-100 text-yellow-700 text-xs">
          {row.displayFinancialStatus || "Pending"}
        </span>
      ),
    },
    {
      name: "Fulfillment status",
      selector: (row: any) => row.displayFulfillmentStatus || "Unfulfilled",
      cell: (row: any) => (
        <span className="px-2 py-1 rounded bg-gray-100 text-gray-700 text-xs">
          {row.displayFulfillmentStatus || "Unfulfilled"}
        </span>
      ),
    },
    {
      name: "Items",
      selector: (row: any) => `${row.lineItems.edges.length} items`,
    },
  ];

  return (
    <AdminLayout>
      <div className="max-w-screen-xl mx-auto py-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold mb-6">Admin – Orders</h1>
          <Link href={"/admin/bulk-booking"}>
            <button className="px-4 py-2 text-black bg-white rounded-md cursor-pointer hover:border hover:border-red-600  hover:text-red-600">
              Create Bulk Booking
            </button>
          </Link>
        </div>
        <DataTable
          columns={columns}
          data={orders}
          pagination
          highlightOnHover
          striped
        />
      </div>
    </AdminLayout>
  );
}
