import { createMemoryHistory } from 'history'
import { Router } from 'react-router-dom'
import { describe, test } from 'vitest'

import { SignUp } from '@/presentation/pages'
import { Helper } from '@/presentation/test/'
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

describe('SignUp Component', () => {
  test('Should start with initial state', () => {
    const { sut } = makeSut()

    Helper.testChildCount(sut, 'error-wrap', 0)
    Helper.testButtonIsDisabled(sut, 'submit', true)

    Helper.testFieldIsEmpty(sut, 'name')
    Helper.testFieldIsEmpty(sut, 'email')
    Helper.testFieldIsEmpty(sut, 'password')
    Helper.testFieldIsEmpty(sut, 'password-confirmation')

    Helper.testChildCount(sut, 'name-group', 1)
    Helper.testChildCount(sut, 'email-group', 1)
    Helper.testChildCount(sut, 'password-group', 1)
    Helper.testChildCount(sut, 'password-confirmation-group', 1)
  })
})
