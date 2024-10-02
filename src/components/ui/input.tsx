"use client";

import * as React from "react";

import { cn } from "@/lib/utils";
import { Eye, EyeOff } from "lucide-react";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    const [showPassword, setShowPassword] = React.useState(false);
    const isPassword = type === "password";

    return (
      <div className="flex items-center">
        <input
          type={isPassword && showPassword ? "text" : type}
          className={cn(
            `flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 ${
              isPassword && "pr-12"
            } text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50`,
            className
          )}
          ref={ref}
          {...props}
        />
        {isPassword && (
          <button
            className="size-6 cursor-pointer -ml-9"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <Eye /> : <EyeOff />}
          </button>
        )}
      </div>
    );
  }
);
Input.displayName = "Input";

export { Input };
