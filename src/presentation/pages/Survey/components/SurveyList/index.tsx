import { useContext } from 'react'

import { SurveyModel } from '@/domain/models'
import { SurveyContext } from '@/presentation/pages/Survey/context/survey-context'

import { SurveyItem, SurveyItemLoader } from '../'

import './survey-list.styles.scss'

export const SurveyList: React.FC = () => {
  const { items } = useContext(SurveyContext) as any

  return (
    <div className='survey-content__list' data-testid='survey-list'>
      {items?.length ? (
        items.map((survey: SurveyModel) => <SurveyItem survey={survey} key={survey.id} />)
      ) : (
        <SurveyItemLoader />
      )}
    </div>
  )
}

SurveyList.displayName = 'SurveyList'
