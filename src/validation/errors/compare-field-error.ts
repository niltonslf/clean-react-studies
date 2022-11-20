export class CompareFieldError extends Error {
  constructor() {
    super('Os campos precisam ser iguais.')
    this.name = 'CompareFieldError'
  }
}
