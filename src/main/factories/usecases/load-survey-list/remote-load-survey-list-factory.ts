import { RemoteLoadSurveyList } from '@/data/usecases/load-survey-list/remote-load-survey-list'
import { LoadSurveyList } from '@/domain/usecases/load-survey-list'

import { makeAxiosHttpClientFactory } from '../../http/axios-http-client-factory'

export const makeRemoteSurveyListFactory = (): LoadSurveyList => {
  return new RemoteLoadSurveyList(`/surveys`, makeAxiosHttpClientFactory())
}
