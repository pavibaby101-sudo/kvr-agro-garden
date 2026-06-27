"use client";
import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-full text-sm font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-forest-700 text-white hover:bg-forest-800 shadow-lg shadow-forest-700/25 hover:shadow-xl hover:shadow-forest-700/30 hover:-translate-y-0.5",
        secondary: "bg-gold-600 text-white hover:bg-gold-700 shadow-lg shadow-gold-600/25 hover:shadow-xl hover:shadow-gold-600/30 hover:-translate-y-0.5",
        outline: "border-2 border-forest-700 text-forest-700 hover:bg-forest-700 hover:text-white dark:border-forest-400 dark:text-forest-400 dark:hover:bg-forest-400 dark:hover:text-dark",
        ghost: "text-forest-700 hover:bg-forest-50 dark:text-forest-300 dark:hover:bg-forest-900/50",
        link: "text-forest-700 underline-offset-4 hover:underline dark:text-forest-300",
        white: "bg-white text-forest-800 hover:bg-gray-100 shadow-lg hover:shadow-xl hover:-translate-y-0.5",
        dark: "bg-dark text-white hover:bg-dark-200 shadow-lg hover:shadow-xl hover:-translate-y-0.5",
      },
      size: {
        default: "h-11 px-6 py-2",
        sm: "h-9 px-4 text-xs",
        lg: "h-13 px-8 text-base",
        xl: "h-14 px-10 text-lg",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
