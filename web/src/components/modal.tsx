import * as Dialog from "@radix-ui/react-dialog";
import { XIcon } from "@phosphor-icons/react";
import { cn } from "@/utils/tailwind";
import type { ReactNode } from "react";

type ModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description?: string;
  children: ReactNode;
};

export function Modal({
  open,
  onOpenChange,
  title,
  description,
  children,
}: ModalProps) {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-gray-600/70 z-50 data-[state=open]:animate-in data-[state=closed]:animate-out" />

        <Dialog.Content
          className={cn(
            "fixed left-1/2 top-1/2 z-50 w-full max-w-md -translate-x-1/2 -translate-y-1/2 rounded-xl bg-white p-6 shadow-lg",
            "data-[state=open]:animate-in data-[state=closed]:animate-out"
          )}
        >
          <div className="flex items-center justify-between gap-4 mb-2">
            <Dialog.Title className="text-lg text-gray-600">
              {title}
            </Dialog.Title>

            <Dialog.Close asChild>
              <button className="flex h-8 w-8 items-center justify-center rounded-md text-gray-500 hover:bg-gray-200 cursor-pointer">
                <XIcon size={16} />
              </button>
            </Dialog.Close>
          </div>

          {description && (
            <Dialog.Description className="text-gray-500 text-md font-normal">
              {description}
            </Dialog.Description>
          )}

          <div className="mt-6">{children}</div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
