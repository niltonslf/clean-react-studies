import { SurveyList } from '@/presentation/pages'

import { makeRemoteSurveyListFactory } from '../../usecases'

interface SurveyFactoryProps {
  any?: any
}

export const SurveyFactory: React.FC<SurveyFactoryProps> = () => {
  return <SurveyList loadSurveyList={makeRemoteSurveyListFactory()} />
}
SurveyFactory.displayName = 'SurveyFactory'
