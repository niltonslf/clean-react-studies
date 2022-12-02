import './survey.styles.scss'

interface SurveyItemLoaderProps {
  any?: any
}

const SurveyItemLoader: React.FC<SurveyItemLoaderProps> = () => {
  return (
    <article className='survey'>
      <div className='icon-wrap green'>
        <img src='/assets/thumb-up.png' alt='' />
      </div>
      <div className='content'>
        <div className='content-date'>
          <span className='day'>.</span>
          <span className='month'>.</span>
          <span className='year'>.</span>
        </div>
        <h1 className='content-title'>Loading</h1>
      </div>
      <a href='#' className='button'>
        Loading
      </a>
    </article>
  )
}
SurveyItemLoader.displayName = 'SurveyItemLoader'

export default SurveyItemLoader
