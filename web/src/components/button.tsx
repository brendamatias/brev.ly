import { type ComponentProps } from "react";
import { tv, type VariantProps } from "tailwind-variants";
import type { IconType } from "./icon/icons";
import { Icon } from "./icon";
import { motion } from "framer-motion";
import { SpinnerIcon } from "@phosphor-icons/react";

const buttonVariants = tv({
  base: "flex items-center transition-all gap-1.5 cursor-pointer disabled:opacity-50 aria-disabled:opacity-50 aria-disabled:pointer-events-none disabled:pointer-events-none",

  variants: {
    theme: {
      primary:
        "justify-center bg-blue-base text-white hover:bg-blue-dark w-full",
      secondary:
        "font-semibold bg-gray-200 text-gray-500 border border-transparent hover:border-blue-base",
    },

    size: {
      md: "h-12 px-5 text-md rounded-lg",
      sm: "h-8 px-2 text-sm rounded-sm",
      icon: "h-10 w-10 rounded-md p-0 flex items-center justify-center",
    },
  },

  defaultVariants: {
    theme: "primary",
    size: "md",
  },
});

type ButtonProps = ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    icon?: IconType;
    loading?: boolean;
  };

export function Button({
  theme,
  className,
  icon,
  children,
  size,
  disabled,
  loading,
  ...props
}: ButtonProps) {
  return (
    <button
      className={buttonVariants({ theme, className, size })}
      disabled={disabled || loading}
      {...props}
    >
      {loading && (
        <motion.div
          animate={{ rotate: 360 }}
          transition={{
            repeat: Infinity,
            duration: 0.9,
            ease: "linear",
          }}
        >
          <SpinnerIcon size={18} />
        </motion.div>
      )}
      {icon && <Icon name={icon} size="sm" className="text-gray-600" />}
      {children}
    </button>
  );
}
