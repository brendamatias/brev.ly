type Link = {
  id: string;
  shortUrl: string;
  originalUrl: string;
  accessCount: number;
  createdAt: string;
};

type LinkByShortUrl = {
  originalUrl: string;
};

type CreateLinkRequest = {
  originalUrl: string;
  shortUrl: string;
};

type CreateLinkExportsResponse = {
  reportUrl: string;
};
