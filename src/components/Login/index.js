import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'

class Login extends Component {
  state = {
    name: '',
    password: '',
    showError: '',
    showPassword: true,
    errorMsg: '',
  }

  onChangeName = e => {
    this.setState({name: e.target.value})
  }

  onChangePassword = e => {
    this.setState({password: e.target.value})
  }

  handleSuccess = x => {
    const {history} = this.props
    Cookies.set('jwt_token', x, {expires: 1})
    return history.replace('/')
  }

  onSubmitForm = async e => {
    e.preventDefault()
    console.log('this is working')
    const {name, password} = this.state
    const loginApiUrl = 'https://apis.ccbp.in/login'
    const information = {username: name, password}
    const options = {
      method: 'POST',
      body: JSON.stringify(information),
    }
    const res = await fetch(loginApiUrl, options)
    const data = await res.json()
    if (res.ok) {
      this.handleSuccess(data.jwt_token)
    } else {
      this.setState({showError: true, errorMsg: data.error_msg})
    }
  }

  showPasswordOrNot = () => {
    this.setState(prevState => ({
      showPassword: !prevState.showPassword,
    }))
  }

  render() {
    const {name, password, showError, showPassword, errorMsg} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="loginContainer">
        <img
          src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
          alt="website logo"
        />
        <form onSubmit={this.onSubmitForm}>
          <input
            type="text"
            placeholder="enter a name"
            id="name"
            value={name}
            onChange={this.onChangeName}
          />
          <label htmlFor="name">USERNAME</label>
          <input
            type={showPassword ? 'password' : 'text'}
            placeholder="enter password"
            value={password}
            id="password"
            onChange={this.onChangePassword}
          />
          <label htmlFor="password">PASSWORD</label>
          <button type="submit">Login</button>
          {showError && <p>{errorMsg}</p>}
        </form>
      </div>
    )
  }
}
export default Login
