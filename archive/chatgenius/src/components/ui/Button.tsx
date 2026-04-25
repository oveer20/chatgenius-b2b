import { ReactNode } from "react";
import clsx from "clsx";

interface ButtonProps {
  children: ReactNode;
  variant?: "primary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  className?: string;
  onClick?: () => void;
}

export default function Button({
  children,
  variant = "primary",
  size = "md",
  className,
  onClick,
}: ButtonProps) {
  return (
    <button
      onClick={onClick}
      className={clsx(
        "inline-flex items-center justify-center gap-2 font-semibold cursor-pointer transition-all duration-200",
        {
          // Variant
          "bg-[#00e5a0] text-[#030a05] hover:bg-[#00ffc2] hover:shadow-[0_0_30px_rgba(0,229,160,0.4)] hover:-translate-y-px":
            variant === "primary",
          "border border-[rgba(255,255,255,0.15)] bg-[rgba(255,255,255,0.03)] text-[#f0f2f8] hover:border-[rgba(255,255,255,0.3)] hover:bg-[rgba(255,255,255,0.06)]":
            variant === "outline",
          "bg-transparent text-[#8892a4] hover:text-[#f0f2f8] hover:bg-[rgba(255,255,255,0.03)]":
            variant === "ghost",
          // Size
          "text-sm px-4 py-2 rounded-xl":     size === "sm",
          "text-sm px-5 py-[9px] rounded-xl": size === "md",
          "text-base px-8 py-[14px] rounded-2xl": size === "lg",
        },
        className
      )}
    >
      {children}
    </button>
  );
}
