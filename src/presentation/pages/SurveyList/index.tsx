import { Header } from '@/presentation/components'

import SurveyItem from './components/SurveyItem'
import './survey-list-styles.scss'

const SurveyList: React.FC = () => {
  return (
    <main className='survey-container'>
      <Header />

      <section className='survey-content'>
        <h1 className='survey-content__title'>Enquetes</h1>
        <div className='survey-content__list'>
          {[1, 2, 3, 4, 5].map((item) => (
            <SurveyItem key={item} />
          ))}
        </div>
      </section>
    </main>
  )
}
SurveyList.displayName = 'SurveyList'
export default SurveyList
