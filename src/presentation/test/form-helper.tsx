import { expect } from 'vitest'

import { RenderResult } from '@testing-library/react'

export const testChildCount = (sut: RenderResult, field: string, count: number) => {
  const element = sut.getByTestId(field)
  expect(element.childElementCount).toBe(count)
}

export const testButtonIsDisabled = (sut: RenderResult, field: string, isDisabled: boolean) => {
  const button = sut.getByTestId(field) as HTMLButtonElement
  expect(button.disabled).toBe(isDisabled)
}

export const testFieldIsEmpty = (sut: RenderResult, field: string) => {
  const element = sut.getByTestId(field) as HTMLInputElement
  expect(element.value).toBe('')
}
