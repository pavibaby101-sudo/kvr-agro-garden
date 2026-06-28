"use client";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-screen bg-white dark:bg-dark flex items-center justify-center p-4">
      <div className="text-center">
        <h2 className="text-2xl font-heading font-bold text-gray-900 dark:text-white mb-2">
          Something went wrong
        </h2>
        <p className="text-gray-500 dark:text-gray-400 mb-8">
          An unexpected error occurred. Please try again.
        </p>
        <button
          onClick={() => reset()}
          className="px-6 py-3 rounded-xl bg-forest-700 text-white hover:bg-forest-800 transition-colors"
        >
          Try Again
        </button>
      </div>
    </div>
  );
}
