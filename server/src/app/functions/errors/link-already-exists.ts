export class LinkAlreadyExistsError extends Error {
  constructor() {
    super("Short URL already exists");
  }
}
