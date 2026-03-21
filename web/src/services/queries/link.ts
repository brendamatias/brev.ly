import { useQuery } from "@tanstack/react-query";

import { LinkService } from "../link.service";
import toast from "react-hot-toast";

export const useLinks = ({
  page = 1,
  pageSize = 10,
  searchQuery,
  sortBy,
}: Pagination) => {
  return useQuery({
    queryKey: ["links", page, pageSize, searchQuery, sortBy],
    queryFn: () =>
      LinkService.get({ page, pageSize, searchQuery, sortBy }).catch(
        (error) => {
          toast.error(error);
          throw error;
        }
      ),
  });
};

export const useLinkByShortUrl = (shortUrl: string) => {
  return useQuery({
    queryKey: ["link", shortUrl],
    queryFn: () =>
      LinkService.getByShortUrl(shortUrl).catch((error) => {
        window.location.href = "/link/not-found";
        throw error;
      }),
  });
};
