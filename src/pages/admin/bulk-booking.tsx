import AdminLayout from "@/common/AdminLayout";
import { Order } from "@/types/Order";
import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";

const BulkBookingPage = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [selectedOrders, setSelectedOrders] = useState<Order[]>([]);

  useEffect(() => {
    fetch("/api/orders")
      .then((res) => res.json())
      .then(setOrders);
  }, []);

  const handleCheckboxChange = (row: Order) => {
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
      cell: (row: Order) => (
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
      selector: (row: Order) => row.name,
      sortable: true,
    },
    {
      name: "Date",
      selector: (row: Order) => new Date(row.createdAt).toLocaleString(),
      sortable: true,
    },
    {
      name: "Customer",
      selector: (row: Order) => row.customer?.displayName || "No customer",
    },
    {
      name: "Total",
      selector: (row: Order) =>
        `${row.totalPriceSet.shopMoney.amount} ${row.totalPriceSet.shopMoney.currencyCode}`,
      sortable: true,
    },
    {
      name: "Payment status",
      selector: (row: Order) => row.displayFinancialStatus || "Pending",
      cell: (row: Order) => (
        <span className="px-2 py-1 rounded bg-yellow-100 text-yellow-700 text-xs">
          {row.displayFinancialStatus || "Pending"}
        </span>
      ),
    },
    {
      name: "Fulfillment status",
      selector: (row: Order) => row.displayFulfillmentStatus || "Unfulfilled",
      cell: (row: Order) => (
        <span className="px-2 py-1 rounded bg-gray-100 text-gray-700 text-xs">
          {row.displayFulfillmentStatus || "Unfulfilled"}
        </span>
      ),
    },
    {
      name: "Items",
      selector: (row: Order) =>
        `${row.lineItems.edges[0].node.quantity ?? "0"} items`,
    },
  ];
  console.log(selectedOrders);
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
