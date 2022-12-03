import { Header } from '@/presentation/components'

import SurveyItemLoader from './components/SurveyItemLoader'
import './survey-list-styles.scss'

const SurveyList: React.FC = () => {
  return (
    <main className='survey-container'>
      <Header />

      <section className='survey-content'>
        <h1 className='survey-content__title'>Enquetes</h1>
        <div className='survey-content__list' data-testid='survey-list'>
          <SurveyItemLoader />
        </div>
      </section>
    </main>
  )
}
SurveyList.displayName = 'SurveyList'
export default SurveyList
