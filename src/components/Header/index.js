import {Link, withRouter} from 'react-router-dom'

import Cookies from 'js-cookie'
import './index.css'

const Header = props => {
  const onClickLogout = () => {
    Cookies.remove('jwt_token')
    const {history} = props
    history.replace('/login')
  }
  return (
    <nav className="nav-header">
      <div className="nav-content">
        {/*  <Link to="/" className="header-heading">
          <img
            className="website-logo"
            src="https://res.cloudinary.com/dx3zbikpn/image/upload/v1640957000/Frame_274logo_qzx5p5.png"
            alt="website logo"
          />
        </Link> */}
        <ul className="nav-menu">
          <Link to="/" className="nav-link-text">
            <li>File uploader</li>
          </Link>

          <Link to="/" className="nav-link-home">
            <li>Home</li>
          </Link>

          <Link to="/records" className="nav-link-cart">
            <li>Records</li>
          </Link>
        </ul>
        <button
          type="button"
          className="logout-desktop-btn"
          onClick={onClickLogout}
        >
          Logout
        </button>
      </div>
    </nav>
  )
}
export default withRouter(Header)
