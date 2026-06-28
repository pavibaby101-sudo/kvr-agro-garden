"use client";
import AdminLayout from "@/components/admin/admin-layout";

export default function AdminOrdersPage() {
  return (
    <AdminLayout title="Orders">
      <div className="p-8 rounded-2xl bg-white dark:bg-dark-100 border border-gray-200 dark:border-gray-800 text-center">
        <p className="text-lg font-medium text-gray-900 dark:text-white">Orders</p>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
          Order management coming soon. This feature will allow you to track and manage customer orders.
        </p>
      </div>
    </AdminLayout>
  );
}
