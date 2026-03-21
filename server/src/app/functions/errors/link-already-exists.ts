export class LinkAlreadyExistsError extends Error {
  constructor() {
    super("URL encurtada já existe");
  }
}
