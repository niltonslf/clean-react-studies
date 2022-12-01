import { createMemoryHistory } from 'history'
import { Router } from 'react-router-dom'
import { expect, describe, test } from 'vitest'

import { render } from '@testing-library/react'

import { PrivateRoute } from './private-route'

describe('PrivateRoute', () => {
  test('should redirect to /login if token is empty', () => {
    const history = createMemoryHistory({ initialEntries: ['/'] })

    render(
      <Router navigator={history} location={history.location}>
        <PrivateRoute />
      </Router>
    )

    expect(history.location.pathname).toBe('/login')
  })
})
