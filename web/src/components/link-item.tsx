import { IconButton } from "./icon-button";
import { useState } from "react";
import { ModalDeleteLink } from "./modal-delete-link";

type LinkItemProps = {
  id: string;
  shortUrl: string;
  originalUrl: string;
  accessCount: number;
};

export function LinkItem({
  id,
  shortUrl,
  originalUrl,
  accessCount,
}: LinkItemProps) {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  return (
    <>
      <div className="flex items-center justify-between gap-4 border-b border-b-gray-200 pb-4 last:border-b-0 last:pb-0">
        <div className="flex flex-col gap-1 min-w-0">
          <a href={shortUrl} className="text-md text-blue-base truncate">
            {shortUrl}
          </a>

          <span className="text-gray-500 text-sm truncate">{originalUrl}</span>
        </div>

        <div className="flex items-center gap-5 flex-none">
          <span className="text-sm font-normal text-gray-500">
            {accessCount} acessos
          </span>

          <div className="flex items-center gap-1">
            <IconButton icon="copy" />
            <IconButton
              icon="trash"
              onClick={() => setIsDeleteModalOpen(true)}
            />
          </div>
        </div>
      </div>

      <ModalDeleteLink
        id={id}
        open={isDeleteModalOpen}
        onOpenChange={setIsDeleteModalOpen}
      />
    </>
  );
}
