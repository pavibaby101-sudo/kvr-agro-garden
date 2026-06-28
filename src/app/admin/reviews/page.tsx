"use client";
import AdminLayout from "@/components/admin/admin-layout";

export default function AdminReviewsPage() {
  return (
    <AdminLayout title="Reviews">
      <div className="p-8 rounded-2xl bg-white dark:bg-dark-100 border border-gray-200 dark:border-gray-800 text-center">
        <p className="text-gray-500 dark:text-gray-400">Reviews management coming soon.</p>
        <p className="text-sm text-gray-400 dark:text-gray-500 mt-2">
          Customer reviews will appear here once the order system is fully integrated.
        </p>
      </div>
    </AdminLayout>
  );
}
