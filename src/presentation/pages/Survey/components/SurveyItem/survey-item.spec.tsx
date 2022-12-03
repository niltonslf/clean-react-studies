import { describe, expect, test } from 'vitest'

import { mockSurveyModel } from '@/domain/test'
import { render, screen } from '@testing-library/react'

import SurveyItem from '.'

const makeSut = (survey = mockSurveyModel()) => {
  render(<SurveyItem survey={survey} />)
}

describe('SurveyItem', () => {
  test('should render with correct values', () => {
    const survey = Object.assign(mockSurveyModel(), {
      date: new Date('2022-01-20T00:00:00'),
      didAnswer: true,
    })

    makeSut(survey)

    expect(screen.getByTestId('icon')).toHaveClass('green')
    expect(screen.getByTestId('question')).toHaveTextContent(survey.question)
    expect(screen.getByTestId('day')).toHaveTextContent('20')
    expect(screen.getByTestId('month')).toHaveTextContent('jan')
    expect(screen.getByTestId('year')).toHaveTextContent('2022')
  })

  test('should render with correct values', () => {
    const survey = Object.assign(mockSurveyModel(), {
      date: new Date('2021-02-03T00:00:00'),
      didAnswer: false,
    })

    makeSut(survey)

    expect(screen.getByTestId('icon')).toHaveClass('red')
    expect(screen.getByTestId('question')).toHaveTextContent(survey.question)
    expect(screen.getByTestId('day')).toHaveTextContent('03')
    expect(screen.getByTestId('month')).toHaveTextContent('fev')
    expect(screen.getByTestId('year')).toHaveTextContent('2021')
  })
})
