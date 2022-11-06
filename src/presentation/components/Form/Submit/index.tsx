import { useContext } from 'react'

import { FormContext, FormContextProps } from '../context'
import '../form-styles.scss'

type ReactButton = React.ButtonHTMLAttributes<HTMLButtonElement>
type InputProps = React.DetailedHTMLProps<ReactButton, HTMLButtonElement>

const Submit: React.FC<InputProps> = ({ children, ...props }) => {
  const { state } = useContext(FormContext) as FormContextProps

  const disabled = !state.email && !state.password

  return (
    <button
      disabled={disabled}
      data-testid='submit'
      {...props}
      type='submit'
      className='form-button'
    >
      {children}
    </button>
  )
}
Submit.displayName = 'Submit'
export default Submit
