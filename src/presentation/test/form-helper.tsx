import { faker } from '@faker-js/faker'
import { fireEvent, screen } from '@testing-library/react'

export const populateField = (field: string, value = faker.random.word()) => {
  const input = screen.getByTestId(field)
  fireEvent.input(input, { target: { value } })
}
