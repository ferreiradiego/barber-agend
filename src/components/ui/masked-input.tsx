"use client";

import * as React from "react";
import InputMask from "react-input-mask";

import { cn } from "@/lib/utils";

const MASK_TYPE = {
  phone: "(99) 9 9999-9999",
  zipCode: "99999-999",
  date: "99/99/9999",
  time: "99:99",
  creditCard: "9999 9999 9999 9999",
} as const;

export interface InputMaskProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  mask: keyof typeof MASK_TYPE;
}

const MaskedInput = React.forwardRef<HTMLInputElement, InputMaskProps>(
  ({ className, type, mask, ...props }, ref) => {
    return (
      <InputMask
        type={type}
        mask={MASK_TYPE[mask]}
        maskChar=" "
        className={cn(
          "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        inputRef={ref}
        {...props}
      />
    );
  }
);
MaskedInput.displayName = "MaskedInput";

export { MaskedInput };
