import { createMemoryHistory, MemoryHistory } from 'history'
import { Router } from 'react-router-dom'
import { expect, describe, test } from 'vitest'

import { render } from '@testing-library/react'

import { PrivateRoute } from './private-route'

type SutTypes = {
  history: MemoryHistory
}

const makeSut = (): SutTypes => {
  const history = createMemoryHistory({ initialEntries: ['/'] })

  return { history }
}

describe('PrivateRoute', () => {
  test('should redirect to /login if token is empty', () => {
    const { history } = makeSut()
    render(
      <Router navigator={history} location={history.location}>
        <PrivateRoute />
      </Router>
    )

    expect(history.location.pathname).toBe('/login')
  })
})
