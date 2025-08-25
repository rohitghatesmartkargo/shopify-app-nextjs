// pages/admin/index.tsx

import AdminLayout from "@/common/AdminLayout";


export default function AdminDashboard() {
  return (
    <AdminLayout>
      <h1 className="text-2xl text-black font-bold">Dashboard</h1>
      <p className="mt-4 text-black">Welcome to your admin panel!</p>
    </AdminLayout>
  );
}
