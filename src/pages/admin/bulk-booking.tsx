import AdminLayout from "@/common/AdminLayout";
import { client } from "@/lib/shopifyClient";
import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";

const BulkBookingPage = () => {
  const [orders, setOrders] = useState<any[]>([]);
  const [selectedOrders, setSelectedOrders] = useState<any[]>([]);

  useEffect(() => {
    fetch("/api/orders")
      .then((res) => res.json())
      .then(setOrders);
  }, []);

  const handleCheckboxChange = (row: any) => {
    setSelectedOrders((prev) => {
      if (prev.some((order) => order.id === row.id)) {
        return prev.filter((order) => order.id !== row.id);
      } else {
        return [...prev, row];
      }
    });
  };

  const columns = [
    {
      name: "",
      cell: (row: any) => (
        <input
          type="checkbox"
          className="w-16 h-5"
          checked={selectedOrders.some((order) => order.id === row.id)}
          onChange={() => handleCheckboxChange(row)}
        />
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
      width: "100px",
    },
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
      selector: (row: any) => `${row.lineItems.edges[0].node.quantity ?? "0"} items`,
    },
  ];
console.log(selectedOrders)
  return (
    <AdminLayout>
      <div className="max-w-screen-xl mx-auto py-6">
        <h1 className="text-2xl font-bold mb-6">Bulk Booking</h1>
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
};

export default BulkBookingPage;
