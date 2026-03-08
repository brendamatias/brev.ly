import { type ComponentProps } from "react";
import { tv, type VariantProps } from "tailwind-variants";

const buttonVariants = tv({
  base: "cursor-pointer disabled:opacity-50 aria-disabled:opacity-50 aria-disabled:pointer-events-none disabled:pointer-events-none",

  variants: {
    theme: {
      primary:
        "text-md h-12 rounded-lg bg-blue-base text-white hover:bg-blue-dark w-full px-5",
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
    asChild?: boolean;
  };

export function Button({ theme, className, asChild, ...props }: ButtonProps) {
  return <button className={buttonVariants({ theme, className })} {...props} />;
}
