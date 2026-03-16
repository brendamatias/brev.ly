import { api } from "./api";

const DOMAIN = "links";

const get = ({
  page,
  pageSize,
  searchQuery,
  sortBy,
}: Pagination): Promise<WithPagination<Link>> => {
  const params = new URLSearchParams();

  if (page) params.append("page", String(page));
  if (pageSize) params.append("pageSize", String(pageSize));
  if (searchQuery) params.append("search", searchQuery);
  if (sortBy) params.append("sortBy", sortBy);

  return api.get(`${DOMAIN}?${params.toString()}`);
};

const getByShortUrl = (shortUrl: string): Promise<Link> => {
  return api.get(`${DOMAIN}/${shortUrl}`);
};

const destroy = (id: string): Promise<void> => {
  return api.delete(`${DOMAIN}/${id}`);
};

const LinkService = {
  get,
  getByShortUrl,
  destroy,
};

export { LinkService };
