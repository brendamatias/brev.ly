import { IconButton } from "./icon-button";
import { useState } from "react";
import { ModalDeleteLink } from "./modal-delete-link";
import toast from "react-hot-toast";

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
  const shortUrlFormatted = `${import.meta.env.VITE_APP_URL}/${shortUrl}`;

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(shortUrlFormatted);

      toast.success("Link copiado com sucesso!");
    } catch (error) {
      toast.error("Erro ao copiar o link");
    }
  };

  return (
    <>
      <div className="flex items-center justify-between gap-4 border-b border-b-gray-200 pb-4 last:border-b-0 last:pb-0">
        <div className="flex flex-col gap-1 min-w-0">
          <a
            href={shortUrl}
            target="_blank"
            className="text-md text-blue-base truncate"
          >
            {shortUrlFormatted}
          </a>

          <span className="text-gray-500 text-sm truncate">{originalUrl}</span>
        </div>

        <div className="flex items-center gap-5 flex-none">
          <span className="text-sm font-normal text-gray-500">
            {accessCount} acesso{accessCount > 1 && "s"}
          </span>

          <div className="flex items-center gap-1">
            <IconButton icon="copy" onClick={copy} />
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
