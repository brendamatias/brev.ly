import { useDeleteLink } from "@/services";
import { Modal } from "./modal";
import { Button } from "./button";

type ModalDeleteLinkProps = {
  id: string;
  open: boolean;
  onOpenChange: (value: boolean) => void;
};

export function ModalDeleteLink({
  id,
  open,
  onOpenChange,
}: ModalDeleteLinkProps) {
  const { mutate, isPending } = useDeleteLink(() => onOpenChange(false));

  return (
    <Modal
      open={open}
      onOpenChange={onOpenChange}
      title="Excluir link"
      description="Tem certeza que deseja excluir este link? Essa ação não pode ser desfeita."
    >
      <div className="flex justify-end gap-3">
        <Button
          theme="secondary"
          onClick={() => onOpenChange(false)}
          disabled={isPending}
          size="sm"
        >
          Cancelar
        </Button>

        <Button
          size="sm"
          onClick={() => mutate(id)}
          disabled={isPending}
          className="w-auto px-4"
        >
          {isPending ? "Excluindo..." : "Excluir"}
        </Button>
      </div>
    </Modal>
  );
}
