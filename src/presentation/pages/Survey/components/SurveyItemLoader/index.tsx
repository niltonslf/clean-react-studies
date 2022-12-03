import '../SurveyItem/survey.styles.scss'

interface SurveyItemLoaderProps {
  any?: any
}

export const SurveyItemLoader: React.FC<SurveyItemLoaderProps> = () => {
  return (
    <>
      {[1, 2, 3, 4].map((item) => (
        <article key={item} className='survey survey-loader'>
          <div className='icon-wrap green'>
            <img src='/assets/thumb-up.png' alt='' />
          </div>
          <div className='content'>
            <div className='content-date'>
              <span className='day'>0</span>
              <span className='month'>0</span>
              <span className='year'>0</span>
            </div>
            <h1 className='content-title'>Loading</h1>
          </div>
          <a href='#' className='button'>
            Loading
          </a>
        </article>
      ))}
    </>
  )
}
SurveyItemLoader.displayName = 'SurveyItemLoader'
