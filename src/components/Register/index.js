import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect, Link} from 'react-router-dom'
import './index.css'

class Register extends Component {
  state = {
    name: '',
    username: '',
    password: '',
    gender: '',
    location: '',
    showSubmitError: false,
    errorMsg: '',
  }

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  onChangeName = event => {
    this.setState({name: event.target.value})
  }

  onChangeGender = event => {
    this.setState({gender: event.target.value})
  }

  onChangeLocation = event => {
    this.setState({location: event.target.value})
  }

  onSubmitSuccess = () => {
    const {history} = this.props
    console.log('in success history', history)
    history.replace('/login')
  }

  onSubmitFailure = errorMsg => {
    console.log(errorMsg)
    this.setState({showSubmitError: true, errorMsg})
  }

  submitForm = async event => {
    event.preventDefault()
    const {username, password, name, location, gender} = this.state
    if (
      username === '' ||
      name === '' ||
      password === '' ||
      location === '' ||
      gender === ''
    ) {
      this.setState({validation: 'Please enter mandatory details'})
      return
    }
    const userDetails = {username, password, name, location, gender}
    const url = 'http://localhost:3000/register'
    const options = {
      method: 'POST',
      headers: {Accept: 'application/json', 'Content-type': 'application/json'},
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok) {
      console.log('ok calling function')
      this.onSubmitSuccess()
      console.log('after function')
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  renderPasswordField = () => {
    const {password} = this.state
    return (
      <>
        <label className="input-label-password-reg" htmlFor="password">
          PASSWORD <span className="register-span">*</span>
        </label>
        <br />
        <input
          type="password"
          id="password"
          className="password-input-field-reg"
          value={password}
          onChange={this.onChangePassword}
        />
      </>
    )
  }

  rendernameField = () => {
    const {name} = this.state
    return (
      <>
        <label className="input-label-name-reg" htmlFor="name">
          NAME <span style={{color: 'red'}}>*</span>
        </label>
        <br />
        <input
          type="text"
          id="name"
          className="name-input-field-reg"
          value={name}
          onChange={this.onChangeName}
        />
      </>
    )
  }

  renderGenderField = () => {
    const {gender} = this.state
    return (
      <>
        <label className="input-label-gender-reg" htmlFor="gender">
          GENDER <span style={{color: 'red'}}>*</span>
        </label>
        <br />
        <input
          type="text"
          id="gender"
          className="gender-input-field-reg"
          value={gender}
          onChange={this.onChangeGender}
        />
      </>
    )
  }

  renderLocationField = () => {
    const {location} = this.state
    return (
      <>
        <label className="input-label-location-reg" htmlFor="location">
          LOCATION <span style={{color: 'red'}}>*</span>
        </label>
        <br />
        <input
          type="text"
          id="location"
          className="location-input-field-reg"
          value={location}
          onChange={this.onChangeLocation}
        />
      </>
    )
  }

  renderUsernameField = () => {
    const {username} = this.state
    return (
      <>
        <label className="input-label-user-reg" htmlFor="username">
          USERNAME <span style={{color: 'red'}}>*</span>
        </label>
        <br />
        <input
          type="text"
          id="username"
          className="username-input-field-reg"
          value={username}
          onChange={this.onChangeUsername}
        />
      </>
    )
  }

  render() {
    const {showSubmitError, errorMsg, validation} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    console.log('bye')
    return (
      <div className="box1">
        {console.log('form')}
        <form onSubmit={this.submitForm}>
          <div className="form-reg">
            <div>{this.rendernameField()}</div>
            <div>{this.renderUsernameField()}</div>
            <div>{this.renderPasswordField()}</div>
            <div>{this.renderGenderField()}</div>
            <div>{this.renderLocationField()}</div>

            <button type="submit" className="butt-reg">
              Register
            </button>
            <Link to="/login">
              <p className="login">Click here to login</p>
            </Link>
            {showSubmitError && <p className="para2-login-reg">*{errorMsg}</p>}
            {validation && <p className="para2-login-reg">{validation}</p>}
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

export default Register
