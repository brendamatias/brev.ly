import { icons, type IconType } from "./icons";

type IconSize = "xs" | "sm" | "md" | "lg" | "xl";

type IconProps = {
  name: IconType;
  size?: IconSize;
  className?: string;
};

const sizes: Record<IconSize, number> = {
  xs: 12,
  sm: 16,
  md: 20,
  lg: 24,
  xl: 32,
};

export function Icon({ name, size = "md", className }: IconProps) {
  const SvgIcon = icons[name];

  if (!SvgIcon) return null;

  return (
    <SvgIcon width={sizes[size]} height={sizes[size]} className={className} />
  );
}
