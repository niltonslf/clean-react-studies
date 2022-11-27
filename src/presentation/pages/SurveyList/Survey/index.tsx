import './survey.styles.scss'

interface SurveyProps {
  any?: any
}

const Survey: React.FC<SurveyProps> = () => {
  return (
    <article className='survey'>
      <div className='content'>
        <div className='content-date'>
          <span className='day'>22</span>
          <span className='month'>03</span>
          <span className='year'>2020</span>
        </div>
        <h1 className='content-title'>Qual é o seu framework web favorito?</h1>
      </div>
      <a href='#' className='button'>
        Ver resultado
      </a>
    </article>
  )
}
Survey.displayName = 'Survey'

export default Survey
