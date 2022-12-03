import { faker } from '@faker-js/faker'

import { SurveyModel } from '../models'

export const mockSurveyModel = (): SurveyModel => {
  return {
    id: faker.datatype.uuid(),
    question: faker.random.words(10),
    answers: [
      {
        answer: faker.random.words(4),
        image: faker.internet.url(),
      },
      {
        answer: faker.random.words(),
      },
    ],
    date: faker.date.recent(),
    didAnswer: faker.datatype.boolean(),
  }
}

export const mockSurveyListModel = (): SurveyModel[] => [
  mockSurveyModel(),
  mockSurveyModel(),
  mockSurveyModel(),
]
