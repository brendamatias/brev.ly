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
  if (searchQuery) params.append("searchQuery", searchQuery);
  if (sortBy) params.append("sortBy", sortBy);

  return api.get(`${DOMAIN}?${params.toString()}`);
};

const getByShortUrl = (shortUrl: string): Promise<LinkByShortUrl> => {
  return api.get(`${DOMAIN}/${shortUrl}`);
};

const create = (payload: CreateLinkRequest): Promise<void> => {
  return api.post(DOMAIN, payload);
};

const destroy = (id: string): Promise<void> => {
  return api.delete(`${DOMAIN}/${id}`);
};

const exports = (): Promise<CreateLinkExportsResponse> => {
  return api.post(`${DOMAIN}/exports`);
};

const LinkService = {
  get,
  getByShortUrl,
  create,
  destroy,
  exports,
};

export { LinkService };
