import { type ComponentProps } from "react";
import { tv, type VariantProps } from "tailwind-variants";
import type { IconType } from "./icon/icons";
import { Icon } from "./icon";

const buttonVariants = tv({
  base: "flex items-center transition-all gap-1.5 cursor-pointer disabled:opacity-50 aria-disabled:opacity-50 aria-disabled:pointer-events-none disabled:pointer-events-none",

  variants: {
    theme: {
      primary:
        "text-md h-12 justify-center rounded-lg bg-blue-base text-white hover:bg-blue-dark w-full px-5",
      secondary:
        "text-sm font-semibold h-8 rounded-sm bg-gray-200 text-gray-500 border border-transparent hover:border-blue-base px-2",
    },
  },

  defaultVariants: {
    theme: "primary",
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
  ...props
}: ButtonProps) {
  return (
    <button className={buttonVariants({ theme, className })} {...props}>
      {icon && <Icon name={icon} size="sm" className="text-gray-600" />}
      {children}
    </button>
  );
}
