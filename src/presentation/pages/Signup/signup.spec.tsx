import { createMemoryHistory } from 'history'
import { Router } from 'react-router-dom'
import { describe, expect, test } from 'vitest'

import { SignUp } from '@/presentation/pages'
import { render, RenderResult } from '@testing-library/react'

type SutTypes = {
  sut: RenderResult
}

const history = createMemoryHistory({ initialEntries: ['/login'] })

const makeSut = (): SutTypes => {
  const sut = render(
    <Router location={history.location} navigator={history}>
      <SignUp />
    </Router>
  )

  return { sut }
}

const testChildCount = (sut: RenderResult, field: string, count: number) => {
  const element = sut.getByTestId(field)
  expect(element.childElementCount).toBe(count)
}

const testButtonIsDisabled = (sut: RenderResult, field: string, isDisabled: boolean) => {
  const button = sut.getByTestId(field) as HTMLButtonElement
  expect(button.disabled).toBe(isDisabled)
}

const testFieldIsEmpty = (sut: RenderResult, field: string) => {
  const element = sut.getByTestId(field) as HTMLInputElement
  expect(element.value).toBe('')
}

describe('SignUp Component', () => {
  test('Should start with initial state', () => {
    const { sut } = makeSut()

    testChildCount(sut, 'error-wrap', 0)
    testButtonIsDisabled(sut, 'submit', true)

    testFieldIsEmpty(sut, 'name')
    testFieldIsEmpty(sut, 'email')
    testFieldIsEmpty(sut, 'password')
    testFieldIsEmpty(sut, 'password-confirmation')

    testChildCount(sut, 'name-group', 1)
    testChildCount(sut, 'email-group', 1)
    testChildCount(sut, 'password-group', 1)
    testChildCount(sut, 'password-confirmation-group', 1)
  })
})
