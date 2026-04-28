import { ButtonHTMLAttributes, forwardRef } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "danger" | "success";
  size?: "sm" | "md" | "lg" | "icon";
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = "", variant = "primary", size = "md", ...props }, ref) => {
    let variantStyles = "";
    
    switch (variant) {
      case "primary":
        variantStyles = "bg-blue-500 text-white hover:bg-blue-600 shadow-md shadow-blue-200 active:translate-y-1 active:shadow-none";
        break;
      case "secondary":
        variantStyles = "bg-purple-500 text-white hover:bg-purple-600 shadow-md shadow-purple-200 active:translate-y-1 active:shadow-none";
        break;
      case "success":
        variantStyles = "bg-green-500 text-white hover:bg-green-600 shadow-md shadow-green-200 active:translate-y-1 active:shadow-none";
        break;
      case "danger":
        variantStyles = "bg-red-500 text-white hover:bg-red-600 shadow-md shadow-red-200 active:translate-y-1 active:shadow-none";
        break;
      case "outline":
        variantStyles = "border-[3px] border-slate-300 text-slate-700 hover:bg-slate-50 active:translate-y-1";
        break;
      case "ghost":
        variantStyles = "text-slate-600 hover:bg-slate-100";
        break;
    }

    let sizeStyles = "";
    switch (size) {
      case "sm":
        sizeStyles = "px-4 py-2 text-sm";
        break;
      case "md":
        sizeStyles = "px-6 py-3 text-lg font-medium";
        break;
      case "lg":
        sizeStyles = "px-8 py-4 text-xl font-bold rounded-2xl";
        break;
      case "icon":
        sizeStyles = "p-3";
        break;
    }

    const baseStyles = "inline-flex items-center justify-center rounded-xl transition-all duration-200 disabled:opacity-50 disabled:pointer-events-none";

    return (
      <button
        ref={ref}
        className={`${baseStyles} ${variantStyles} ${sizeStyles} ${className}`}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";
