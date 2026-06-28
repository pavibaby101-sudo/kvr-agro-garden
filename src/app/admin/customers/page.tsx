"use client";
import AdminLayout from "@/components/admin/admin-layout";

export default function AdminCustomersPage() {
  return (
    <AdminLayout title="Customers">
      <div className="p-8 rounded-2xl bg-white dark:bg-dark-100 border border-gray-200 dark:border-gray-800 text-center">
        <p className="text-gray-500 dark:text-gray-400">Customer management coming soon.</p>
        <p className="text-sm text-gray-400 dark:text-gray-500 mt-2">
          Customer data will appear here once the order system is fully integrated.
        </p>
      </div>
    </AdminLayout>
  );
}
