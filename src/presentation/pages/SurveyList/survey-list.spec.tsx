import { describe, expect, test } from 'vitest'

import { SurveyModel } from '@/domain/models'
import { LoadSurveyList } from '@/domain/usecases/load-survey-list'
import { SurveyList } from '@/presentation/pages'
import { render, screen } from '@testing-library/react'

class LoadSurveyListSpy implements LoadSurveyList {
  callsCount: number = 0

  async loadAll(): Promise<SurveyModel[] | null> {
    this.callsCount++
    return null
  }
}

type SutTypes = {
  loadSurveyListSpy: LoadSurveyListSpy
}

const makeSut = (): SutTypes => {
  const loadSurveyListSpy = new LoadSurveyListSpy()
  render(<SurveyList loadSurveyList={loadSurveyListSpy} />)

  return {
    loadSurveyListSpy,
  }
}

describe('SurveyList Component', () => {
  test('should present 4 empty items on start', () => {
    makeSut()
    const surveyList = screen.getByTestId('survey-list')
    expect(surveyList.querySelectorAll('.survey-loader').length).toBe(4)
  })

  test('should call loadSurveyList', () => {
    const { loadSurveyListSpy } = makeSut()
    expect(loadSurveyListSpy.callsCount).toBe(1)
  })
})
