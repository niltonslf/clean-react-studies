import '../form-styles.scss'

type ReactButton = React.ButtonHTMLAttributes<HTMLButtonElement>
type InputProps = React.DetailedHTMLProps<ReactButton, HTMLButtonElement>

const Submit: React.FC<InputProps> = ({ children, ...props }) => {
  return (
    <button {...props} type='submit' className='form-button'>
      {children}
    </button>
  )
}
Submit.displayName = 'Submit'
export default Submit
