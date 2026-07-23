import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className = "", type = "text", error = false, ...props }, ref) => {
    return (
      <input
        type={type}
        ref={ref}
        className={`w-full bg-slate-950 border ${
          error ? "border-red-500 focus:ring-red-500/20" : "border-slate-800 focus:border-blue-600 focus:ring-blue-600/20"
        } focus:ring-4 text-white rounded-xl px-4 py-3 text-xs sm:text-sm placeholder:text-slate-600 outline-none transition ${className}`}
        {...props}
      />
    );
  }
);

Input.displayName = "Input";
