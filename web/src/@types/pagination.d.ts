type Pagination = {
  page?: number;
  pageSize?: number;
  searchQuery?: string;
  sortBy?: "createdAt";
  sortDirection?: "asc" | "desc";
};

type WithPagination<T> = {
  pagination: {
    page: number;
    pageSize: number;
    total: number;
  };
  data: T[];
};
