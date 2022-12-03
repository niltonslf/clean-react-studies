import { describe, expect, test } from 'vitest'

import { SurveyList } from '@/presentation/pages'
import { render, screen } from '@testing-library/react'

const makeSut = (): void => {
  render(<SurveyList />)
}

describe('SurveyList Component', () => {
  test('should present 4 empty items on start', () => {
    makeSut()
    const surveyList = screen.getByTestId('survey-list')
    expect(surveyList.querySelectorAll('.survey-loader').length).toBe(4)
  })
})
