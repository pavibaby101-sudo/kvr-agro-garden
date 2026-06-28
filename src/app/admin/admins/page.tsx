"use client";
import AdminLayout from "@/components/admin/admin-layout";

export default function AdminAdminsPage() {
  return (
    <AdminLayout title="Admins">
      <div className="p-8 text-center text-gray-500 dark:text-gray-400">
        <p className="text-lg font-medium">Admin Management</p>
        <p className="text-sm mt-2">Admin user management coming soon. Currently, admins are managed via the JSON database file.</p>
      </div>
    </AdminLayout>
  );
}
