import '../form-styles.scss'

type ReactButton = React.ButtonHTMLAttributes<HTMLButtonElement>
type InputProps = React.DetailedHTMLProps<ReactButton, HTMLButtonElement>

const Submit: React.FC<InputProps> = ({ children, disabled = true, ...props }) => {
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
