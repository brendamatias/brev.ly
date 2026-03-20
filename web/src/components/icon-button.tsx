import { type ComponentProps } from "react";
import type { IconType } from "./icon/icons";
import { Button } from "./button";

type IconButtonProps = ComponentProps<"button"> & {
  icon: IconType;
};

export function IconButton({ icon, ...props }: IconButtonProps) {
  return (
    <Button
      theme="secondary"
      {...props}
      icon={icon}
      size="icon"
      className="w-8 h-8"
    />
  );
}
