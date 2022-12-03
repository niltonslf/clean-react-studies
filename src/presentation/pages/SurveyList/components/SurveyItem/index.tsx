import { SurveyModel } from '@/domain/models'
import './survey.styles.scss'

type SurveyItemProps = {
  survey: SurveyModel
}

const SurveyItem: React.FC<SurveyItemProps> = ({ survey }) => {
  return (
    <article className='survey'>
      <div className='icon-wrap green'>
        <img src='/assets/thumb-up.png' alt='' data-testid='icon' />
      </div>
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

export default SurveyItem
