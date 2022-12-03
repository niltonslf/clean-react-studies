import { useEffect, useState } from 'react'

import { SurveyModel } from '@/domain/models'
import { LoadSurveyList } from '@/domain/usecases/load-survey-list'
import { Header } from '@/presentation/components'

import { SurveyList } from './components/SurveyList'
import { SurveyContext } from './context/survey-context'

import './survey.styles.scss'

type SurveyProps = {
  loadSurveyList: LoadSurveyList
}

const Survey: React.FC<SurveyProps> = ({ loadSurveyList }) => {
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

        <SurveyContext.Provider value={{ items, error, setItems, setError }}>
          {error ? <div data-testid='error'>{error}</div> : <SurveyList />}
        </SurveyContext.Provider>
      </section>
    </main>
  )
}
Survey.displayName = 'Survey'
export default Survey
