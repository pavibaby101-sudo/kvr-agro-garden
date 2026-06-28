"use client";
import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { Loader2 } from "lucide-react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [authorized, setAuthorized] = useState(false);
  const [checking, setChecking] = useState(true);

  const isLoginPage = pathname === "/admin/login";

  useEffect(() => {
    if (isLoginPage) {
      setAuthorized(true);
      setChecking(false);
      return;
    }

    fetch("/api/auth/me")
      .then((r) => {
        if (!r.ok) throw new Error("Not authenticated");
        return r.json();
      })
      .then(() => {
        setAuthorized(true);
        setChecking(false);
      })
      .catch(() => {
        router.push("/admin/login");
      });
  }, [router, isLoginPage]);

  if (checking) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-dark flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-forest-600" />
      </div>
    );
  }

  if (!authorized && !isLoginPage) return null;

  return <>{children}</>;
}
