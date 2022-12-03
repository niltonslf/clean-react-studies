import { describe, expect, test } from 'vitest'

import { SurveyList } from '@/presentation/pages'
import { render, screen } from '@testing-library/react'

describe('SurveyList Component', () => {
  test('should present 4 empty items on start', () => {
    render(<SurveyList />)

    const surveyList = screen.getByTestId('survey-list')
    expect(surveyList.querySelectorAll('.survey-loader').length).toBe(4)
  })
})
