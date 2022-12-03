import { SurveyModel } from '@/domain/models'

import { Icon } from '..'

import { IconName } from '../Icon'
import './survey.styles.scss'

type SurveyItemProps = {
  survey: SurveyModel
}

export const SurveyItem: React.FC<SurveyItemProps> = ({ survey }) => {
  const iconName = survey.didAnswer ? IconName.thumbUp : IconName.thumbDown

  return (
    <article className='survey'>
      <Icon iconName={iconName} />
      <div className='content'>
        <div className='content-date'>
          <span data-testid='day' className='day'>
            {survey.date.getDate().toString().padStart(2, '0')}
          </span>
          <span data-testid='month' className='month'>
            {survey.date.toLocaleString('pt-BR', { month: 'short' }).replace('.', '')}
          </span>
          <span data-testid='year' className='year'>
            {survey.date.getFullYear()}
          </span>
        </div>
        <h1 data-testid='question' className='content-title'>
          {survey.question}
        </h1>
      </div>
      <a href='#' className='button'>
        Ver resultado
      </a>
    </article>
  )
}
SurveyItem.displayName = 'SurveyItem'
