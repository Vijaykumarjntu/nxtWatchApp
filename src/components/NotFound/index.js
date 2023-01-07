import WatchContext from '../../context/WatchContext'
import Header from '../Header'

const NotFound = () => (
  <WatchContext.Consumer>
    {value => {
      const {isLight} = value
      console.log('this is not found section')
      console.log(`in the not found section${isLight}`)
      const imageUrl = isLight
        ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-not-found-light-theme-img.png'
        : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-not-found-dark-theme-img.png'
      return (
        <div>
          <Header />
          <img src={imageUrl} alt="not found" />
          <h1>Page Not Found</h1>
          <p>we are sorry, the page you requested could not be found</p>
        </div>
      )
    }}
  </WatchContext.Consumer>
)
export default NotFound
