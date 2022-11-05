import '../form-styles.scss'

type ReactInput = React.InputHTMLAttributes<HTMLInputElement>
type InputProps = React.DetailedHTMLProps<ReactInput, HTMLInputElement>

const Input: React.FC<InputProps> = (props) => {
  return <input {...props} className='form-control' />
}
Input.displayName = 'Input'
export default Input
