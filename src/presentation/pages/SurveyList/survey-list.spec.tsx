import { describe, expect, test } from 'vitest'

import { SurveyModel } from '@/domain/models'
import { mockSurveyListModel } from '@/domain/test'
import { LoadSurveyList } from '@/domain/usecases/load-survey-list'
import { SurveyList } from '@/presentation/pages'
import { act, render, screen, waitFor } from '@testing-library/react'

class LoadSurveyListSpy implements LoadSurveyList {
  callsCount: number = 0

  async loadAll(): Promise<SurveyModel[] | null> {
    this.callsCount++
    return mockSurveyListModel()
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
  test('should present 4 empty items on start', async () => {
    makeSut()
    const surveyList = screen.getByTestId('survey-list')
    expect(surveyList.querySelectorAll('.survey-loader').length).toBe(4)
    await waitFor(() => surveyList)
  })

  test('should call loadSurveyList', async () => {
    const { loadSurveyListSpy } = makeSut()
    expect(loadSurveyListSpy.callsCount).toBe(1)
    await waitFor(() => screen.getByTestId('title'))
  })

  test('should render SurveyItem on success', async () => {
    makeSut()
    const surveyList = screen.getByTestId('survey-list')
    await act(async () => surveyList)

    expect(surveyList.querySelectorAll('.survey').length).toBe(3)
  })
})
