"use client";
import Link from "next/link";

const orders = [
  { id: "#ORD-001", customer: "Rajesh Menon", email: "rajesh@email.com", items: 3, total: 1249, status: "Delivered", date: "2024-03-15" },
  { id: "#ORD-002", customer: "Priya Nair", email: "priya@email.com", items: 5, total: 2499, status: "Processing", date: "2024-03-14" },
  { id: "#ORD-003", customer: "Anand Krishnan", email: "anand@email.com", items: 2, total: 799, status: "Pending", date: "2024-03-13" },
  { id: "#ORD-004", customer: "Deepa Mohan", email: "deepa@email.com", items: 4, total: 1899, status: "Delivered", date: "2024-03-12" },
  { id: "#ORD-005", customer: "Suresh Kumar", email: "suresh@email.com", items: 1, total: 449, status: "Cancelled", date: "2024-03-11" },
];

export default function AdminOrdersPage() {
  return (
    <AdminShell title="Orders">
      <div className="bg-white dark:bg-dark-100 rounded-2xl border border-gray-200 dark:border-gray-800 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 dark:bg-dark border-b border-gray-200 dark:border-gray-800">
            <tr><th className="text-left p-4 font-medium text-gray-600 dark:text-gray-400">Order</th><th className="text-left p-4 font-medium text-gray-600 dark:text-gray-400">Customer</th><th className="text-left p-4 font-medium text-gray-600 dark:text-gray-400">Items</th><th className="text-left p-4 font-medium text-gray-600 dark:text-gray-400">Total</th><th className="text-left p-4 font-medium text-gray-600 dark:text-gray-400">Status</th><th className="text-left p-4 font-medium text-gray-600 dark:text-gray-400">Date</th></tr>
          </thead>
          <tbody>
            {orders.map(order => (
              <tr key={order.id} className="border-b border-gray-100 dark:border-gray-800 last:border-0 hover:bg-gray-50 dark:hover:bg-dark">
                <td className="p-4 font-medium text-gray-900 dark:text-white">{order.id}</td>
                <td className="p-4"><div className="text-gray-900 dark:text-white">{order.customer}</div><div className="text-xs text-gray-500">{order.email}</div></td>
                <td className="p-4 text-gray-600 dark:text-gray-400">{order.items}</td>
                <td className="p-4 font-medium text-gray-900 dark:text-white">₹{order.total}</td>
                <td className="p-4">
                  <span className={`px-2 py-1 rounded-full text-xs ${order.status === "Delivered" ? "bg-green-100 text-green-700" : order.status === "Processing" ? "bg-blue-100 text-blue-700" : order.status === "Pending" ? "bg-yellow-100 text-yellow-700" : "bg-red-100 text-red-700"}`}>{order.status}</span>
                </td>
                <td className="p-4 text-gray-500">{order.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AdminShell>
  );
}

function AdminShell({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-dark flex">
      <aside className="w-64 bg-white dark:bg-dark-100 border-r border-gray-200 dark:border-gray-800 p-4 hidden lg:block">
        <Link href="/admin/dashboard" className="flex items-center gap-2 mb-8">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-forest-600 to-forest-500 flex items-center justify-center">
            <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>
          </div>
          <span className="font-heading font-bold text-gray-900 dark:text-white text-sm">KVR Admin</span>
        </Link>
        <nav className="space-y-1">
          {["Dashboard","Products","Categories","Orders","Customers","Reviews","Messages","Gallery","Blogs","Settings"].map(label => (
            <Link key={label} href={`/admin/${label.toLowerCase()}`}
              className={`block px-3 py-2 rounded-xl text-sm transition-colors ${title === label ? "bg-forest-100 dark:bg-forest-900/50 text-forest-700 dark:text-forest-400 font-medium" : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-dark hover:text-forest-700"}`}>
              {label}
            </Link>
          ))}
        </nav>
      </aside>
      <div className="flex-1">
        <header className="bg-white dark:bg-dark-100 border-b border-gray-200 dark:border-gray-800 p-4"><h1 className="text-lg font-semibold text-gray-900 dark:text-white">{title}</h1></header>
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
}

export { AdminShell };
