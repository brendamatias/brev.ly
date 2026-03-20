type Link = {
  id: string;
  shortUrl: string;
  originalUrl: string;
  accessCount: number;
  createdAt: string;
};

type CreateLinkRequest = {
  originalUrl: string;
  shortUrl: string;
};
