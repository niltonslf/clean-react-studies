export class InvalidFieldError extends Error {
  constructor() {
    super(`Campo inválido inválido.`)
    this.name = 'InvalidFieldError'
  }
}
