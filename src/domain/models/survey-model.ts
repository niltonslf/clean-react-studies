export type SurveyModel = {
  id: string
  question: string
  answers: Answer[]
  date: Date
  didAnswer: boolean
}

interface Answer {
  image?: string
  answer: string
}
