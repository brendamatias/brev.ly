import { type ComponentProps } from "react";
import { tv, type VariantProps } from "tailwind-variants";
import type { IconType } from "./icon/icons";
import { Icon } from "./icon";

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
  };

export function Button({
  theme,
  className,
  icon,
  children,
  size,
  ...props
}: ButtonProps) {
  return (
    <button className={buttonVariants({ theme, className, size })} {...props}>
      {icon && <Icon name={icon} size="sm" className="text-gray-600" />}
      {children}
    </button>
  );
}
