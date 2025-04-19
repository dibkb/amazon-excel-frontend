import React from "react";
import { X, AlertCircle } from "lucide-react";

export function AlertDialog({
  onClose,
  message,
  asin,
}: {
  onClose: () => void;
  asin: string;
  message: string;
}) {
  return (
    <>
      {
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Overlay */}
          <div
            className="fixed inset-0 bg-black/40 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Modal */}
          <div className="relative w-full max-w-md rounded-lg border bg-background p-6 shadow-lg">
            <button
              className="absolute right-4 top-4 rounded-sm opacity-70 hover:opacity-100 focus:outline-none"
              onClick={onClose}
            >
              <X className="h-4 w-4" />
              <span className="sr-only">Close</span>
            </button>
            <>
              <div className="flex items-center gap-2 text-red-500">
                <AlertCircle className="h-5 w-5 " />
                <h2 className="text-lg font-semibold">
                  Failed to fetch product {asin}
                </h2>
              </div>
              <p className="mt-2 text-sm text-muted-foreground font-semibold">
                There was a problem fetching the product. Please try again later
                or try a new product
                <br />
                <br />
                {message}
              </p>
            </>

            <div className="mt-6 flex justify-end gap-2">
              <button
                className="inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium bg-neutral-800 text-white hover:bg-neutral-700 dark:bg-white dark:text-black dark:hover:bg-neutral-200 focus:outline-none"
                onClick={onClose}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      }
    </>
  );
}
