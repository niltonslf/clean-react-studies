import { useEffect, useState } from 'react'

import { SurveyModel } from '@/domain/models'
import { LoadSurveyList } from '@/domain/usecases/load-survey-list'
import { Header } from '@/presentation/components'

import SurveyItem from './components/SurveyItem'
import SurveyItemLoader from './components/SurveyItemLoader'

import './survey-list-styles.scss'

type SurveyListProps = {
  loadSurveyList: LoadSurveyList
}

const SurveyList: React.FC<SurveyListProps> = ({ loadSurveyList }) => {
  const [items, setItems] = useState<SurveyModel[] | null>([])
  const [error, setError] = useState(null)

  useEffect(() => {
    loadSurveyList
      .loadAll()
      .then((response) => setItems(response))
      .catch((error: any) => setError(error.message))
  }, [])

  return (
    <main className='survey-container'>
      <Header />

      <section className='survey-content'>
        <h1 className='survey-content__title' data-testid='title'>
          Enquetes
        </h1>

        {error ? (
          <div data-testid='error'>{error}</div>
        ) : (
          <div className='survey-content__list' data-testid='survey-list'>
            {items?.length ? (
              items.map((survey) => <SurveyItem survey={survey} key={survey.id} />)
            ) : (
              <SurveyItemLoader />
            )}
          </div>
        )}
      </section>
    </main>
  )
}
SurveyList.displayName = 'SurveyList'
export default SurveyList
