import Logo from '../../assets/sql-ease.png'

import { useNavigate } from 'react-router-dom'

import './Navbar.scss'

function Navbar() {

  const navigate = useNavigate()

  const handleLoginBtn = ()=> {
    navigate('/login')
  }

  return (
    <div className='nav_outer_container'>
        <div className="nav_inner_container">
            <img className="login_logo" src={Logo} alt="logo"/>
            <div className="button login_btn" onClick={()=>handleLoginBtn()}>Login</div>
        </div>
    </div>
  )
}

export default Navbar
