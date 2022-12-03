import { useEffect, useState } from 'react'

import { SurveyModel } from '@/domain/models'
import { LoadSurveyList } from '@/domain/usecases/load-survey-list'
import { Header } from '@/presentation/components'

import SurveyItemLoader from './components/SurveyItemLoader'

import './survey-list-styles.scss'

type SurveyListProps = {
  loadSurveyList: LoadSurveyList
}

const SurveyList: React.FC<SurveyListProps> = ({ loadSurveyList }) => {
  const [, setItems] = useState<SurveyModel[]>([])

  useEffect(() => {
    loadSurveyList.loadAll().then((response) => {
      if (response) setItems(response)
    })
  }, [])

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
