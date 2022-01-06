import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect, Link} from 'react-router-dom'
import './index.css'

class LoginForm extends Component {
  state = {
    username: '',
    password: '',
    showSubmitError: false,
    errorMsg: '',
  }

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  onSubmitSuccess = jwtToken => {
    const {history} = this.props

    Cookies.set('jwt_token', jwtToken, {
      expires: 30,
      path: '/',
    })
    history.replace('/')
  }

  onSubmitFailure = errorMsg => {
    console.log(errorMsg)
    this.setState({showSubmitError: true, errorMsg})
  }

  submitForm = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const url = 'https://authorization-apis.herokuapp.com/login'
    const options = {
      method: 'POST',
      headers: {Accept: 'application/json', 'Content-type': 'application/json'},
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok === true) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  renderPasswordField = () => {
    const {password} = this.state
    return (
      <>
        <label className="input-label-password" htmlFor="password">
          PASSWORD
        </label>
        <br />
        <input
          type="password"
          id="password"
          className="password-input-field"
          value={password}
          onChange={this.onChangePassword}
        />
      </>
    )
  }

  renderUsernameField = () => {
    const {username} = this.state
    return (
      <>
        <label className="input-label-user" htmlFor="username">
          USERNAME
        </label>
        <br />
        <input
          type="text"
          id="username"
          className="username-input-field"
          value={username}
          onChange={this.onChangeUsername}
        />
      </>
    )
  }

  render() {
    const {showSubmitError, errorMsg} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    console.log('bye')
    return (
      <div className="box1">
        <form onSubmit={this.submitForm}>
          <div className="form">
            {/*  <img
              src="https://res.cloudinary.com/dx3zbikpn/image/upload/v1640957000/Frame_274logo_qzx5p5.png"
              alt="website logo"
              className="logo"
            /> */}
            <h1 className="head">File Uploader</h1>
            <h1 className="login-heading">Login</h1>
            <div>{this.renderUsernameField()}</div>
            <div>{this.renderPasswordField()}</div>
            <button type="submit" className="butt">
              Login
            </button>
            <Link to="/register">
              <p className="register">click here to register</p>
            </Link>
            {showSubmitError && <p className="para2-login">*{errorMsg}</p>}
          </div>
        </form>
        <img
          src="https://res.cloudinary.com/dx3zbikpn/image/upload/v1641441830/fileuploader_y726tb.jpg"
          alt="website login"
          className="img-login"
        />
      </div>
    )
  }
}

export default LoginForm
