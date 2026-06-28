import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-white dark:bg-dark flex items-center justify-center p-4">
      <div className="text-center">
        <h1 className="text-6xl font-heading font-bold text-forest-700 dark:text-forest-400 mb-4">404</h1>
        <h2 className="text-2xl font-heading font-bold text-gray-900 dark:text-white mb-2">Page Not Found</h2>
        <p className="text-gray-500 dark:text-gray-400 mb-8">
          The page you are looking for does not exist or has been moved.
        </p>
        <Link href="/">
          <Button size="lg">Go Back Home</Button>
        </Link>
      </div>
    </div>
  );
}
