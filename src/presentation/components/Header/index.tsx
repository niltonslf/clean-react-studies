import './header.styles.scss'

const Header: React.FC = () => {
  return (
    <header className='header'>
      <div className='header-content'>
        <a href='/'>Enquetes</a>

        <div>
          <span>Nilton</span> | <a href='#'>Sair</a>
        </div>
      </div>
    </header>
  )
}
Header.displayName = 'Header'
export default Header
