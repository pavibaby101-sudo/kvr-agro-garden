"use client";
import { motion } from "framer-motion";
import { Package, ShoppingCart, Users, DollarSign, TrendingUp, Leaf } from "lucide-react";
import Link from "next/link";

const stats = [
  { label: "Total Plants", value: "245", icon: Leaf, change: "+12%", color: "from-forest-500 to-forest-700" },
  { label: "Total Orders", value: "189", icon: ShoppingCart, change: "+23%", color: "from-gold-500 to-gold-700" },
  { label: "Total Customers", value: "1,024", icon: Users, change: "+18%", color: "from-blue-500 to-blue-700" },
  { label: "Revenue", value: "₹4.2L", icon: DollarSign, change: "+32%", color: "from-green-500 to-green-700" },
];

const recentOrders = [
  { id: "#ORD-001", customer: "Rajesh Menon", items: 3, total: 1249, status: "Delivered" },
  { id: "#ORD-002", customer: "Priya Nair", items: 5, total: 2499, status: "Processing" },
  { id: "#ORD-003", customer: "Anand Krishnan", items: 2, total: 799, status: "Pending" },
  { id: "#ORD-004", customer: "Deepa Mohan", items: 4, total: 1899, status: "Delivered" },
  { id: "#ORD-005", customer: "Suresh Kumar", items: 1, total: 449, status: "Processing" },
];

const sidebarLinks = [
  { label: "Dashboard", href: "/admin/dashboard" },
  { label: "Products", href: "/admin/products" },
  { label: "Categories", href: "/admin/categories" },
  { label: "Orders", href: "/admin/orders" },
  { label: "Customers", href: "/admin/customers" },
  { label: "Reviews", href: "/admin/reviews" },
  { label: "Messages", href: "/admin/messages" },
  { label: "Gallery", href: "/admin/gallery" },
  { label: "Blogs", href: "/admin/blogs" },
  { label: "Settings", href: "/admin/settings" },
];

export default function AdminDashboard() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-dark flex">
      <aside className="w-64 bg-white dark:bg-dark-100 border-r border-gray-200 dark:border-gray-800 p-4 hidden lg:block">
        <div className="flex items-center gap-2 mb-8">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-forest-600 to-forest-500 flex items-center justify-center">
            <Leaf className="w-4 h-4 text-white" />
          </div>
          <span className="font-heading font-bold text-gray-900 dark:text-white text-sm">KVR Admin</span>
        </div>
        <nav className="space-y-1">
          {sidebarLinks.map(link => (
            <Link key={link.href} href={link.href}
              className="flex items-center px-3 py-2 rounded-xl text-sm text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-dark hover:text-forest-700 dark:hover:text-forest-400 transition-colors">
              {link.label}
            </Link>
          ))}
        </nav>
      </aside>

      <div className="flex-1">
        <header className="bg-white dark:bg-dark-100 border-b border-gray-200 dark:border-gray-800 p-4">
          <div className="flex items-center justify-between">
            <h1 className="text-lg font-semibold text-gray-900 dark:text-white">Dashboard</h1>
            <Link href="/" className="text-sm text-gray-500 hover:text-forest-700 dark:hover:text-forest-400">View Site</Link>
          </div>
        </header>

        <div className="p-6 space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map((stat, i) => (
              <motion.div key={stat.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
                className="p-6 rounded-2xl bg-white dark:bg-dark-100 border border-gray-200 dark:border-gray-800 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center`}>
                    <stat.icon className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-xs font-medium text-green-600 bg-green-100 dark:bg-green-900/30 px-2 py-1 rounded-full">{stat.change}</span>
                </div>
                <div className="text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</div>
                <div className="text-sm text-gray-500 dark:text-gray-400">{stat.label}</div>
              </motion.div>
            ))}
          </div>

          <div className="grid lg:grid-cols-2 gap-6">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
              className="p-6 rounded-2xl bg-white dark:bg-dark-100 border border-gray-200 dark:border-gray-800 shadow-sm">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Recent Orders</h2>
              <div className="space-y-3">
                {recentOrders.map(order => (
                  <div key={order.id} className="flex items-center justify-between py-2 border-b border-gray-100 dark:border-gray-800 last:border-0">
                    <div>
                      <div className="text-sm font-medium text-gray-900 dark:text-white">{order.id}</div>
                      <div className="text-xs text-gray-500">{order.customer} - {order.items} items</div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium text-gray-900 dark:text-white">₹{order.total}</div>
                      <span className={`text-xs px-2 py-0.5 rounded-full ${order.status === "Delivered" ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400" : order.status === "Processing" ? "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400" : "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400"}`}>{order.status}</span>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
              className="p-6 rounded-2xl bg-white dark:bg-dark-100 border border-gray-200 dark:border-gray-800 shadow-sm">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Quick Actions</h2>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { label: "Add Product", href: "/admin/products/new" },
                  { label: "Manage Orders", href: "/admin/orders" },
                  { label: "Add Category", href: "/admin/categories" },
                  { label: "New Blog Post", href: "/admin/blogs" },
                ].map(action => (
                  <Link key={action.label} href={action.href}
                    className="p-4 rounded-xl bg-gray-50 dark:bg-dark border border-gray-200 dark:border-gray-800 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-forest-50 hover:text-forest-700 dark:hover:bg-forest-900/30 dark:hover:text-forest-400 transition-colors text-center">
                    {action.label}
                  </Link>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
