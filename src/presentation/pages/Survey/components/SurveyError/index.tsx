import { useContext } from 'react'

import { SurveyContext } from '@/presentation/pages/Survey/context/survey-context'

export const SurveyError: React.FC = () => {
  const { error } = useContext(SurveyContext) as any
  return <div data-testid='error'>{error}</div>
}

SurveyError.displayName = 'SurveyError'
