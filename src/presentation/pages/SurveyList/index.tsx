import { Header } from '@/presentation/components'
import './survey-list-styles.scss'

const SurveyList: React.FC = () => {
  return (
    <main className='survey-container'>
      <Header />

      <section className='survey-content'>
        <h1 className='survey-content__title'>Enquetes</h1>
        <div className='survey-content__list'>
          {[1, 2, 3, 4, 5].map((item) => (
            <article key={item} className='survey-content__survey'>
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
          ))}
        </div>
      </section>
    </main>
  )
}
SurveyList.displayName = 'SurveyList'
export default SurveyList
