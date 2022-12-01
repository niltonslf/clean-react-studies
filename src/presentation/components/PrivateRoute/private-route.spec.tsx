import { createMemoryHistory, MemoryHistory } from 'history'
import { Router } from 'react-router-dom'
import { expect, describe, test } from 'vitest'

import { mockAccountModel } from '@/domain/test'
import { ApiContext } from '@/presentation/context'
import { render } from '@testing-library/react'

import { PrivateRoute } from '.'

type SutTypes = {
  history: MemoryHistory
}

const makeSut = (account = mockAccountModel()): SutTypes => {
  const history = createMemoryHistory({ initialEntries: ['/'] })

  render(
    <ApiContext.Provider value={{ getCurrentAccount: () => account }}>
      <Router location={history.location} navigator={history}>
        <PrivateRoute component={<>any route</>}></PrivateRoute>
      </Router>
    </ApiContext.Provider>
  )

  return { history }
}

describe('PrivateRoute', () => {
  test('should redirect to /login if token is empty', () => {
    // @ts-expect-error
    const { history } = makeSut(null)

    expect(history.location.pathname).toBe('/login')
  })

  test('should render current component if token is not empty', () => {
    const { history } = makeSut()

    expect(history.location.pathname).toBe('/')
  })
})
