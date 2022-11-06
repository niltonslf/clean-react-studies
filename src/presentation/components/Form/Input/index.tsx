import React, { useContext } from 'react'

import { FormContext, FormContextProps } from '../context'
import '../form-styles.scss'

type ReactInput = React.InputHTMLAttributes<HTMLInputElement>
type InputProps = React.DetailedHTMLProps<ReactInput, HTMLInputElement>

const Input: React.FC<InputProps> = (props) => {
  const { state, setState } = useContext(FormContext) as FormContextProps

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setState({
      ...state,
      [event.target.name]: event.target.value,
    })
  }

  return <input {...props} className='form-control' onChange={handleChange} />
}
Input.displayName = 'Input'
export default Input
