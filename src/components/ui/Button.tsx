import { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  variant?: "primary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  className?: string;
  onClick?: () => void;
  href?: string;
}

export default function Button({
  children,
  variant = "primary",
  size = "md",
  className = "",
  onClick,
  href,
}: ButtonProps) {
  const baseStyle = "inline-flex items-center justify-center gap-2 font-semibold cursor-pointer transition-all duration-200 rounded-xl no-underline";

  const sizeStyle = {
    sm: "text-sm px-4 py-2",
    md: "text-sm px-5 py-[9px]",
    lg: "text-base px-8 py-[14px] rounded-2xl",
  };

  const variantStyle = {
    primary: "bg-[#D4AF37] text-[#030a05] hover:bg-[#E5C04B] hover:shadow-[0_0_30px_rgba(212,175,55,0.4)] hover:-translate-y-px",
    outline: "border border-[rgba(255,255,255,0.15)] bg-[rgba(255,255,255,0.03)] text-[#f0f2f8] hover:border-[rgba(255,255,255,0.3)] hover:bg-[rgba(255,255,255,0.06)]",
    ghost: "bg-transparent text-[#8892a4] hover:text-[#f0f2f8] hover:bg-[rgba(255,255,255,0.03)]",
  };

  const style = `${baseStyle} ${sizeStyle[size]} ${variantStyle[variant]} ${className}`;

  if (href) {
    return (
      <a href={href} className={style}>
        {children}
      </a>
    );
  }

  return (
    <button onClick={onClick} className={style}>
      {children}
    </button>
  );
}
