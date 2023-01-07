import {Component} from 'react'
import {withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import Popup from 'reactjs-popup'
import WatchContext from '../../context/WatchContext'
import './index.css'

class Header extends Component {
  logout = () => {
    const {history} = this.props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  render() {
    return (
      <WatchContext.Consumer>
        {value => {
          const {isLight, changeLight} = value
          const vj = () => {
            changeLight()
          }
          return (
            <div className={isLight ? 'light' : 'dark'}>
              <img
                src={
                  isLight
                    ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png'
                    : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-dark-theme-img.png'
                }
                alt="website logo"
              />
              <img
                src="https://assets.ccbp.in/frontend/react-js/nxt-watch-profile-img.png"
                alt="profile"
              />

              {isLight && (
                <button type="button" onClick={changeLight} data-testid="theme">
                  light
                </button>
              )}
              {!isLight && (
                <button type="button" onClick={changeLight} data-testid="theme">
                  dark
                </button>
              )}

              <Popup
                modal
                trigger={
                  <button type="button" onClick={this.logout}>
                    Logout
                  </button>
                }
              >
                {close => (
                  <>
                    <p>Are you sure, you want to logout</p>
                    <button type="button" onClick={() => close()}>
                      Cancel
                    </button>
                    <button type="button" onClick={this.logout}>
                      Confirm
                    </button>
                  </>
                )}
              </Popup>
            </div>
          )
        }}
      </WatchContext.Consumer>
    )
  }
}
export default withRouter(Header)
