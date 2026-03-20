import { useMutation, useQueryClient } from "@tanstack/react-query";

import { LinkService } from "../link.service";
import toast from "react-hot-toast";

export const useCreateLink = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateLinkRequest) =>
      LinkService.create(payload).catch((error) => {
        toast.error(error);
        throw error;
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["links"] });
    },
  });
};

export const useDeleteLink = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) =>
      LinkService.destroy(id).catch((error) => {
        toast.error(error);
        throw error;
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["links"] });
    },
  });
};
