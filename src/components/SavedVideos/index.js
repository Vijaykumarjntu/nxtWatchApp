import Cookies from 'js-cookie'
import {Redirect, Link} from 'react-router-dom'
import WatchContext from '../../context/WatchContext'
import Sidebar from '../Sidebar'
import Header from '../Header'

const SavedVideos = () => (
  <WatchContext.Consumer>
    {value => {
      const {savedVideos} = value
      const jwtToken = Cookies.get('jwt_token')
      if (jwtToken === undefined) {
        return <Redirect to="/login" />
      }
      const showEmptyPage = savedVideos.length === 0

      const renderEmptyPage = () => (
        <>
          <img
            src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-saved-videos-img.png"
            alt="no saved videos"
          />
          <h1>No saved videos found</h1>
          <p>Save your videos by clicking a button</p>
        </>
      )
      return (
        <>
          <Header />
          <Sidebar />
          <h1>Saved Videos</h1>
          {showEmptyPage && renderEmptyPage()}
          <ul>
            {savedVideos.map(x => (
              <li className="item">
                <Link to={`/videos/${x.id}`}>
                  <p>savedVideos</p>
                  <img src={x.thumbnailUrl} alt="video thumbnail" />
                  <p>{x.name}</p>
                  <p>{x.viewCount}</p>
                  <p>{x.publishedAt}</p>
                  <p>{x.title}</p>
                </Link>
              </li>
            ))}
          </ul>
        </>
      )
    }}
  </WatchContext.Consumer>
)

export default SavedVideos
