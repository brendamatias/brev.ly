import Copy from "@/assets/icons/copy.svg?react";
import DownloadSimple from "@/assets/icons/download-simple.svg?react";
import Link from "@/assets/icons/link.svg?react";
import Trash from "@/assets/icons/trash.svg?react";
import Warning from "@/assets/icons/warning.svg?react";

export const icons = {
  copy: Copy,
  downloadSimple: DownloadSimple,
  link: Link,
  trash: Trash,
  warning: Warning,
};

export type IconType = keyof typeof icons;
